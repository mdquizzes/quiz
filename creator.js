<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Question Extractor Tool</title>
  <script src="https://cdn.jsdelivr.net/npm/tesseract.js@4/dist/tesseract.min.js"></script>

  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f5f7fa;
      margin: 0;
      padding: 20px;
    }

    .container {
      max-width: 800px;
      margin: auto;
      text-align: center;
    }

    h1 {
      color: #333;
    }

    input, button {
      margin: 10px;
      padding: 10px;
    }

    button {
      background: #007bff;
      color: white;
      border: none;
      cursor: pointer;
      border-radius: 6px;
    }

    button:hover {
      background: #0056b3;
    }

    #preview {
      margin-top: 20px;
      text-align: left;
      background: white;
      padding: 15px;
      border-radius: 8px;
      max-height: 400px;
      overflow: auto;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }

    pre {
      background: #f0f2f5;
      padding: 12px;
      border-radius: 6px;
      overflow-x: auto;
    }
  </style>
</head>
<body>

  <div class="container">
    <h1>📚 Question Extractor</h1>

    <input type="file" id="imageInput" accept="image/*" />
    <button onclick="processImage()">Extract Questions</button>

    <div id="preview"></div>

    <button onclick="downloadJS()">Download JS File</button>
  </div>

  <script>
    let extractedQuestions = [];

    async function processImage() {
      const input = document.getElementById("imageInput");

      if (!input.files[0]) {
        alert("Please upload an image");
        return;
      }

      const file = input.files[0];
      document.getElementById("preview").innerHTML = "⏳ Processing image, please wait...";

      try {
        const { data: { text } } = await Tesseract.recognize(
          file,
          "eng",
          { logger: m => console.log(m) }
        );

        console.log("OCR TEXT:", text);

        extractedQuestions = parseQuestions(text);
        displayPreview();

      } catch (error) {
        console.error(error);
        document.getElementById("preview").innerHTML = "❌ Failed to extract text from image.";
      }
    }

    function parseQuestions(text) {
      text = text.replace(/\r/g, "").trim();

      const rawQuestions = text
        .split(/\n(?=(?:Q?\d+[\.\)]\s))/i)
        .filter(q => q.trim() !== "");

      return rawQuestions.map(q => {
        const cleaned = q.trim();

        let solution = "";
        let questionText = cleaned;

        if (/solution[:\-]/i.test(cleaned)) {
          const parts = cleaned.split(/solution[:\-]/i);
          questionText = parts[0].trim();
          solution = parts[1]?.trim() || "";
        }

        return {
          question: questionText,
          chapter: "Real Numbers",
          difficulty: "medium",
          marks: 2,
          class: 10,
          subject: "Maths",
          source: "Uploaded Image",
          answers: [],
          solution: solution
        };
      });
    }

    function displayPreview() {
      const preview = document.getElementById("preview");

      if (extractedQuestions.length === 0) {
        preview.innerHTML = "⚠️ No questions found.";
        return;
      }

      preview.innerHTML = extractedQuestions
        .map((q, index) => `
          <h3>Question ${index + 1}</h3>
          <pre>${JSON.stringify(q, null, 2)}</pre>
        `)
        .join("");
    }

    function downloadJS() {
      if (extractedQuestions.length === 0) {
        alert("No data to download");
        return;
      }

      const content = `const questions = ${JSON.stringify(extractedQuestions, null, 2)};`;

      const blob = new Blob([content], { type: "application/javascript" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "questions.js";
      a.click();

      URL.revokeObjectURL(url);
    }
  </script>
</body>
</html>
