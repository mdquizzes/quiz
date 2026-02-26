import { saveOfficialScore } from "./auth.js";
.then(() => {
    document.getElementById("saveStatus").innerText =
      "✅ Score Saved Successfully";
  })
  .catch((error) => {
    console.error(error);
    document.getElementById("saveStatus").innerText =
      "❌ Error Saving Score";
  });

const el = id => document.getElementById(id);

const settings = el('settings'),
quiz = el('quiz'),
result = el('result');

const userNameEl = el('userName'),
qCountEl = el('qCount'),
posMarksEl = el('posMarks'),
negMarksEl = el('negMarks'),
timerModeEl = el('timerMode');

const progressEl = el('progress'),
scoreEl = el('score'),
timerEl = el('timer');

const qEl = el('question'),
optsEl = el('options'),
nextBtn = el('nextBtn'),
prevBtn = el('prevBtn');

const rName = el('rName'),
rScore = el('rScore'),
rPercent = el('rPercent'),
rAccuracy = el('rAccuracy'),
rGrade = el('rGrade');

const historyBody = document.querySelector('#historyTable tbody');
const avgPercentEl = el('avgPercent');
const reviewEl = el('review');

let quizQs=[], idx=0, score=0;
let POS=4, NEG=2, attempted=0, correctCount=0;
let timerOn=true, totalTime=0, tInt=null;
let answerHistory=[];

const STORE_KEY = "class10MathHistory";

/* START TEST */

el('startBtn').onclick = () => {

  const ALL_QUESTIONS = window.CLASS10_MATHS_QUESTIONS;

  const n = +qCountEl.value;
  POS = +posMarksEl.value;
  NEG = +negMarksEl.value;
  timerOn = timerModeEl.value === 'on';

  quizQs = shuffle([...ALL_QUESTIONS]).slice(0,n);

  settings.classList.add('hide');
  quiz.classList.remove('hide');

  idx=0; score=0; attempted=0; correctCount=0;
  answerHistory=[];

  if(timerOn){
    totalTime = quizQs.length * 60;
    startTimer();
  } else {
    timerEl.classList.add('hide');
  }

  renderQ();
};

/* RENDER QUESTION */

function renderQ(){

  nextBtn.classList.add('hide');
  prevBtn.style.display = idx===0?'none':'inline-block';

  const q = quizQs[idx];
  progressEl.textContent=`Q ${idx+1}/${quizQs.length}`;
  scoreEl.textContent=`Score: ${score.toFixed(2)}`;
  qEl.textContent=q.question;
  optsEl.innerHTML='';

  const shuffled = shuffle([...q.answers]);
  quizQs[idx]._shuffled = shuffled;

  shuffled.forEach(a=>{
    const d=document.createElement('div');
    d.className='opt';
    d.textContent=a.text;
    d.onclick=()=>select(a.correct,d);
    optsEl.appendChild(d);
  });
}

/* SELECT ANSWER */

function select(correct, elOpt){

  if(!nextBtn.classList.contains('hide')) return;

  attempted++;

  let delta=0;

  if(correct){
    delta=POS;
    score+=POS;
    correctCount++;
  } else {
    delta=-NEG;
    score-=NEG;
  }

  Array.from(optsEl.children).forEach((o,i)=>{
    if(quizQs[idx]._shuffled[i].correct)
      o.classList.add('correct');
  });

  if(!correct) elOpt.classList.add('wrong');

  answerHistory.push({
    question:quizQs[idx].question,
    correct,
    solution:quizQs[idx].solution
  });

  scoreEl.textContent=`Score: ${score.toFixed(2)}`;
  nextBtn.classList.remove('hide');
}

/* NEXT */

nextBtn.onclick=()=>{
  idx++;
  if(idx>=quizQs.length) return showResult();
  renderQ();
};

/* PREVIOUS */

prevBtn.onclick=()=>{
  if(idx>0){
    idx--;
    renderQ();
  }
};

/* RESULT */

function showResult(){

  quiz.classList.add('hide');
  result.classList.remove('hide');

  const max=quizQs.length*POS;
  const percent=Math.max(0,(score/max)*100);
  const acc=attempted?(correctCount/attempted)*100:0;

  rName.textContent="Name: "+(userNameEl.value||"Guest");
  rScore.textContent=`Score: ${score.toFixed(2)} / ${max}`;
  rPercent.textContent=`Percentage: ${percent.toFixed(1)}%`;
  rAccuracy.textContent=`Accuracy: ${acc.toFixed(1)}%`;
  rGrade.textContent =
    percent>=80?'Excellent':
    percent>=60?'Good':
    percent>=40?'Average':'Needs Improvement';

  saveHistory({
    name:userNameEl.value||"Guest",
    date:new Date().toLocaleString(),
    qCount:quizQs.length,
    score:score.toFixed(2),
    percent:percent.toFixed(1)
  });

  renderHistory();
  renderReview();
}

/* HISTORY */

function saveHistory(data){
  const arr=JSON.parse(localStorage.getItem(STORE_KEY)||'[]');
  arr.push(data);
  localStorage.setItem(STORE_KEY,JSON.stringify(arr));
}

function renderHistory(){
  const arr=JSON.parse(localStorage.getItem(STORE_KEY)||'[]');
  historyBody.innerHTML='';
  let sum=0;

  arr.forEach((r,i)=>{
    sum+=+r.percent;
    historyBody.innerHTML+=`
      <tr>
        <td>${i+1}</td>
        <td>${r.date}</td>
        <td>${r.qCount}</td>
        <td>${r.score}</td>
        <td>${r.percent}%</td>
        <td><button onclick="deleteHistory(${i})">Delete</button></td>
      </tr>
    `;
  });

  avgPercentEl.textContent=
    arr.length?(sum/arr.length).toFixed(1)+'%':'0%';
}

window.deleteHistory=function(i){
  const arr=JSON.parse(localStorage.getItem(STORE_KEY)||'[]');
  arr.splice(i,1);
  localStorage.setItem(STORE_KEY,JSON.stringify(arr));
  renderHistory();
};

/* REVIEW */

function renderReview(){
  reviewEl.innerHTML=answerHistory.map((h,i)=>`
    <div style="margin-bottom:10px">
      <b>Q${i+1}:</b> ${h.question}<br>
      ${h.correct?'✅ Correct':'❌ Wrong'}
      ${!h.correct?`<br><b>Solution:</b> ${h.solution}`:''}
    </div>
  `).join('');
}

/* TIMER */

function startTimer(){
  timerEl.classList.remove('hide');
  tInt=setInterval(()=>{
    totalTime--;
    timerEl.textContent=`Time Left: ${totalTime}s`;
    if(totalTime<=0){
      clearInterval(tInt);
      showResult();
    }
  },1000);
}

/* SHUFFLE */

function shuffle(a){
  for(let i=a.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}
