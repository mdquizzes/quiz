/* ===================================
   QUIZ ENGINE - FINAL PRODUCTION VERSION
=================================== */

let quizQuestions = [];
let currentQuestion = 0;

let customPositive = 4;
let customNegative = 0;

let practiceScore = 0;
let earningPoints = 0;

let selectedChapter = "";

/* ===============================
   LOAD CHAPTER SCRIPT
================================= */

function loadScript(src, callback){

  let old = document.getElementById("chapterScript");
  if(old) old.remove();

  let script = document.createElement("script");
  script.src = src;
  script.id = "chapterScript";
  script.onload = callback;

  document.body.appendChild(script);
}

/* ===============================
   START QUIZ (GLOBAL)
================================= */

window.startQuiz = function(){

  selectedChapter = document.getElementById("chapterSelect").value;

  if(!selectedChapter){
    alert("Select chapter first");
    return;
  }

  // Clear old result
  document.getElementById("result").innerHTML = "";

  customPositive = parseInt(
    document.getElementById("customPositiveSelect").value
  );

  customNegative = parseInt(
    document.getElementById("customNegativeSelect").value
  );

  practiceScore = 0;
  earningPoints = 0;

  loadScript(selectedChapter, function(){

    quizQuestions = [...window.chapterQuestions];

    // Shuffle questions
    quizQuestions.sort(() => Math.random() - 0.5);

    // Limit to 10 questions
    quizQuestions = quizQuestions.slice(0, 10);

    currentQuestion = 0;

    loadQuestion();
  });
};

/* ===============================
   LOAD QUESTION
================================= */

function loadQuestion(){

  const q = quizQuestions[currentQuestion];

  document.getElementById("quiz").innerHTML = `
    <div class="question-box">
      <b>Q${currentQuestion+1}.</b> ${q.question}
    </div>

    <div class="options-grid">
      ${q.answers.map((ans, i) =>
        `<button class="option"
          onclick="checkAnswer(${i})">
          ${ans.text}
        </button>`
      ).join("")}
    </div>
  `;
}

/* ===============================
   CHECK ANSWER (GLOBAL)
================================= */

window.checkAnswer = function(index){

  const q = quizQuestions[currentQuestion];

  if(q.answers[index].correct){
    practiceScore += customPositive;
    earningPoints += 4;      // FIXED NEET MODE
  }
  else{
    practiceScore -= customNegative;
    earningPoints -= 1;      // FIXED NEET MODE
  }

  currentQuestion++;

  if(currentQuestion < quizQuestions.length){
    loadQuestion();
  }
  else{
    finishQuiz();
  }
};

/* ===============================
   FINISH QUIZ (AUTO SAVE)
================================= */

function finishQuiz(){

  document.getElementById("quiz").innerHTML = "";

  document.getElementById("result").innerHTML = `
    <div class="result-card">
      <h2>🎯 Performance Card</h2>
      <p><strong>Practice Score:</strong> ${practiceScore}</p>
      <p><strong>Earning Points (4/-1):</strong> ${earningPoints}</p>
      <p id="saveStatus">Saving score...</p>
    </div>
  `;

  // Auto Save Earning Points
  if(typeof window.saveOfficialScore === "function"){

    const savePromise = window.saveOfficialScore(earningPoints, selectedChapter);

    if(savePromise && typeof savePromise.then === "function"){
      savePromise
        .then(()=>{
          document.getElementById("saveStatus").innerText =
            "✅ Score Saved Successfully";
        })
        .catch(()=>{
          document.getElementById("saveStatus").innerText =
            "❌ Error Saving Score";
        });
    } else {
      document.getElementById("saveStatus").innerText =
        "Login to save your earning points";
    }

  } else {
    document.getElementById("saveStatus").innerText =
      "Login to save your earning points";
  }
}
