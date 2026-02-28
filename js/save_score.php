<?php
header("Content-Type: application/json");

$conn = new mysqli("localhost","root","","quiz_db");

if ($conn->connect_error) {
    echo json_encode(["success"=>false,"message"=>"DB connection failed"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$score = $data['score'] ?? 0;

$stmt = $conn->prepare("INSERT INTO scores (score) VALUES (?)");
$stmt->bind_param("i", $score);

if($stmt->execute()){
    echo json_encode(["success"=>true]);
} else {
    echo json_encode(["success"=>false,"message"=>"Insert failed"]);
}

$stmt->close();
$conn->close();
?>
