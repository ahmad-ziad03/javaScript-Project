/* Real accounts. The teacher is created directly in the system, as the brief
   requires; students would normally be added by the teacher, and these are
   here so the app has data to show on a fresh browser.
   Every username is unique, which is what the Add Student form checks. */

const users = [
    {
        id: 0,
        role: "teacher",
        fullName: "Ahmad Ali",
        username: "Admin",
        password: "Admin",
        phone: "0790000000",
        gender: "Male",
        nationalId: "1234567890",
    },
    {
        id: 1,
        role: "student",
        fullName: "Aya Mansour",
        username: "aya",
        password: "aya123",
        phone: "0791234567",
        gender: "Female",
        nationalId: "2000000001",
    },
    {
        id: 2,
        role: "student",
        fullName: "Omar Haddad",
        username: "omar",
        password: "omar123",
        phone: "0792345678",
        gender: "Male",
        nationalId: "2000000002",
    },
    {
        id: 3,
        role: "student",
        fullName: "Layla Najjar",
        username: "layla",
        password: "layla123",
        phone: "0793456789",
        gender: "Female",
        nationalId: "2000000003",
    },
    {
        id: 4,
        role: "student",
        fullName: "Zaid Khalil",
        username: "zaid",
        password: "zaid123",
        phone: "0794567890",
        gender: "Male",
        nationalId: "2000000004",
    },
    {
        id: 5,
        role: "student",
        fullName: "Nour Suleiman",
        username: "nour",
        password: "nour123",
        phone: "0795678901",
        gender: "Female",
        nationalId: "2000000005",
    },
    {
        id: 6,
        role: "student",
        fullName: "Yousef Ibrahim",
        username: "yousef",
        password: "yousef123",
        phone: "0796789012",
        gender: "Male",
        nationalId: "2000000006",
    },
    {
        id: 7,
        role: "student",
        fullName: "Salma Qasim",
        username: "salma",
        password: "salma123",
        phone: "0797890123",
        gender: "Female",
        nationalId: "2000000007",
    },
    {
        id: 8,
        role: "student",
        fullName: "Kareem Zayed",
        username: "kareem",
        password: "kareem123",
        phone: "0798901234",
        gender: "Male",
        nationalId: "2000000008",
    },
    {
        id: 9,
        role: "student",
        fullName: "Hiba Saleh",
        username: "hiba",
        password: "hiba123",
        phone: "0799012345",
        gender: "Female",
        nationalId: "2000000009",
    },
    {
        id: 10,
        role: "student",
        fullName: "Tariq Abdullah",
        username: "tariq",
        password: "tariq123",
        phone: "0790123456",
        gender: "Male",
        nationalId: "2000000010",
    },
    {
        id: 11,
        role: "student",
        fullName: "Mariam Yassin",
        username: "mariam",
        password: "mariam123",
        phone: "0791122334",
        gender: "Female",
        nationalId: "2000000011",
    },
    {
        id: 12,
        role: "student",
        fullName: "Bilal Saad",
        username: "bilal",
        password: "bilal123",
        phone: "0792233445",
        gender: "Male",
        nationalId: "2000000012",
    },
];

const today = new Date();
const twoMonthsAgo = new Date(
    today.getFullYear(),
    today.getMonth() - 2,
    today.getDate(),
);
const twoMonthsFuture = new Date(
    today.getFullYear(),
    today.getMonth() + 2,
    today.getDate(),
);

/* Real exams with genuine questions.
   Field names stay as the teacher pages expect (date / time / questionText /
   correctAnswer); the normalizers in common.js convert them for the student
   pages. correctAnswer must match one of the options exactly. */

/* Dates are relative to today so the demo never goes stale. */
function dayOffset(days) {
    const d = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + days,
    );
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const exams = [
    {
        examId: 0,
        title: "HTML & CSS Fundamentals",
        date: dayOffset(3),
        time: "10:00",
        status: "active",
        questions: [
            {
                questionId: 0,
                type: "MCQ",
                questionText:
                    "Which HTML element is used to define the most important heading on a page?",
                options: ["<head>", "<h1>", "<header>", "<title>"],
                correctAnswer: "<h1>",
            },
            {
                questionId: 1,
                type: "MCQ",
                questionText:
                    "Which CSS property controls the space inside an element, between its content and its border?",
                options: ["margin", "border", "padding", "spacing"],
                correctAnswer: "padding",
            },
            {
                questionId: 2,
                type: "True/False",
                questionText:
                    "An element's id must be unique within the whole HTML document.",
                options: ["True", "False"],
                correctAnswer: "True",
            },
            {
                questionId: 3,
                type: "Checkbox",
                questionText:
                    "Which of the following are valid ways to include CSS in a page? (choose all that apply)",
                options: [
                    "An external file linked with <link>",
                    "A <style> block in the document",
                    "A style attribute on the element",
                    "A <css> tag in the body",
                ],
                correctAnswer: [
                    "An external file linked with <link>",
                    "A <style> block in the document",
                    "A style attribute on the element",
                ],
            },
            {
                questionId: 4,
                type: "Number",
                questionText:
                    "How many pixels wide is an element with width: 200px, padding: 10px and border: 5px, using the default box-sizing?",
                options: [],
                correctAnswer: "230",
            },
        ],
    },
    {
        examId: 1,
        title: "JavaScript Basics",
        date: dayOffset(7),
        time: "12:00",
        status: "active",
        questions: [
            {
                questionId: 0,
                type: "MCQ",
                questionText:
                    "Which keyword declares a variable that cannot be reassigned?",
                options: ["var", "let", "const", "static"],
                correctAnswer: "const",
            },
            {
                questionId: 1,
                type: "MCQ",
                questionText: "What does the === operator check?",
                options: [
                    "Value only",
                    "Value and type",
                    "Type only",
                    "Reference only",
                ],
                correctAnswer: "Value and type",
            },
            {
                questionId: 2,
                type: "True/False",
                questionText: "JavaScript array indexes start at 1.",
                options: ["True", "False"],
                correctAnswer: "False",
            },
            {
                questionId: 3,
                type: "Checkbox",
                questionText:
                    "Which of these array methods return a new array instead of changing the original?",
                options: ["map", "push", "filter", "slice"],
                correctAnswer: ["map", "filter", "slice"],
            },
            {
                questionId: 4,
                type: "Short_Answer",
                questionText:
                    "Which method converts a JavaScript object into a JSON string?",
                options: [],
                correctAnswer: "JSON.stringify",
            },
            {
                questionId: 5,
                type: "Number",
                questionText: "What is the value of [1, 2, 3].length + 2 ?",
                options: [],
                correctAnswer: "5",
            },
        ],
    },
    {
        examId: 2,
        title: "Web Storage & The DOM",
        date: dayOffset(10),
        time: "09:30",
        status: "active",
        questions: [
            {
                questionId: 0,
                type: "MCQ",
                questionText:
                    "Which storage keeps its data after the browser tab is closed?",
                options: [
                    "sessionStorage",
                    "localStorage",
                    "Both of them",
                    "Neither of them",
                ],
                correctAnswer: "localStorage",
            },
            {
                questionId: 1,
                type: "MCQ",
                questionText:
                    "Which method returns the first element that matches a CSS selector?",
                options: [
                    "getElementById",
                    "querySelector",
                    "querySelectorAll",
                    "getElementsByClassName",
                ],
                correctAnswer: "querySelector",
            },
            {
                questionId: 2,
                type: "True/False",
                questionText: "localStorage can only store string values.",
                options: ["True", "False"],
                correctAnswer: "True",
            },
            {
                questionId: 3,
                type: "Checkbox",
                questionText:
                    "Which of these are valid ways to change an element's classes from JavaScript?",
                options: [
                    "classList.add",
                    "classList.remove",
                    "classList.toggle",
                    "classList.replaceAll",
                ],
                correctAnswer: [
                    "classList.add",
                    "classList.remove",
                    "classList.toggle",
                ],
            },
            {
                questionId: 4,
                type: "Short_Answer",
                questionText:
                    "Which method removes a single item from localStorage by its key?",
                options: [],
                correctAnswer: "removeItem",
            },
        ],
    },
    {
        examId: 3,
        title: "Programming Logic",
        date: dayOffset(-14),
        time: "11:00",
        status: "completed",
        questions: [
            {
                questionId: 0,
                type: "MCQ",
                questionText:
                    "Which loop is guaranteed to run its body at least once?",
                options: ["for", "while", "do...while", "for...of"],
                correctAnswer: "do...while",
            },
            {
                questionId: 1,
                type: "True/False",
                questionText: "A function can return another function.",
                options: ["True", "False"],
                correctAnswer: "True",
            },
            {
                questionId: 2,
                type: "Checkbox",
                questionText: "Which of these values are falsy in JavaScript?",
                options: ["0", '""', "[]", "null"],
                correctAnswer: ["0", '""', "null"],
            },
            {
                questionId: 3,
                type: "Number",
                questionText:
                    "How many times does this loop run?  for (let i = 0; i < 5; i++)",
                options: [],
                correctAnswer: "5",
            },
        ],
    },
    {
        examId: 4,
        title: "Databases & SQL",
        date: dayOffset(-21),
        time: "13:00",
        status: "completed",
        questions: [
            {
                questionId: 0,
                type: "MCQ",
                questionText:
                    "Which SQL statement retrieves data from a table?",
                options: ["GET", "SELECT", "FETCH", "OPEN"],
                correctAnswer: "SELECT",
            },
            {
                questionId: 1,
                type: "MCQ",
                questionText:
                    "Which constraint uniquely identifies each row in a table?",
                options: ["FOREIGN KEY", "UNIQUE", "PRIMARY KEY", "INDEX"],
                correctAnswer: "PRIMARY KEY",
            },
            {
                questionId: 2,
                type: "True/False",
                questionText: "A table can have more than one PRIMARY KEY.",
                options: ["True", "False"],
                correctAnswer: "False",
            },
            {
                questionId: 3,
                type: "Short_Answer",
                questionText:
                    "Which clause filters the rows returned by a SELECT statement?",
                options: [],
                correctAnswer: "WHERE",
            },
        ],
    },
    {
        examId: 5,
        title: "Networking Basics (draft)",
        date: dayOffset(21),
        time: "10:00",
        status: "inactive",
        questions: [
            {
                questionId: 0,
                type: "MCQ",
                questionText:
                    "Which protocol is used to load web pages securely?",
                options: ["FTP", "HTTPS", "SMTP", "SSH"],
                correctAnswer: "HTTPS",
            },
            {
                questionId: 1,
                type: "True/False",
                questionText: "An IP address identifies a device on a network.",
                options: ["True", "False"],
                correctAnswer: "True",
            },
            {
                questionId: 2,
                type: "Number",
                questionText: "Which port does HTTPS use by default?",
                options: [],
                correctAnswer: "443",
            },
        ],
    },
    {
        examId: 6,
        title: "JavaScript In Depth",
        date: dayOffset(5),
        time: "11:00",
        status: "active",
        questions: [
            {
                questionId: 0,
                type: "MCQ",
                questionText:
                    "What is the result of typeof null in JavaScript?",
                options: ['"null"', '"object"', '"undefined"', '"number"'],
                correctAnswer: '"object"',
            },
            {
                questionId: 1,
                type: "MCQ",
                questionText:
                    "Which method adds one or more elements to the end of an array?",
                options: ["push", "pop", "shift", "unshift"],
                correctAnswer: "push",
            },
            {
                questionId: 2,
                type: "MCQ",
                questionText:
                    "What does the spread operator (...) do with an array?",
                options: [
                    "Deletes its elements",
                    "Expands it into individual elements",
                    "Sorts it",
                    "Reverses it",
                ],
                correctAnswer: "Expands it into individual elements",
            },
            {
                questionId: 3,
                type: "True/False",
                questionText: "Arrow functions have their own 'this' binding.",
                options: ["True", "False"],
                correctAnswer: "False",
            },
            {
                questionId: 4,
                type: "True/False",
                questionText: "let and const are block scoped.",
                options: ["True", "False"],
                correctAnswer: "True",
            },
            {
                questionId: 5,
                type: "Checkbox",
                questionText:
                    "Which of these are primitive types in JavaScript?",
                options: ["string", "object", "number", "boolean"],
                correctAnswer: ["string", "number", "boolean"],
            },
            {
                questionId: 6,
                type: "Checkbox",
                questionText: "Which methods can loop over an array?",
                options: ["forEach", "map", "toFixed", "reduce"],
                correctAnswer: ["forEach", "map", "reduce"],
            },
            {
                questionId: 7,
                type: "Short_Answer",
                questionText:
                    "Which keyword pauses a function until a promise resolves?",
                options: [],
                correctAnswer: "await",
            },
            {
                questionId: 8,
                type: "Number",
                questionText:
                    "What is the value of 2 ** 3 (2 to the power of 3)?",
                options: [],
                correctAnswer: "8",
            },
            {
                questionId: 9,
                type: "Number",
                questionText:
                    "What does [1, 2, 3, 4].filter(n => n > 2).length return?",
                options: [],
                correctAnswer: "2",
            },
        ],
    },
    {
        examId: 7,
        title: "HTML, CSS & Responsive Design",
        date: dayOffset(8),
        time: "09:00",
        status: "active",
        questions: [
            {
                questionId: 0,
                type: "MCQ",
                questionText: "Which tag is used to create a hyperlink?",
                options: ["<link>", "<a>", "<href>", "<nav>"],
                correctAnswer: "<a>",
            },
            {
                questionId: 1,
                type: "MCQ",
                questionText:
                    "Which CSS display value makes elements sit in a flexible row or column?",
                options: ["block", "inline", "flex", "none"],
                correctAnswer: "flex",
            },
            {
                questionId: 2,
                type: "MCQ",
                questionText:
                    "Which unit is relative to the root element's font size?",
                options: ["px", "em", "rem", "pt"],
                correctAnswer: "rem",
            },
            {
                questionId: 3,
                type: "MCQ",
                questionText:
                    "What is used to make a layout adapt to different screen sizes?",
                options: [
                    "media queries",
                    "id selectors",
                    "inline styles",
                    "the <table> tag",
                ],
                correctAnswer: "media queries",
            },
            {
                questionId: 4,
                type: "True/False",
                questionText:
                    "The <section> and <article> tags are semantic HTML elements.",
                options: ["True", "False"],
                correctAnswer: "True",
            },
            {
                questionId: 5,
                type: "True/False",
                questionText: "In the box model, margin is inside the border.",
                options: ["True", "False"],
                correctAnswer: "False",
            },
            {
                questionId: 6,
                type: "Checkbox",
                questionText: "Which of these are valid CSS position values?",
                options: ["relative", "absolute", "center", "sticky"],
                correctAnswer: ["relative", "absolute", "sticky"],
            },
            {
                questionId: 7,
                type: "Checkbox",
                questionText: "Which properties can align items with flexbox?",
                options: [
                    "justify-content",
                    "align-items",
                    "text-align",
                    "gap",
                ],
                correctAnswer: ["justify-content", "align-items", "gap"],
            },
            {
                questionId: 8,
                type: "Short_Answer",
                questionText: "Which CSS property changes the text colour?",
                options: [],
                correctAnswer: "color",
            },
        ],
    },
    {
        examId: 8,
        title: "General Programming Concepts",
        date: dayOffset(12),
        time: "13:30",
        status: "active",
        questions: [
            {
                questionId: 0,
                type: "MCQ",
                questionText: "What is a variable?",
                options: [
                    "A fixed value that never changes",
                    "A named container for storing data",
                    "A type of loop",
                    "A function that returns nothing",
                ],
                correctAnswer: "A named container for storing data",
            },
            {
                questionId: 1,
                type: "MCQ",
                questionText: "What does an if statement do?",
                options: [
                    "Repeats code a fixed number of times",
                    "Runs code only when a condition is true",
                    "Defines a new function",
                    "Stores a list of values",
                ],
                correctAnswer: "Runs code only when a condition is true",
            },
            {
                questionId: 2,
                type: "MCQ",
                questionText: "What is the purpose of a function?",
                options: [
                    "To style a web page",
                    "To group reusable code that performs a task",
                    "To store data permanently",
                    "To connect to the internet",
                ],
                correctAnswer: "To group reusable code that performs a task",
            },
            {
                questionId: 3,
                type: "MCQ",
                questionText:
                    "Which data structure stores items as key/value pairs?",
                options: ["Array", "Object", "Loop", "String"],
                correctAnswer: "Object",
            },
            {
                questionId: 4,
                type: "True/False",
                questionText: "A boolean can only be true or false.",
                options: ["True", "False"],
                correctAnswer: "True",
            },
            {
                questionId: 5,
                type: "True/False",
                questionText: "Comments are executed as part of the program.",
                options: ["True", "False"],
                correctAnswer: "False",
            },
            {
                questionId: 6,
                type: "Checkbox",
                questionText: "Which of these are programming loops?",
                options: ["for", "while", "if", "do...while"],
                correctAnswer: ["for", "while", "do...while"],
            },
            {
                questionId: 7,
                type: "Short_Answer",
                questionText:
                    "What keyword is used to send a value back from a function?",
                options: [],
                correctAnswer: "return",
            },
            {
                questionId: 8,
                type: "Number",
                questionText: "What is the remainder of 17 % 5 ?",
                options: [],
                correctAnswer: "2",
            },
        ],
    },
];

const results = [];
let resultIdCounter = 0;

/* Only exams that already happened get results, and marks follow the
   project's rule of one mark per question. */
const finishedExams = exams.filter((e) => e.status === "completed");

const studentList = users.filter((u) => u.role === "student");

studentList.forEach((student) => {
    const studentId = student.id;
    finishedExams.forEach((exam) => {
        /* Not everyone sits every exam. */
        if (Math.random() < 0.2) return;

        const studentAnswers = [];
        let score = 0;

        exam.questions.forEach((q) => {
            const gotItRight = Math.random() > 0.35;
            let userAnswer;

            if (gotItRight) {
                userAnswer = q.correctAnswer;
                score += 1;
            } else if (q.type === "True/False") {
                userAnswer = q.correctAnswer === "True" ? "False" : "True";
            } else if (q.type === "MCQ") {
                userAnswer = q.options.find((opt) => opt !== q.correctAnswer);
            } else if (q.type === "Checkbox") {
                /* an incomplete selection, which the all-or-nothing rule marks wrong */
                userAnswer = [q.correctAnswer[0]];
            } else {
                userAnswer = "0";
            }

            studentAnswers.push({
                questionId: q.questionId,
                userAnswer: userAnswer,
                isCorrect: gotItRight,
            });
        });

        const totalScore = exam.questions.length;

        /* Sat a day or two after the exam date. */
        const sat = new Date(exam.date);
        sat.setDate(sat.getDate() + Math.floor(Math.random() * 2));
        const stamp =
            `${sat.getFullYear()}-${String(sat.getMonth() + 1).padStart(2, "0")}-` +
            `${String(sat.getDate()).padStart(2, "0")} ` +
            `${String(9 + Math.floor(Math.random() * 6)).padStart(2, "0")}:` +
            `${String(Math.floor(Math.random() * 60)).padStart(2, "0")}:00`;

        results.push({
            resultId: resultIdCounter++,
            studentId: studentId,
            examId: exam.examId,
            score: score,
            totalScore: totalScore,
            status: (score / totalScore) * 100 >= 50 ? "pass" : "fail",
            date: stamp,
            studentAnswers: studentAnswers,
        });
    });
});

/* This file only builds the demo data. login.js decides whether to save it,
   and it saves only when a store is empty, so anything the teacher creates
   is never overwritten. */
