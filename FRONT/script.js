const BASE_URL = "http://localhost:3000/api/students";

// If already logged in, skip the auth page
if (localStorage.getItem("token")) {
  window.location.href = "./students.html";
}

function switchTab(tab) {
  const isLogin = tab === "login";
  document.getElementById("login-form").hidden = !isLogin;
  document.getElementById("signup-form").hidden = isLogin;
  document.getElementById("tab-login").classList.toggle("active", isLogin);
  document.getElementById("tab-signup").classList.toggle("active", !isLogin);
}

const showError = (id, msg) => {
  const el = document.getElementById(id);
  el.textContent = msg;
  el.hidden = false;
};

const hideError = (id) => {
  document.getElementById(id).hidden = true;
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    hideError("login-error");
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      localStorage.setItem("token", data.token);
      window.location.href = "./students.html";
    } catch (err) {
      showError("login-error", err.message);
    }
  });

  document.getElementById("signup-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    hideError("signup-error");
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const major = document.getElementById("signup-major").value;
    const gpa = document.getElementById("signup-gpa").value;
    try {
      const res = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, major, gpa }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");
      localStorage.setItem("token", data.token);
      window.location.href = "./students.html";
    } catch (err) {
      showError("signup-error", err.message);
    }
  });
});
