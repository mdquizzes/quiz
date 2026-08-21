const el=id=>document.getElementById(id);

const settings=el('settings'),
quiz=el('quiz'),
result=el('result');

const qCountEl=el('qCount'),
posMarksEl=el('posMarks'),
negMarksEl=el('negMarks'),
timerModeEl=el('timerMode');

const progressEl=el('progress'),
scoreEl=el('score'),
timerEl=el('timer');

const qEl=el('question'),
optsEl=el('options'),
nextBtn=el('nextBtn'),
prevBtn=el('prevBtn');

const rName=el('rName'),
rScore=el('rScore'),
rPercent=el('rPercent'),
rAccuracy=el('rAccuracy'),
rGrade=el('rGrade');

const officialScoreEl = el("officialScore");

let quizQs=[],idx=0;

let practiceScore=0;
let officialScore=0;

let POS=4,NEG=2,attempted=0,correctCount=0;

let timerOn=true,totalTime=0,tInt=null;

/* NEW */
let userAnswers=[];

/* START QUIZ */

el('startBtn').onclick=()=>{

const ALL=window.QUIZ_DATA;

if(!ALL){
alert("Quiz data not loaded");
return;
}

const n=+qCountEl.value;

POS=+posMarksEl.value;
NEG=+negMarksEl.value;

timerOn=timerModeEl.value==='on';

quizQs=shuffle([...ALL]).slice(0,n);

settings.classList.add('hide');
quiz.classList.remove('hide');

idx=0;
practiceScore=0;
officialScore=0;
attempted=0;
correctCount=0;
userAnswers=[];

if(timerOn){

totalTime=quizQs.length*60;
startTimer();

}else{

timerEl.classList.add('hide');

}

renderQ();

};


/* LOAD QUESTION */

function renderQ(){

nextBtn.classList.add('hide');

prevBtn.style.display=idx===0?'none':'inline-block';

const q=quizQs[idx];

progressEl.textContent=`Q ${idx+1}/${quizQs.length}`;

scoreEl.textContent=`Practice Score: ${practiceScore.toFixed(2)}`;

qEl.textContent=q.question;

optsEl.innerHTML='';

const shuffled=shuffle([...q.answers]);

quizQs[idx]._shuffled=shuffled;

shuffled.forEach((a,i)=>{

const d=document.createElement('div');

d.className='opt';

d.textContent=a.text;

d.onclick=()=>select(a.correct,d,i);

optsEl.appendChild(d);

});

}


/* SELECT ANSWER */

function select(correct,elOpt,index){

if(!nextBtn.classList.contains('hide')) return;

attempted++;

/* STORE USER ANSWER */
userAnswers[idx]=index;

if(correct){

practiceScore+=POS;
officialScore+=4;
correctCount++;

}else{

practiceScore-=NEG;
officialScore-=1;

}

Array.from(optsEl.children).forEach((o,i)=>{

if(quizQs[idx]._shuffled[i].correct)
o.classList.add('correct');

});

if(!correct) elOpt.classList.add('wrong');

scoreEl.textContent=`Practice Score: ${practiceScore.toFixed(2)}`;

nextBtn.classList.remove('hide');

}


/* NEXT QUESTION */

nextBtn.onclick=()=>{

idx++;

if(idx>=quizQs.length){
showResult();
return;
}

renderQ();

};


/* RESULT */

function showResult(){

quiz.classList.add('hide');
result.classList.remove('hide');

const max=quizQs.length*POS;

const percent=Math.max(0,(practiceScore/max)*100);

const acc=attempted?(correctCount/attempted)*100:0;

const wrongCount = attempted - correctCount;

rName.textContent="User";

rScore.textContent=`Practice Score : ${practiceScore.toFixed(2)} / ${max}`;

officialScoreEl.textContent=`Earning Points : ${officialScore}`;

rPercent.textContent=`Percentage : ${percent.toFixed(1)}%`;

rAccuracy.textContent=`Accuracy : ${acc.toFixed(1)}%`;

rGrade.textContent=
percent>=80?'Excellent':
percent>=60?'Good':
percent>=40?'Average':
'Needs Improvement';


/* REVIEW SECTION */

let reviewHTML="<h3>Answer Review</h3>";

quizQs.forEach((q,i)=>{

const userIndex=userAnswers[i];

const userAns=q._shuffled[userIndex]?.text || "Not Attempted";

const correctAns=q.answers.find(a=>a.correct).text;

reviewHTML+=`

<div class="review-card">

<b>Q${i+1}. ${q.question}</b><br><br>

Your Answer : <span style="color:${userAns===correctAns?'lime':'red'}">${userAns}</span><br>

Correct Answer : <span style="color:lime">${correctAns}</span><br><br>

<b>Solution:</b>

<div class="solution">
${q.solution || "No explanation"}
</div>

`;

});

document.getElementById("result").innerHTML+=reviewHTML;


/* SAVE LEADERBOARD SCORE */

if(window.saveOfficialScore){

window.saveOfficialScore(
officialScore,
correctCount,
wrongCount
)

.then(()=>{

document.getElementById("saveStatus").innerText=
"Score added to leaderboard";

})
.catch(()=>{

document.getElementById("saveStatus").innerText=
"Login required to save score";

});

}

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
