/* ===================================
   QUIZ ENGINE - MODULE SAFE VERSION
=================================== */

let quizQuestions = [];
let currentQuestion = 0;

let customPositive = 4;
let customNegative = 0;

let practiceScore = 0;
let officialScore = 0;

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
    alert("Select chapter");
    return;
  }

  customPositive = parseInt(
    document.getElementById("customPositiveSelect").value
  );

  customNegative = parseInt(
    document.getElementById("customNegativeSelect").value
  );

  practiceScore = 0;
  officialScore = 0;

  loadScript(selectedChapter, function(){

    quizQuestions = [...window.chapterQuestions];

    // Shuffle
    quizQuestions.sort(() => Math.random() - 0.5);

    // Limit 10
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
    officialScore += 4;   // Fixed 4/-1 pattern
  }
  else{
    practiceScore -= customNegative;
    officialScore -= 1;
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
      <h2>Score: ${practiceScore}</h2>
      <h3 id="totalPoints">
        Total Points Earned (4/-1): Updating...
      </h3>

      <button onclick="loadMainLeaderboard()">
        Main Leaderboard
      </button>
    </div>
  `;

  // 🔥 AUTO SAVE (if function exists)
  if(typeof window.saveOfficialScore === "function"){
    window.saveOfficialScore(officialScore, selectedChapter);
  }
}
