```javascript
// ========================================
// MD QUIZZES
// UNIQUIZ ENGINE
// ========================================


// ========================================
// ELEMENT HELPER
// ========================================

const el = id => document.getElementById(id);


// ========================================
// MAIN ELEMENTS
// ========================================

const settings = el('settings');
const quiz = el('quiz');
const result = el('result');


// ========================================
// SETTINGS ELEMENTS
// ========================================

const qCountEl = el('qCount');
const posMarksEl = el('posMarks');
const negMarksEl = el('negMarks');
const timerModeEl = el('timerMode');


// ========================================
// QUIZ HUD
// ========================================

const progressEl = el('progress');
const scoreEl = el('score');
const timerEl = el('timer');


// ========================================
// QUESTION ELEMENTS
// ========================================

const qEl = el('question');
const optsEl = el('options');
const nextBtn = el('nextBtn');


// ========================================
// RESULT ELEMENTS
// ========================================

const rName = el('rName');
const rScore = el('rScore');
const rPercent = el('rPercent');
const rAccuracy = el('rAccuracy');
const rGrade = el('rGrade');

const officialScoreEl = el("officialScore");


// ========================================
// QUIZ VARIABLES
// ========================================

let quizQs = [];
let idx = 0;

let practiceScore = 0;
let officialScore = 0;

let POS = 4;
let NEG = 2;

let attempted = 0;
let correctCount = 0;


// ========================================
// TIMER VARIABLES
// ========================================

let timerOn = true;
let totalTime = 0;
let tInt = null;


// ========================================
// USER ANSWERS
// ========================================

let userAnswers = [];


// ========================================
// START QUIZ
// ========================================

el('startBtn').onclick = () => {

    const ALL = window.QUIZ_DATA;

    if (!ALL) {

        alert("Quiz data not loaded");
        return;

    }


    // ------------------------------------
    // GET SETTINGS
    // ------------------------------------

    const n = +qCountEl.value;

    POS = +posMarksEl.value;
    NEG = +negMarksEl.value;

    timerOn = timerModeEl.value === 'on';


    // ------------------------------------
    // CREATE RANDOM QUESTIONS
    // ------------------------------------

    quizQs = shuffle([...ALL]).slice(0, n);


    // ------------------------------------
    // SHOW QUIZ
    // ------------------------------------

    settings.classList.add('hide');
    quiz.classList.remove('hide');


    // ------------------------------------
    // RESET VARIABLES
    // ------------------------------------

    idx = 0;

    practiceScore = 0;
    officialScore = 0;

    attempted = 0;
    correctCount = 0;

    userAnswers = [];


    // ------------------------------------
    // RESET TIMER
    // ------------------------------------

    if (tInt) {

        clearInterval(tInt);
        tInt = null;

    }


    // ------------------------------------
    // START TIMER
    // ------------------------------------

    if (timerOn) {

        totalTime = quizQs.length * 60;

        startTimer();

    } else {

        timerEl.classList.add('hide');

    }


    // ------------------------------------
    // DISPLAY FIRST QUESTION
    // ------------------------------------

    renderQ();

};


// ========================================
// LOAD QUESTION
// ========================================

function renderQ() {

    // ------------------------------------
    // HIDE NEXT BUTTON UNTIL ANSWER
    // ------------------------------------

    nextBtn.classList.add('hide');


    // ------------------------------------
    // GET CURRENT QUESTION
    // ------------------------------------

    const q = quizQs[idx];


    if (!q) {

        showResult();
        return;

    }


    // ------------------------------------
    // PROGRESS
    // ------------------------------------

    progressEl.textContent =
        `Q ${idx + 1}/${quizQs.length}`;


    // ------------------------------------
    // PRACTICE SCORE
    // ------------------------------------

    scoreEl.textContent =
        `Practice Score : ${practiceScore.toFixed(2)}`;


    // ------------------------------------
    // QUESTION
    // ------------------------------------

    qEl.textContent = q.question;


    // ------------------------------------
    // CLEAR OLD OPTIONS
    // ------------------------------------

    optsEl.innerHTML = '';


    // ------------------------------------
    // SHUFFLE OPTIONS
    // ------------------------------------

    const shuffled = shuffle([...q.answers]);

    quizQs[idx]._shuffled = shuffled;


    // ------------------------------------
    // CREATE OPTIONS
    // ------------------------------------

    shuffled.forEach((a, i) => {

        const d = document.createElement('div');

        d.className = 'opt';

        d.textContent = a.text;


        d.onclick = () => {

            select(a.correct, d, i);

        };


        optsEl.appendChild(d);

    });

}


// ========================================
// SELECT ANSWER
// ========================================

function select(correct, elOpt, index) {


    // ------------------------------------
    // PREVENT MULTIPLE ANSWERS
    // ------------------------------------

    if (!nextBtn.classList.contains('hide')) {

        return;

    }


    // ------------------------------------
    // COUNT ATTEMPT
    // ------------------------------------

    attempted++;


    // ------------------------------------
    // STORE USER ANSWER
    // ------------------------------------

    userAnswers[idx] = index;


    // ------------------------------------
    // CORRECT ANSWER
    // ------------------------------------

    if (correct) {

        practiceScore += POS;

        // Official scoring remains fixed
        officialScore += 4;

        correctCount++;

    }


    // ------------------------------------
    // WRONG ANSWER
    // ------------------------------------

    else {

        practiceScore -= NEG;

        // Official scoring remains fixed
        officialScore -= 1;

    }


    // ------------------------------------
    // SHOW CORRECT ANSWER
    // ------------------------------------

    Array.from(optsEl.children).forEach((o, i) => {

        if (quizQs[idx]._shuffled[i].correct) {

            o.classList.add('correct');

        }

    });


    // ------------------------------------
    // SHOW WRONG ANSWER
    // ------------------------------------

    if (!correct) {

        elOpt.classList.add('wrong');

    }


    // ------------------------------------
    // UPDATE SCORE
    // ------------------------------------

    scoreEl.textContent =
        `Practice Score : ${practiceScore.toFixed(2)}`;


    // ------------------------------------
    // SHOW NEXT BUTTON
    // ------------------------------------

    nextBtn.classList.remove('hide');

}


// ========================================
// NEXT QUESTION
// ========================================

nextBtn.onclick = () => {

    idx++;


    // ------------------------------------
    // LAST QUESTION
    // ------------------------------------

    if (idx >= quizQs.length) {

        showResult();
        return;

    }


    // ------------------------------------
    // NEXT QUESTION
    // ------------------------------------

    renderQ();

};


// ========================================
// RESULT
// ========================================

function showResult() {


    // ------------------------------------
    // STOP TIMER
    // ------------------------------------

    if (tInt) {

        clearInterval(tInt);
        tInt = null;

    }


    // ------------------------------------
    // HIDE QUIZ
    // ------------------------------------

    quiz.classList.add('hide');


    // ------------------------------------
    // SHOW RESULT
    // ------------------------------------

    result.classList.remove('hide');


    // ------------------------------------
    // CALCULATE SCORE
    // ------------------------------------

    const max = quizQs.length * POS;


    const percent =
        max > 0
            ? Math.max(0, (practiceScore / max) * 100)
            : 0;


    const acc =
        attempted
            ? (correctCount / attempted) * 100
            : 0;


    const wrongCount =
        attempted - correctCount;


    // ------------------------------------
    // RESULT TEXT
    // ------------------------------------

    rName.textContent = "User";


    rScore.textContent =
        `Practice Score : ${practiceScore.toFixed(2)} / ${max}`;


    officialScoreEl.textContent =
        `Earning Points : ${officialScore}`;


    rPercent.textContent =
        `Percentage : ${percent.toFixed(1)}%`;


    rAccuracy.textContent =
        `Accuracy : ${acc.toFixed(1)}%`;


    // ------------------------------------
    // GRADE
    // ------------------------------------

    rGrade.textContent =

        percent >= 80
            ? 'Excellent'

            : percent >= 60
                ? 'Good'

                : percent >= 40
                    ? 'Average'

                    : 'Needs Improvement';


    // ====================================
    // ANSWER REVIEW
    // ====================================

    let reviewHTML = "<h3>Answer Review</h3>";


    quizQs.forEach((q, i) => {


        const userIndex = userAnswers[i];


        const userAns =
            q._shuffled?.[userIndex]?.text
            || "Not Attempted";


        const correctAnswerObj =
            q.answers.find(a => a.correct);


        const correctAns =
            correctAnswerObj
                ? correctAnswerObj.text
                : "Not Available";


        const isCorrect =
            userAns === correctAns;


        reviewHTML += `

        <div class="review-card">

            <b>Q${i + 1}. ${q.question}</b>

            <br><br>

            Your Answer :
            <span style="color:${isCorrect ? 'lime' : 'red'}">
                ${userAns}
            </span>

            <br>

            Correct Answer :
            <span style="color:lime">
                ${correctAns}
            </span>

            <br><br>

            <b>Solution:</b>

            <div class="solution">
                ${q.solution || "No explanation"}
            </div>

        </div>

        `;

    });


    // ------------------------------------
    // ADD REVIEW
    // ------------------------------------

    result.innerHTML += reviewHTML;


    // ====================================
    // SAVE LEADERBOARD SCORE
    // ====================================

    if (window.saveOfficialScore) {


        window.saveOfficialScore(
            officialScore,
            correctCount,
            wrongCount
        )

        .then(() => {

            const saveStatus =
                document.getElementById("saveStatus");


            if (saveStatus) {

                saveStatus.innerText =
                    "Score added to leaderboard";

            }

        })

        .catch(() => {

            const saveStatus =
                document.getElementById("saveStatus");


            if (saveStatus) {

                saveStatus.innerText =
                    "Login required to save score";

            }

        });

    }

}


// ========================================
// TIMER
// ========================================

function startTimer() {


    // ------------------------------------
    // SHOW TIMER
    // ------------------------------------

    timerEl.classList.remove('hide');


    // ------------------------------------
    // CLEAR OLD TIMER
    // ------------------------------------

    if (tInt) {

        clearInterval(tInt);

    }


    // ------------------------------------
    // INITIAL TIMER DISPLAY
    // ------------------------------------

    updateTimerDisplay();


    // ------------------------------------
    // START COUNTDOWN
    // ------------------------------------

    tInt = setInterval(() => {


        totalTime--;


        // --------------------------------
        // UPDATE DISPLAY
        // --------------------------------

        updateTimerDisplay();


        // --------------------------------
        // TIME FINISHED
        // --------------------------------

        if (totalTime <= 0) {

            clearInterval(tInt);

            tInt = null;

            showResult();

        }

    }, 1000);

}


// ========================================
// TIMER DISPLAY
// HH:MM:SS
// ========================================

function updateTimerDisplay() {


    const hours =
        Math.floor(totalTime / 3600);


    const minutes =
        Math.floor((totalTime % 3600) / 60);


    const seconds =
        totalTime % 60;


    const hh =
        String(hours).padStart(2, '0');


    const mm =
        String(minutes).padStart(2, '0');


    const ss =
        String(seconds).padStart(2, '0');


    timerEl.textContent =
        `Time Left: ${hh}:${mm}:${ss}`;

}


// ========================================
// SHUFFLE
// ========================================

function shuffle(a) {


    for (
        let i = a.length - 1;
        i > 0;
        i--
    ) {


        const j =
            Math.floor(Math.random() * (i + 1));


        [a[i], a[j]] =
            [a[j], a[i]];

    }


    return a;

}
