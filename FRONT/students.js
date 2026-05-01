const BASE_URL = "http://localhost:3000/api/students";

// Guard: redirect to login if no token
const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "./index.html";
}

// ── Helpers ───────────────────────────────────────────────────
const getInitials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const openModal = (student) => {
  document.getElementById("modal-avatar").textContent = getInitials(student.name || student.email);
  document.getElementById("modal-name").textContent = student.name || "—";
  document.getElementById("modal-major").textContent = student.major || "—";
  document.getElementById("modal-email").textContent = student.email;
  document.getElementById("modal-gpa").textContent =
    student.gpa != null ? `GPA ${Number(student.gpa).toFixed(1)}` : "";
  document.getElementById("modal-overlay").removeAttribute("hidden");
};

const closeModal = () => {
  document.getElementById("modal-overlay").setAttribute("hidden", "");
};

const createCard = (student) => {
  const card = document.createElement("div");
  card.className = "card";
  card.style.cursor = "pointer";
  card.innerHTML = `
    <div class="card-avatar">${getInitials(student.name || student.email)}</div>
    <div class="card-name">${student.name || "—"}</div>
    <div class="card-major">${student.major || "—"}</div>
    <div class="card-email">${student.email}</div>
    ${student.gpa != null ? `<span class="card-gpa">GPA ${Number(student.gpa).toFixed(1)}</span>` : ""}
  `;
  card.addEventListener("click", () => openModal(student));
  return card;
};

// ── Fetch & display ───────────────────────────────────────────
const displayStudents = async () => {
  const studentList = document.getElementById("student-list");
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "./index.html";
      return;
    }
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    const data = await res.json();
    const students = Array.isArray(data) ? data : data.students;
    if (!students || students.length === 0) {
      studentList.innerHTML = `<p class="error">No students found.</p>`;
      return;
    }
    studentList.innerHTML = "";
    students.forEach((s) => studentList.appendChild(createCard(s)));
  } catch (err) {
    studentList.innerHTML = `<p class="error">Could not load students: ${err.message}</p>`;
  }
};

// ── Init ──────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "./index.html";
  });

  document.getElementById("modal-close").addEventListener("click", closeModal);
  document.getElementById("modal-overlay").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  displayStudents();
});
