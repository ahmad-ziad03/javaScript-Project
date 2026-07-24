const greeting = document.getElementById("greeting");
const Total_Students = document.getElementById("Total_Students");
const Active_Exams = document.getElementById("Active_Exams");
const Inactive_Exams = document.getElementById("Inactive_Exams");
const examGrid = document.getElementById("examGrid");

const exams = JSON.parse(localStorage.getItem("exams")) || []; // fall back to an empty list
window.onload = function () {
    //const Teacher = JSON.parse(sessionStorage.getItem("login"));
    //if (!Teacher) return; // guard already redirected

    //showGreeting(Teacher);
    showStats();
    display_exams_by_last_week();
};

//    Greeting
function showGreeting(user) {
    greeting.textContent = `Welcome back ${user.fullName},`;
}

//    Stat cards
function showStats() {
    const Students = JSON.parse(localStorage.getItem("users"));
    Total_Students_counter = 0;
    Students.forEach((student) => {
        Total_Students_counter++;
    });
    Total_Students.innerHTML = Total_Students_counter;

    Active_Exams_counter = 0;
    Inactive_Exams_counter = 0;
    exams.forEach((exam) => {
        if (String(exam.status).toLowerCase() == "active")
            // status may be saved capitalised
            Active_Exams_counter++;
        else Inactive_Exams_counter++;
    });
    Active_Exams.innerHTML = Active_Exams_counter;
    Inactive_Exams.innerHTML = Inactive_Exams_counter;
}

function display_exams_by_last_week() {
    let text = ``;

    const active = exams.filter(
        (e) => String(e.status).toLowerCase() == "active",
    ); // the exams students can currently take
    active.sort(
        (a, b) =>
            new Date(a.date || a.dateTime) - new Date(b.date || b.dateTime),
    ); // soonest first

    active.forEach((exam) => {
        const when = exam.date || exam.dateTime || "-"; // builder saves date, student side saves dateTime
        const at = exam.time || ""; // time is only stored separately by the builder
        text += `<tr>
                <td>${exam.title}</td>
                <td>${when}</td>
                <td>${at}</td>
                <td>${exam.questions.length} Questions</td>
                <td class="status active">${exam.status}</td>
            </tr>`;
    });

    if (text == ``)
        // nothing active yet, so say so instead of showing an empty table
        text = `<tr><td colspan="5">No active exams yet. Activate an exam to show it here.</td></tr>`;
    examGrid.innerHTML = `<table>
        <tr>
            <th>Exam Title</th>
            <th>Date</th>
            <th>Time</th>
            <th>Questions</th>
            <th>Status</th>
        </tr>
        ${text}
    </table>`;
}
