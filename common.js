/*   Storage keys (the contract with the Teacher section)   */
const KEYS = {
    USERS: "users", // localStorage   -> [ user ]
    EXAMS: "exams", // localStorage   -> [ exam ]
    RESULTS: "results", // localStorage   -> [ result ]
    SESSION: "currentUser", // sessionStorage -> user object
};

/*   Generic read / write   */
function readStore(key) {
    const raw = localStorage.getItem(key);

    if (!raw) return [];

    const data = JSON.parse(raw);

    if (!Array.isArray(data)) return [];

    return data;
}

function writeStore(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

/*   Session   */
function getCurrentUser() {
    const raw = sessionStorage.getItem(KEYS.SESSION);

    if (!raw) return null;

    return JSON.parse(raw);
}

function logout() {
    sessionStorage.removeItem(KEYS.SESSION);
    window.location.href = "../public/Login.html";
}

/**
 * Blocks the page unless a user with the required role is logged in.
 * Returns the user object so the page can use it straight away.
 */
function requireRole(role) {
    const user = getCurrentUser();

    if (!user) {
        window.location.replace("../public/Login.html");
        return null;
    }
    if (user.role !== role) {
        // Logged in, but wrong dashboard — send them to their own.
        window.location.replace(
            user.role === "teacher"
                ? "../Teacher/dashboard.html"
                : "../Student/student-dashboard.html",
        );
        return null;
    }
    return user;
}

/*   Schema normalizers   */
/* The seed data and the teacher builder use the older field names
   (examId / questionText / correctAnswer / "MCQ"...), while the student pages
   read id / text / correct / "mcq". These convert on read so both work. */

function normalizeType(type) {
    const t = String(type)
        .toLowerCase()
        .replace(/[\s_\/-]/g, "");
    if (t === "mcq") return "mcq";
    if (t === "truefalse") return "truefalse";
    if (t === "multiple" || t === "checkbox") return "multiple";
    if (t === "shortanswer" || t === "number" || t === "short") return "short";
    return t;
}

/* Turns a teacher-typed answer into the value the grader expects:
   an option index for mcq, a boolean for true/false, an array of
   indexes for multiple, and the raw value for short answers. */
function normalizeCorrect(type, correct, options) {
    const answers = (Array.isArray(correct) ? correct : [correct])
        .map((a) => String(a).trim())
        .filter((a) => a !== "");

    if (type === "truefalse") return answers[0].toLowerCase() === "true";
    if (type === "short") return answers[0];
    if (type === "multiple") {
        return answers
            .map((a) => options.findIndex((o) => String(o).trim() === a))
            .filter((i) => i !== -1);
    }
    const index = options.findIndex((o) => String(o).trim() === answers[0]);
    return index === -1 ? answers[0] : index;
}

function normalizeQuestion(question, index) {
    const type = normalizeType(question.type);
    const options = (question.options || []).map((o) => String(o).trim());

    return {
        id: question.id !== undefined ? question.id : index,
        type: type,
        text:
            question.text !== undefined ? question.text : question.questionText,
        options: options,
        correct:
            question.correct !== undefined
                ? question.correct
                : normalizeCorrect(type, question.correctAnswer, options),
        points: question.points || 1,
    };
}

function normalizeExam(exam, index) {
    return {
        id:
            exam.id !== undefined
                ? exam.id
                : exam.examId !== undefined
                  ? exam.examId
                  : index,
        title: exam.title,
        dateTime:
            exam.dateTime || `${exam.date || ""} ${exam.time || ""}`.trim(),
        status: String(exam.status || "").toLowerCase(),
        questions: (exam.questions || []).map(normalizeQuestion),
    };
}

/* Old results store resultId/totalScore/status/studentAnswers/userAnswer. */
function normalizeResult(result, index) {
    const answers = (result.answers || result.studentAnswers || []).map(
        (a) => ({
            questionId: a.questionId,
            answer: a.answer !== undefined ? a.answer : a.userAnswer,
        }),
    );

    const total = result.total !== undefined ? result.total : result.totalScore;
    const passed =
        result.passed !== undefined
            ? result.passed
            : String(result.status).toLowerCase() === "pass";

    return {
        id:
            result.id !== undefined
                ? result.id
                : result.resultId !== undefined
                  ? result.resultId
                  : index,
        examId: result.examId,
        studentId: result.studentId,
        answers: answers,
        score: result.score,
        total: total,
        passed: passed,
        submittedAt: result.submittedAt || result.date,
    };
}

/* Read exams / results already converted to the student-side shape. */
function readExams() {
    return readStore(KEYS.EXAMS).map(normalizeExam);
}

function readResults() {
    return readStore(KEYS.RESULTS).map(normalizeResult);
}

/*   Domain helpers   */

/** Active exams only  */
function getActiveExams() {
    return readExams().filter((exam) => exam.status === "active");
}

/** Every result belonging to one student. */
function getResultsFor(studentId) {
    return readResults().filter((result) => result.studentId === studentId);
}

/** One attempt per exam  */
function hasTakenExam(studentId, examId) {
    return getResultsFor(studentId).some((result) => result.examId === examId);
}

/** Total points an exam is worth. */
function examTotalPoints(exam) {
    return exam.questions.reduce((sum, q) => sum + (q.points || 1), 0);
}

/** Teacher-typed text goes into innerHTML — escape it first. */
function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function firstName(fullName) {
    return String(fullName || "")
        .trim()
        .split(" ")[0];
}

/** One exam card */
function renderExamCard(exam) {
    const questionCount = exam.questions ? exam.questions.length : 0;

    return `
    <div class="col-6 col-lg-3">
      <article class="card exam-card">
        <h3 class="exam-card__title">${escapeHtml(exam.title)}</h3>

        <p class="exam-card__meta">
          <i class="bi bi-journal"></i> ${questionCount} Questions
        </p>

        <a class="btn btn--accent" href="student-exam.html?id=${exam.id}">Start Exam</a>
      </article>
    </div>`;
}

/*   Stats (shared by dashboard.js and history.js)   */

function averagePercent(results) {
    if (results.length === 0) return 0;

    const sum = results.reduce(function (total, result) {
        return total + (result.total ? (result.score / result.total) * 100 : 0);
    }, 0);

    return Math.round(sum / results.length);
}

/*   Question helpers (shared by exam.js and review.js)   */

/**
 * Normalizes the three choice types into one shape:
 *   label  -> what the student reads
 *   stored -> what goes into answers[]  (index for mcq/multiple, boolean for T/F)
 */
function choiceValues(question) {
    if (question.type === "truefalse") {
        return [
            { label: "True", stored: true },
            { label: "False", stored: false },
        ];
    }
    return question.options.map(function (option, index) {
        return { label: option, stored: index };
    });
}

/*   Grading   */
function isCorrect(question, answer) {
    if (answer === undefined || answer === null || answer === "") return false;

    if (question.type === "multiple") {
        return sameSet(answer, question.correct); // all-or-nothing
    }
    if (question.type === "short") {
        return sameShortAnswer(answer, question.correct);
    }
    return answer === question.correct; // mcq (index) and truefalse (boolean)
}

/**
 * The teacher may store a number ("8") or text ("Cairo"), so compare on the
 * looser of the two: if both sides read as numbers, compare numerically —
 * that way "8", " 8 " and 8.0 all match. Otherwise trim and ignore case.
 */
function sameShortAnswer(answer, correct) {
    const given = String(answer).trim();
    const expected = String(correct).trim();

    const bothNumeric =
        given !== "" &&
        expected !== "" &&
        !isNaN(Number(given)) &&
        !isNaN(Number(expected));

    if (bothNumeric) return Number(given) === Number(expected);

    return given.toLowerCase() === expected.toLowerCase();
}

/** All-or-nothing: same members, order ignored. */
function sameSet(chosen, correct) {
    if (!Array.isArray(chosen) || !Array.isArray(correct)) return false;
    if (chosen.length !== correct.length) return false;

    const a = chosen.slice().sort();
    const b = correct.slice().sort();

    return a.every(function (value, index) {
        return value === b[index];
    });
}

/*   Shell behavior (sidebar + logout)   */
document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar");
    const toggle = document.getElementById("sidebarToggle");
    const backdrop = document.getElementById("sidebarBackdrop");

    function closeSidebar() {
        sidebar.classList.remove("is-open");
        backdrop.classList.remove("is-open");
    }

    if (toggle && sidebar && backdrop) {
        toggle.onclick = function () {
            sidebar.classList.toggle("is-open");
            backdrop.classList.toggle("is-open");
        };
        backdrop.onclick = closeSidebar;
    }

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.onclick = function (e) {
            e.preventDefault();
            logout();
        };
    }
});
