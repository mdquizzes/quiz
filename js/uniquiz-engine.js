const el = id => document.getElementById(id);

// ========================================
// ELEMENTS
// ========================================

const settings = el('settings');
const quiz = el('quiz');
const result = el('result');

const qCountEl = el('qCount');
const posMarksEl = el('posMarks');
const negMarksEl = el('negMarks');
const timerModeEl = el('timerMode');

const progressEl = el('progress');
const scoreEl = el('score');
const timerEl = el('timer');

const qEl = el('question');
const optsEl = el('options');
const nextBtn = el('nextBtn');

const rName = el('rName');
const rScore = el('rScore');
const rPercent = el('rPercent');
const rAccuracy = el('rAccuracy');
const rGrade = el('rGrade');

const officialScoreEl = el('officialScore');

// ========================================
// VARIABLES
// ========================================

let quizQs = [];
let idx = 0;

let practiceScore = 0;
let officialScore = 0;

let POS = 4;
let NEG = 2;

let attempted = 0;
let correctCount = 0;

let timerOn = true;
let totalTime = 0;
let tInt = null;

let userAnswers = [];

// ========================================
// LOAD QUIZ DATA
// ========================================

function loadQuizData(data) {

    // If index.html passes quiz data, use it.
    if (Array.isArray(data)) {
        quizQs = data;
    }

    // If no argument was passed, try common global
    // variables created by index.html.
    if (!quizQs.length) {

        if (Array.isArray(window.quizData)) {
            quizQs = window.quizData;
        }

        else if (Array.isArray(window.questions)) {
            quizQs = window.questions;
        }

        else if (Array.isArray(window.quizQuestions)) {
            quizQs = window.quizQuestions;
        }
    }

    // Still no questions?
    if (!Array.isArray(quizQs) || quizQs.length === 0) {

        console.error(
            'loadQuizData: No quiz questions found.'
        );

        return;
    }

    // Reset quiz
    idx = 0;

    practiceScore = 0;
    officialScore = 0;

    attempted = 0;
    correctCount = 0;

    userAnswers = [];

    // Hide result
    if (result) {
        result.classList.add('hide');
    }

    // Show quiz
    if (quiz) {
        quiz.classList.remove('hide');
    }

    // Hide Next
    if (nextBtn) {
        nextBtn.classList.add('hide');
    }

    // Start first question
    renderQ();
}

window.loadQuizData = loadQuizData;

// IMPORTANT:
// index.html can call loadQuizData()
window.loadQuizData = loadQuizData;

// ========================================
// QUIZ CONFIG
// ========================================

function setQuizConfig(config = {}) {

    if (config.posMarks !== undefined) {
        const value = Number(config.posMarks);

        if (Number.isFinite(value)) {
            POS = value;
        }
    }

    if (config.negMarks !== undefined) {
        const value = Number(config.negMarks);

        if (Number.isFinite(value)) {
            NEG = value;
        }
    }

    if (config.timerOn !== undefined) {
        timerOn = Boolean(config.timerOn);
    }

    if (config.totalTime !== undefined) {
        const value = Number(config.totalTime);

        if (Number.isFinite(value)) {
            totalTime = Math.max(0, value);
        }
    }

    if (timerOn && totalTime > 0) {
        startTimer();
    }
}

window.setQuizConfig = setQuizConfig;

// ========================================
// LOAD QUESTION
// ========================================

function renderQ() {

    if (!qEl || !optsEl) {
        console.error(
            'Quiz HTML elements missing: question/options'
        );
        return;
    }

    if (nextBtn) {
        nextBtn.classList.add('hide');
    }

    const q = quizQs[idx];

    if (!q) {
        showResult();
        return;
    }

    // ------------------------------------
    // Progress
    // ------------------------------------

    if (progressEl) {

        progressEl.textContent =
            `Q ${idx + 1}/${quizQs.length}`;
    }

    // ------------------------------------
    // Score
    // ------------------------------------

    if (scoreEl) {

        scoreEl.textContent =
            `Practice Score : ${practiceScore.toFixed(2)}`;
    }

    // ------------------------------------
    // Question
    // ------------------------------------

    qEl.textContent = q.question || '';

    // ------------------------------------
    // Clear options
    // ------------------------------------

    optsEl.innerHTML = '';

    // ------------------------------------
    // Answers
    // ------------------------------------

    const answers =
        Array.isArray(q.answers)
            ? q.answers
            : [];

    const shuffled =
        shuffle([...answers]);

    quizQs[idx]._shuffled = shuffled;

    // ------------------------------------
    // Create options
    // ------------------------------------

    shuffled.forEach((a, i) => {

        const d =
            document.createElement('div');

        d.className = 'opt';

        d.textContent =
            a.text ?? '';

        d.onclick = () => {

            select(
                Boolean(a.correct),
                d,
                i
            );

        };

        optsEl.appendChild(d);
    });
}

// ========================================
// SELECT ANSWER
// ========================================

function select(correct, elOpt, index) {

    if (!nextBtn || !optsEl) {
        return;
    }

    // Prevent multiple answers
    if (!nextBtn.classList.contains('hide')) {
        return;
    }

    attempted++;

    userAnswers[idx] = index;

    // ------------------------------------
    // Correct
    // ------------------------------------

    if (correct) {

        practiceScore += POS;

        // Official score
        officialScore += 4;

        correctCount++;
    }

    // ------------------------------------
    // Wrong
    // ------------------------------------

    else {

        practiceScore -= NEG;

        // Official score
        officialScore -= 1;
    }

    // ------------------------------------
    // Show correct answer
    // ------------------------------------

    const shuffled =
        quizQs[idx]?._shuffled || [];

    Array.from(optsEl.children)
        .forEach((o, i) => {

            if (shuffled[i]?.correct) {

                o.classList.add('correct');
            }
        });

    // ------------------------------------
    // Show wrong answer
    // ------------------------------------

    if (!correct && elOpt) {

        elOpt.classList.add('wrong');
    }

    // ------------------------------------
    // Update score
    // ------------------------------------

    if (scoreEl) {

        scoreEl.textContent =
            `Practice Score : ${practiceScore.toFixed(2)}`;
    }

    // ------------------------------------
    // Show next
    // ------------------------------------

    nextBtn.classList.remove('hide');
}

// ========================================
// NEXT QUESTION
// ========================================

if (nextBtn) {

    nextBtn.onclick = () => {

        idx++;

        if (idx >= quizQs.length) {

            showResult();
            return;
        }

        renderQ();
    };
}

// ========================================
// RESULT
// ========================================

function showResult() {

    // ------------------------------------
    // Stop timer
    // ------------------------------------

    if (tInt) {

        clearInterval(tInt);

        tInt = null;
    }

    // ------------------------------------
    // Show result
    // ------------------------------------

    if (quiz) {

        quiz.classList.add('hide');
    }

    if (result) {

        result.classList.remove('hide');
    }

    // ------------------------------------
    // Calculate result
    // ------------------------------------

    const max =
        quizQs.length * POS;

    const percent =
        max > 0
            ? Math.max(
                0,
                (practiceScore / max) * 100
            )
            : 0;

    const acc =
        attempted > 0
            ? (correctCount / attempted) * 100
            : 0;

    const wrongCount =
        Math.max(
            0,
            attempted - correctCount
        );

    // ------------------------------------
    // Result fields
    // ------------------------------------

    if (rName) {

        rName.textContent =
            'User';
    }

    if (rScore) {

        rScore.textContent =
            `Practice Score : ${practiceScore.toFixed(2)} / ${max}`;
    }

    if (officialScoreEl) {

        officialScoreEl.textContent =
            `Earning Points : ${officialScore}`;
    }

    if (rPercent) {

        rPercent.textContent =
            `Percentage : ${percent.toFixed(1)}%`;
    }

    if (rAccuracy) {

        rAccuracy.textContent =
            `Accuracy : ${acc.toFixed(1)}%`;
    }

    if (rGrade) {

        rGrade.textContent =
            percent >= 80
                ? 'Excellent'
                : percent >= 60
                    ? 'Good'
                    : percent >= 40
                        ? 'Average'
                        : 'Needs Improvement';
    }

    // ====================================
    // ANSWER REVIEW
    // ====================================

    let reviewHTML =
        '<h3>Answer Review</h3>';

    quizQs.forEach((q, i) => {

        const userIndex =
            userAnswers[i];

        const shuffled =
            q._shuffled || [];

        const userAns =
            shuffled[userIndex]?.text ||
            'Not Attempted';

        const correctObj =
            Array.isArray(q.answers)
                ? q.answers.find(
                    a => a.correct
                )
                : null;

        const correctAns =
            correctObj
                ? correctObj.text
                : 'Not Available';

        const isCorrect =
            userAns !== 'Not Attempted' &&
            userAns === correctAns;

        reviewHTML += `

            <div class="review-card">

                <b>
                    Q${i + 1}.
                    ${escapeHTML(q.question || '')}
                </b>

                <br><br>

                Your Answer :

                <span
                    style="color:${isCorrect ? 'lime' : 'red'}"
                >
                    ${escapeHTML(String(userAns))}
                </span>

                <br>

                Correct Answer :

                <span style="color:lime">
                    ${escapeHTML(String(correctAns))}
                </span>

                <br><br>

                <b>Solution:</b>

                <div class="solution">
                    ${q.solution || 'No explanation'}
                </div>

            </div>
        `;
    });

    // ------------------------------------
    // Insert review
    // ------------------------------------

    const reviewContainer =
        document.getElementById(
            'answerReview'
        );

    if (reviewContainer) {

        reviewContainer.innerHTML =
            reviewHTML;

    } else if (result) {

        let generatedReview =
            document.getElementById(
                'generatedAnswerReview'
            );

        if (!generatedReview) {

            generatedReview =
                document.createElement('div');

            generatedReview.id =
                'generatedAnswerReview';

            result.appendChild(
                generatedReview
            );
        }

        generatedReview.innerHTML =
            reviewHTML;
    }

    // ====================================
    // SAVE LEADERBOARD SCORE
    // ====================================

    if (
        typeof window.saveOfficialScore ===
        'function'
    ) {

        Promise.resolve(

            window.saveOfficialScore(
                officialScore,
                correctCount,
                wrongCount
            )

        )
        .then(() => {

            const saveStatus =
                document.getElementById(
                    'saveStatus'
                );

            if (saveStatus) {

                saveStatus.innerText =
                    'Score added to leaderboard';
            }
        })
        .catch(() => {

            const saveStatus =
                document.getElementById(
                    'saveStatus'
                );

            if (saveStatus) {

                saveStatus.innerText =
                    'Login required to save score';
            }
        });
    }
}

// ========================================
// TIMER
// ========================================

function startTimer() {

    if (!timerEl) {
        return;
    }

    timerEl.classList.remove('hide');

    // Clear previous timer
    if (tInt) {

        clearInterval(tInt);

        tInt = null;
    }

    updateTimer();

    tInt = setInterval(() => {

        totalTime--;

        updateTimer();

        if (totalTime <= 0) {

            clearInterval(tInt);

            tInt = null;

            totalTime = 0;

            updateTimer();

            showResult();
        }

    }, 1000);
}

window.startTimer = startTimer;

// ========================================
// TIMER DISPLAY
// HH:MM:SS
// ========================================

function updateTimer() {

    if (!timerEl) {
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
        String(hours).padStart(
            2,
            '0'
        );

    const mm =
        String(minutes).padStart(
            2,
            '0'
        );

    const ss =
        String(seconds).padStart(
            2,
            '0'
        );

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
            Math.floor(
                Math.random() * (i + 1)
            );

        [
            a[i],
            a[j]
        ] = [
            a[j],
            a[i]
        ];
    }

    return a;
}

// ========================================
// HTML ESCAPE
// ========================================

function escapeHTML(value) {

    return String(value)

        .replace(
            /&/g,
            '&amp;'
        )

        .replace(
            /</g,
            '&lt;'
        )

        .replace(
            />/g,
            '&gt;'
        )

        .replace(
            /"/g,
            '&quot;'
        )

        .replace(
            /'/g,
            '&#039;'
        );
}

// ========================================
// GLOBAL FUNCTIONS
// ========================================

window.renderQ = renderQ;

window.showResult = showResult;

window.selectQuizAnswer = select;
