const profileName = document.getElementById("profileName");
const fieldUsername = document.getElementById("fieldUsername");
const fieldPhone = document.getElementById("fieldPhone");
const fieldGender = document.getElementById("fieldGender");
const fieldNationalId = document.getElementById("fieldNationalId");

const statStudents = document.getElementById("statStudents");
const statExams = document.getElementById("statExams");
const statActive = document.getElementById("statActive");
const statResults = document.getElementById("statResults");

window.onload = function () {
  const teacher = requireRole("teacher");
  if (!teacher) return;

  fillFields(teacher);
  showStats();
};

/*   Account details from the session   */
function fillFields(teacher) {
  profileName.textContent = teacher.fullName || "—";
  fieldUsername.textContent = teacher.username || "—";
  fieldPhone.textContent = teacher.phone || "—";
  fieldGender.textContent = capitalise(teacher.gender);
  fieldNationalId.textContent = teacher.nationalId || "—";
}

function capitalise(value) {
  if (!value) return "—";
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

/*   Totals for what this teacher manages   */
function showStats() {
  const users = readStore("users");
  const exams = readExams();
  const results = readStore("results");

  statStudents.textContent = users.filter((u) => u.role === "student").length;
  statExams.textContent = exams.length;
  statActive.textContent = exams.filter((e) => e.status === "active").length;
  statResults.textContent = results.length;
}
