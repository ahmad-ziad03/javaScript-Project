/* ==========================================================================
   seed.js — DEVELOPMENT ONLY. Remove the <script> tag before submission.

   Fills localStorage with fake users / exams / results so the student pages
   can be built and tested before the Teacher section exists.
   It only writes when a store is empty, so it never stomps real data.

   Console helpers:
     seedReset()  -> wipe everything and re-seed
     devLogin()   -> log in as the demo student
   ========================================================================== */
(function () {
    "use strict";

    const DEMO_USERS = [
        {
            id: 0,
            role: "teacher",
            fullName: "Omar Haddad",
            username: "teacher",
            password: "1234",
            phone: "0790000000",
            gender: "male",
            nationalId: "9990000001",
        },
        {
            id: 1,
            role: "student",
            fullName: "Aya Mansour",
            username: "aya",
            password: "1234",
            phone: "0791111111",
            gender: "female",
            nationalId: "9990000002",
        },
        {
            id: 2,
            role: "student",
            fullName: "Zaid Khalil",
            username: "zaid",
            password: "1234",
            phone: "0792222222",
            gender: "male",
            nationalId: "9990000003",
        },
    ];

    /* Question shapes, one of each type we support:
       mcq       -> correct: index
       truefalse -> correct: true | false
       multiple  -> correct: [indexes]   (all-or-nothing)
       short     -> correct: whole number */
    function makeQuestions(topic) {
        return [
            {
                id: 0,
                type: "mcq",
                points: 1,
                text: `Which keyword declares a constant in ${topic}?`,
                options: ["var", "const", "let", "static"],
                correct: 1,
            },
            {
                id: 1,
                type: "truefalse",
                points: 1,
                text: `${topic} is a case-sensitive language.`,
                correct: true,
            },
            {
                id: 2,
                type: "multiple",
                points: 1,
                text: "Which of these are loop statements?",
                options: ["for", "switch", "while", "do...while"],
                correct: [0, 2, 3],
            },
            {
                id: 3,
                type: "short",
                points: 1,
                text: "How many bits are in one byte?",
                correct: 8,
            },
            {
                id: 4,
                type: "mcq",
                points: 1,
                text: "What does an array index start at?",
                options: ["0", "1", "-1", "It depends"],
                correct: 0,
            },
        ];
    }

    const DEMO_EXAMS = [
        {
            id: 0,
            title: "C# & .NET",
            dateTime: "2026-07-18T10:00",
            duration: 45,
            status: "active",
            questions: makeQuestions("C#"),
        },
        {
            id: 1,
            title: "JavaScript",
            dateTime: "2026-07-18T12:00",
            duration: 30,
            status: "active",
            questions: makeQuestions("JavaScript"),
        },
        {
            id: 2,
            title: "HTML & CSS",
            dateTime: "2026-07-19T10:00",
            duration: 20,
            status: "active",
            questions: makeQuestions("HTML"),
        },
        {
            id: 3,
            title: "Databases",
            dateTime: "2026-07-19T12:00",
            duration: 60,
            status: "active",
            questions: makeQuestions("SQL"),
        },
        {
            id: 4,
            title: "Networking",
            dateTime: "2026-07-20T09:00",
            duration: 40,
            status: "active",
            questions: makeQuestions("Networking"),
        },
        {
            id: 5,
            title: "Draft exam",
            dateTime: "2026-07-25T09:00",
            duration: 30,
            status: "inactive",
            questions: makeQuestions("Draft"),
        },
    ];

    /* Aya has already taken exams 4 and 2 — proves the "one attempt" gate,
     the stats, and the history page all have something to chew on. */
    const DEMO_RESULTS = [
        {
            id: 0,
            examId: 4,
            studentId: 1,
            answers: [
                { questionId: 0, answer: 1 },
                { questionId: 1, answer: true },
                { questionId: 2, answer: [0, 2, 3] },
                { questionId: 3, answer: 8 },
                { questionId: 4, answer: 0 },
            ],
            score: 5,
            total: 5,
            passed: true,
            submittedAt: "2026-07-14T09:41:00",
        },
        {
            id: 1,
            examId: 2,
            studentId: 1,
            answers: [
                { questionId: 0, answer: 0 },
                { questionId: 1, answer: true },
                { questionId: 2, answer: [0, 2] },
                { questionId: 3, answer: 8 },
                { questionId: 4, answer: 0 },
            ],
            score: 2,
            total: 5,
            passed: false,
            submittedAt: "2026-07-15T11:02:00",
        },
    ];

    function seedIfEmpty() {
        if (!localStorage.getItem("users"))
            localStorage.setItem("users", JSON.stringify(DEMO_USERS));
        if (!localStorage.getItem("exams"))
            localStorage.setItem("exams", JSON.stringify(DEMO_EXAMS));
        if (!localStorage.getItem("results"))
            localStorage.setItem("results", JSON.stringify(DEMO_RESULTS));
    }

    /* Stand-in for the login page, which nobody owns yet. */
    window.devLogin = function (username) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find((u) => u.username === (username || "aya"));
        if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
        return user;
    };

    window.seedReset = function () {
        ["users", "exams", "results"].forEach((k) =>
            localStorage.removeItem(k),
        );
        sessionStorage.removeItem("currentUser");
        seedIfEmpty();
        window.devLogin("aya");
        location.reload();
    };

    seedIfEmpty();
    if (!sessionStorage.getItem("currentUser")) window.devLogin("aya");
})();
