let quizQuestions=[];
let currentQuestion=0;

let customPositive=4;
let customNegative=0;

let practiceScore=0;
let officialScore=0;

let selectedChapter="";

function loadScript(src,callback){
  let old=document.getElementById("chapterScript");
  if(old) old.remove();
  let script=document.createElement("script");
  script.src=src;
  script.id="chapterScript";
  script.onload=callback;
  document.body.appendChild(script);
}

window.startQuiz=function(){

  selectedChapter = chapterSelect.value;
  if(!selectedChapter){
    alert("Select chapter");
    return;
  }

  customPositive=parseInt(customPositiveSelect.value);
  customNegative=parseInt(customNegativeSelect.value);

  practiceScore=0;
  officialScore=0;

  loadScript(selectedChapter,function(){
    quizQuestions=[...window.chapterQuestions];
    quizQuestions=quizQuestions.slice(0,10);
    currentQuestion=0;
    loadQuestion();
  });
}

function loadQuestion(){
  const q=quizQuestions[currentQuestion];
  quiz.innerHTML=`
  <div>${q.question}</div>
  ${q.answers.map((ans,i)=>
  `<button onclick="checkAnswer(${i})">${ans.text}</button>`
  ).join("")}
  `;
}

window.checkAnswer=function(index){

  const q=quizQuestions[currentQuestion];

  if(q.answers[index].correct){
    practiceScore+=customPositive;
    officialScore+=4;
  }else{
    practiceScore-=customNegative;
    officialScore-=1;
  }

  currentQuestion++;

  if(currentQuestion<quizQuestions.length){
    loadQuestion();
  }else{
    finishQuiz();
  }
}

function finishQuiz(){
  quiz.innerHTML="";
  result.innerHTML=`
  <h2>Points Earned: ${practiceScore}</h2>
  <h3>Official Score (4/-1): ${officialScore}</h3>
  <button onclick="saveOfficialScore(${officialScore},'${selectedChapter}')">
  Save Official Score
  </button>
  `;
}
