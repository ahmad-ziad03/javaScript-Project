const show=document.getElementById("results");
const show_answer=document.getElementById("show_answer");

display_results();

function display_results(){
    const results=JSON.parse(localStorage.getItem("results"))||[];
    const exams=JSON.parse(localStorage.getItem("exams"))||[];
    const users=JSON.parse(localStorage.getItem("users"))||[];
    let text=``;

    

    results.forEach((result,index) => {
        const student=users.find(u=>u.id===result.studentId); // look up by id, not array position
        const exam=exams.find(e=>(e.id!==undefined?e.id:e.examId)===result.examId); // exams may use id or examId
        const total=result.total!==undefined?result.total:result.totalScore; // students save total, seed saves totalScore
        const status=result.passed!==undefined?(result.passed?"pass":"fail"):result.status; // students save passed
        const date=result.submittedAt||result.date; // students save submittedAt
        text+=`<tr>
            <td>${index+1}</td>
            <td>${student?student.fullName:"Unknown student"}</td>
            <td>${exam?exam.title:"Deleted exam"}</td>
            <td>${result.score} /${total}</td>
            <td>${status}</td>
            <td>${date}</td>
            <td onclick="answer_by_exam(${index})"  data-bs-toggle="modal" data-bs-target="#myModal" class="btn btn--accent" >show</td>
        </tr>`;
    });

    show.innerHTML=`<table>
        <tr>
            <th>#</th>
            <th>Student Name</th>
            <th>Exam Title</th>
            <th>Result</th>
            <th>status</th>
            <th>Date</th>
            <th>Answer</th>
        </tr>
        ${text}
        </table>`;
}

function answer_by_exam(id){
    const results=JSON.parse(localStorage.getItem("results"))||[];
    //const exams=JSON.parse(localStorage.getItem("exams"))||[];
    let text=``;

    const answers=results[id].answers||results[id].studentAnswers||[]; // students save answers, seed saves studentAnswers
    answers.forEach((Answer,index)=>{
         const given=Answer.answer!==undefined?Answer.answer:Answer.userAnswer; // students save answer, seed saves userAnswer
         text+=`<tr>
            <td>${Answer.questionId}</td>
            <td>${Array.isArray(given)?given.join(", "):given}</td>
        </tr>`;

    });
     show_answer.innerHTML=`<table>
        <tr>
            <th>question</th>
            <th>Answer</th>
        </tr>
        ${text}
        </table>`
}
