// ============================================================
// MD QUIZZES - UNQUIZ ENGINE
// ============================================================
//
// IMPORTANT:
//
// Quiz DATA loading is handled by quiz1.html.
//
// This file ONLY handles:
// - quiz state
// - question rendering
// - answer selection
// - scoring
// - timer
// - next question
// - result
// - answer review
// - leaderboard save
//
// DO NOT define window.loadQuizData here.
// ============================================================


"use strict";


// ============================================================
// ELEMENT HELPER
// ============================================================

const $ = id =>
    document.getElementById(id);


// ============================================================
// ELEMENTS
// ============================================================

const settings =
    $("settings");

const quiz =
    $("quiz");

const result =
    $("result");

const qCountEl =
    $("qCount");

const posMarksEl =
    $("posMarks");

const negMarksEl =
    $("negMarks");

const timerModeEl =
    $("timerMode");

const progressEl =
    $("progress");

const scoreEl =
    $("score");

const timerEl =
    $("timer");

const qEl =
    $("question");

const optsEl =
    $("options");

const nextBtn =
    $("nextBtn");

const rName =
    $("rName");

const rScore =
    $("rScore");

const rPercent =
    $("rPercent");

const rAccuracy =
    $("rAccuracy");

const rGrade =
    $("rGrade");

const officialScoreEl =
    $("officialScore");

const saveStatus =
    $("saveStatus");

const answerReview =
    $("answerReview");


// ============================================================
// QUIZ VARIABLES
// ============================================================

let quizQs = [];

let idx = 0;

let practiceScore = 0;

let officialScore = 0;

let POS = 4;

let NEG = 0;

let attempted = 0;

let correctCount = 0;

let timerOn = true;

let totalTime = 0;

let tInt = null;

let userAnswers = [];


// ============================================================
// CONFIGURE QUIZ
// ============================================================

function configureQuiz(config = {}){


    if(
        config.posMarks !== undefined
    ){

        const value =
            Number(
                config.posMarks
            );


        if(
            Number.isFinite(value)
        ){

            POS = value;

        }

    }


    if(
        config.negMarks !== undefined
    ){

        const value =
            Number(
                config.negMarks
            );


        if(
            Number.isFinite(value)
        ){

            NEG = value;

        }

    }


    if(
        config.timerOn !== undefined
    ){

        timerOn =
            Boolean(
                config.timerOn
            );

    }

}


// Make available to quiz1.html.

window.configureQuiz =
    configureQuiz;


// ============================================================
// START QUIZ
// ============================================================

function startQuiz(questions){


    /*
     * Validate.
     */

    if(
        !Array.isArray(questions)
        ||
        questions.length === 0
    ){

        console.error(
            "startQuiz: No questions supplied."
        );

        return;

    }


    /*
     * Stop old timer.
     */

    stopTimer();


    /*
     * Copy questions.
     */

    quizQs =
        questions.map(
            q => normalizeQuestion(q)
        );


    /*
     * Reset state.
     */

    idx = 0;

    practiceScore = 0;

    officialScore = 0;

    attempted = 0;

    correctCount = 0;

    userAnswers = [];


    /*
     * Reset result.
     */

    if(result){

        result.classList.add(
            "hide"
        );

    }


    /*
     * Show quiz.
     */

    if(settings){

        settings.classList.add(
            "hide"
        );

    }


    if(quiz){

        quiz.classList.remove(
            "hide"
        );

    }


    /*
     * Reset score display.
     */

    if(scoreEl){

        scoreEl.textContent =
            "Practice Score : 0.00";

    }


    /*
     * Start timer.
     */

    if(timerOn){

        totalTime =
            quizQs.length * 60;

        startTimer();

    }
    else{

        if(timerEl){

            timerEl.classList.add(
                "hide"
            );

        }

    }


    /*
     * Render first question.
     */

    renderQ();

}


// Make available to quiz1.html.

window.startQuiz =
    startQuiz;


// ============================================================
// NORMALIZE QUESTION
// ============================================================

function normalizeQuestion(q){


    if(!q){

        return {

            question:
                "",

            answers:
                []

        };

    }


    /*
     * Original format:
     *
     * {
     *   question: "...",
     *   answers: [...]
     * }
     *
     * Also support:
     *
     * options: [...]
     */

    let answers =
        Array.isArray(q.answers)
            ? q.answers
            : Array.isArray(q.options)
                ? q.options
                : [];


    answers =
        answers.map(
            a => ({

                text:
                    a?.text ??
                    a?.label ??
                    a?.value ??
                    "",

                correct:
                    Boolean(
                        a?.correct
                    )

            })
        );


    return {

        ...q,

        question:
            q.question ??
            q.questionText ??
            "",

        answers

    };

}


// ============================================================
// RENDER QUESTION
// ============================================================

function renderQ(){


    if(
        !qEl
        ||
        !optsEl
    ){

        console.error(
            "Quiz elements are missing."
        );

        return;

    }


    /*
     * No more questions.
     */

    if(
        idx >= quizQs.length
    ){

        showResult();

        return;

    }


    /*
     * Hide Next.
     */

    if(nextBtn){

        nextBtn.classList.add(
            "hide"
        );

    }


    /*
     * Current question.
     */

    const q =
        quizQs[idx];


    /*
     * Progress.
     */

    if(progressEl){

        progressEl.textContent =
            `Q ${idx + 1}/${quizQs.length}`;

    }


    /*
     * Score.
     */

    if(scoreEl){

        scoreEl.textContent =
            `Practice Score : ${practiceScore.toFixed(2)}`;

    }


    /*
     * Question text.
     */

    qEl.textContent =
        q.question;


    /*
     * Clear old options.
     */

    optsEl.innerHTML =
        "";


    /*
     * Shuffle answers.
     */

    const shuffled =
        shuffleQuestions(
            [...q.answers]
        );


    /*
     * Save shuffled answers.
     */

    q._shuffled =
        shuffled;


    /*
     * Create options.
     */

    shuffled.forEach(
        (answer, optionIndex) => {


            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "opt";


            div.textContent =
                answer.text;


            div.dataset.index =
                optionIndex;


            div.addEventListener(
                "click",
                () => {

                    selectAnswer(
                        Boolean(
                            answer.correct
                        ),
                        div,
                        optionIndex
                    );

                }
            );


            optsEl.appendChild(
                div
            );

        }
    );

}


// Make available for debugging if needed.

window.renderQ =
    renderQ;


// ============================================================
// SELECT ANSWER
// ============================================================

function selectAnswer(
    correct,
    selectedElement,
    selectedIndex
){


    /*
     * Prevent second selection.
     */

    if(
        nextBtn
        &&
        !nextBtn.classList.contains(
            "hide"
        )
    ){

        return;

    }


    /*
     * Prevent clicking another option
     * after answer selection.
     */

    if(optsEl){

        Array.from(
            optsEl.children
        ).forEach(
            option => {

                option.classList.add(
                    "disabled"
                );

                option.style.pointerEvents =
                    "none";

            }
        );

    }


    /*
     * Store answer.
     */

    userAnswers[idx] =
        selectedIndex;


    attempted++;


    /*
     * Correct answer.
     */

    if(correct){

        /*
         * Practice score uses
         * selected positive marks.
         */

        practiceScore += POS;


        /*
         * Official score:
         * fixed +4.
         */

        officialScore += 4;


        correctCount++;

    }


    /*
     * Wrong answer.
     */

    else{

        /*
         * Practice score uses
         * selected negative marks.
         */

        practiceScore -= NEG;


        /*
         * Official score:
         * fixed -1.
         */

        officialScore -= 1;

    }


    /*
     * Show correct answer.
     */

    const shuffled =
        quizQs[idx]?._shuffled
        || [];


    if(optsEl){

        Array.from(
            optsEl.children
        ).forEach(
            (option, i) => {

                if(
                    shuffled[i]
                    &&
                    shuffled[i].correct
                ){

                    option.classList.add(
                        "correct"
                    );

                }

            }
        );

    }


    /*
     * Show wrong selected answer.
     */

    if(
        !correct
        &&
        selectedElement
    ){

        selectedElement.classList.add(
            "wrong"
        );

    }


    /*
     * Update score.
     */

    if(scoreEl){

        scoreEl.textContent =
            `Practice Score : ${practiceScore.toFixed(2)}`;

    }


    /*
     * Show Next.
     */

    if(nextBtn){

        nextBtn.classList.remove(
            "hide"
        );

    }

}


// ============================================================
// NEXT QUESTION
// ============================================================

if(nextBtn){

    nextBtn.addEventListener(
        "click",
        () => {


            idx++;


            if(
                idx >= quizQs.length
            ){

                showResult();

                return;

            }


            renderQ();

        }
    );

}


// ============================================================
// SHOW RESULT
// ============================================================

function showResult(){


    /*
     * Stop timer.
     */

    stopTimer();


    /*
     * Hide quiz.
     */

    if(quiz){

        quiz.classList.add(
            "hide"
        );

    }


    /*
     * Show result.
     */

    if(result){

        result.classList.remove(
            "hide"
        );

    }


    /*
     * Maximum practice score.
     */

    const max =
        quizQs.length * POS;


    /*
     * Percentage.
     */

    const percent =
        max > 0
            ? Math.max(
                0,
                (practiceScore / max) * 100
            )
            : 0;


    /*
     * Accuracy.
     */

    const accuracy =
        attempted > 0
            ? (
                correctCount /
                attempted
            ) * 100
            : 0;


    /*
     * Wrong.
     */

    const wrongCount =
        attempted -
        correctCount;


    /*
     * Result fields.
     */

    if(rName){

        rName.textContent =
            "User";

    }


    if(rScore){

        rScore.textContent =
            `Practice Score : ${practiceScore.toFixed(2)} / ${max}`;

    }


    if(officialScoreEl){

        officialScoreEl.textContent =
            `Earning Points : ${officialScore}`;

    }


    if(rPercent){

        rPercent.textContent =
            `Percentage : ${percent.toFixed(1)}%`;

    }


    if(rAccuracy){

        rAccuracy.textContent =
            `Accuracy : ${accuracy.toFixed(1)}%`;

    }


    if(rGrade){

        rGrade.textContent =
            percent >= 80
                ? "Excellent"
                : percent >= 60
                    ? "Good"
                    : percent >= 40
                        ? "Average"
                        : "Needs Improvement";

    }


    /*
     * Answer review.
     */

    renderAnswerReview();


    /*
     * Save official score.
     */

    saveLeaderboardScore(
        wrongCount
    );

}


// ============================================================
// ANSWER REVIEW
// ============================================================

function renderAnswerReview(){


    if(!answerReview){

        return;

    }


    let html =
        "<h3>Answer Review</h3>";


    quizQs.forEach(
        (q, i) => {


            const userIndex =
                userAnswers[i];


            const shuffled =
                q._shuffled
                || [];


            const userAnswer =
                shuffled[userIndex]?.text
                ||
                "Not Attempted";


            const correctObject =
                q.answers.find(
                    answer =>
                        answer.correct
                );


            const correctAnswer =
                correctObject?.text
                ||
                "Not Available";


            const isCorrect =
                userAnswer !==
                    "Not Attempted"
                &&
                userAnswer ===
                    correctAnswer;


            const answerColor =
                isCorrect
                    ? "lime"
                    : "red";


            html += `

                <div class="review-card">

                    <b>
                        Q${i + 1}.
                        ${escapeHTML(
                            q.question
                        )}
                    </b>

                    <br><br>

                    Your Answer :

                    <span
                        style="color:${answerColor}"
                    >
                        ${escapeHTML(
                            userAnswer
                        )}
                    </span>

                    <br>

                    Correct Answer :

                    <span
                        style="color:lime"
                    >
                        ${escapeHTML(
                            correctAnswer
                        )}
                    </span>

                    <br><br>

                    <b>
                        Solution:
                    </b>

                    <div class="solution">
                        ${
                            q.solution
                            ||
                            "No explanation"
                        }
                    </div>

                </div>

            `;

        }
    );


    answerReview.innerHTML =
        html;

}


// ============================================================
// LEADERBOARD
// ============================================================

function saveLeaderboardScore(
    wrongCount
){


    if(
        typeof window.saveOfficialScore
        !==
        "function"
    ){

        if(saveStatus){

            saveStatus.innerText =
                "Leaderboard save unavailable.";

        }

        return;

    }


    Promise.resolve(

        window.saveOfficialScore(
            officialScore,
            correctCount,
            wrongCount
        )

    )
    .then(
        () => {

            if(saveStatus){

                saveStatus.innerText =
                    "Score added to leaderboard";

            }

        }
    )
    .catch(
        () => {

            if(saveStatus){

                saveStatus.innerText =
                    "Login required to save score";

            }

        }
    );

}


// ============================================================
// TIMER
// ============================================================

function startTimer(){


    if(!timerEl){

        return;

    }


    /*
     * Clear previous timer.
     */

    stopTimer();


    timerEl.classList.remove(
        "hide"
    );


    /*
     * Initial display.
     */

    updateTimer();


    /*
     * Start interval.
     */

    tInt =
        setInterval(
            () => {


                totalTime--;


                if(
                    totalTime <= 0
                ){

                    totalTime = 0;


                    updateTimer();


                    stopTimer();


                    showResult();


                    return;

                }


                updateTimer();


            },
            1000
        );

}


// Make available if required.

window.startTimer =
    startTimer;


// ============================================================
// STOP TIMER
// ============================================================

function stopTimer(){


    if(tInt){

        clearInterval(
            tInt
        );

        tInt = null;

    }

}


// ============================================================
// TIMER DISPLAY
// ============================================================

function updateTimer(){


    if(!timerEl){

        return;

    }


    const hours =
        Math.floor(
            totalTime / 3600
        );


    const minutes =
        Math.floor(
            (totalTime % 3600) / 60
        );


    const seconds =
        totalTime % 60;


    const hh =
        String(hours)
            .padStart(
                2,
                "0"
            );


    const mm =
        String(minutes)
            .padStart(
                2,
                "0"
            );


    const ss =
        String(seconds)
            .padStart(
                2,
                "0"
            );


    timerEl.textContent =
        `Time Left: ${hh}:${mm}:${ss}`;

}


// ============================================================
// SHUFFLE
// ============================================================

function shuffleQuestions(array){


    for(
        let i = array.length - 1;
        i > 0;
        i--
    ){

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            array[i],
            array[j]
        ] =
        [
            array[j],
            array[i]
        ];

    }


    return array;

}


// Make available to quiz1.html.

window.shuffleQuestions =
    shuffleQuestions;


// ============================================================
// HTML ESCAPE
// ============================================================

function escapeHTML(value){


    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


// ============================================================
// INITIAL STATE
// ============================================================

if(timerEl){

    timerEl.textContent =
        "Time Left";

}


if(scoreEl){

    scoreEl.textContent =
        "Practice Score : 0.00";

}


if(progressEl){

    progressEl.textContent =
        "Q 0/0";

}
