let token = "";
let applications = [];

const messageBox = document.getElementById("message-box");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const applicationForm = document.getElementById("application-form");
const authSection = document.getElementById("auth-section");
const appSection = document.getElementById("app-section");
const applicationsList = document.getElementById("applications-list");
const loadApplicationsBtn = document.getElementById("load-applications-btn");
const logoutBtn = document.getElementById("logout-btn");
const cancelEditBtn = document.getElementById("cancel-edit-btn");

function showMessage(text, type = "success") {
  messageBox.innerHTML = `<div class="message ${type}">${text}</div>`;
}

function clearMessage() {
  messageBox.innerHTML = "";
}

function getFormData() {
  return {
    job_title: document.getElementById("job_title").value,
    company_name: document.getElementById("company_name").value,
    status: document.getElementById("status").value,
    source: document.getElementById("source").value,
    application_url: document.getElementById("application_url").value || null,
    salary_text: document.getElementById("salary_text").value,
    applied_on: document.getElementById("applied_on").value || null,
    notes: document.getElementById("notes").value
  };
}

function fillForm(application) {
  document.getElementById("application-id").value = application.id;
  document.getElementById("job_title").value = application.job_title || "";
  document.getElementById("company_name").value = application.company_name || "";
  document.getElementById("status").value = application.status || "saved";
  document.getElementById("source").value = application.source || "";
  document.getElementById("application_url").value = application.application_url || "";
  document.getElementById("salary_text").value = application.salary_text || "";
  document.getElementById("applied_on").value = application.applied_on || "";
  document.getElementById("notes").value = application.notes || "";
}

function resetForm() {
  applicationForm.reset();
  document.getElementById("application-id").value = "";
  document.getElementById("status").value = "saved";
}

function renderApplications() {
  if (applications.length === 0) {
    applicationsList.innerHTML = `<p class="empty-state">No applications yet.</p>`;
    return;
  }

  applicationsList.innerHTML = applications.map(app => `
    <div class="application-card">
      <div class="application-card-title">${app.job_title}</div>
      <div class="application-card-sub">${app.company_name}</div>

      <div class="application-meta"><strong>Status:</strong> ${app.status}</div>
      <div class="application-meta"><strong>Source:</strong> ${app.source || "-"}</div>
      <div class="application-meta"><strong>Salary:</strong> ${app.salary_text || "-"}</div>
      <div class="application-meta"><strong>Applied on:</strong> ${app.applied_on || "-"}</div>
      <div class="application-meta"><strong>Notes:</strong> ${app.notes || "-"}</div>

      <div class="card-actions">
        <button type="button" class="btn-ghost" onclick="editApplication(${app.id})">Edit</button>
        <button type="button" class="btn-danger" onclick="deleteApplication(${app.id})">Delete</button>
      </div>
    </div>
  `).join("");
}

async function register(email, password, fullName) {
  const response = await fetch("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password,
      full_name: fullName || null
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Registration failed: ${errorText}`);
  }

  return await response.json();
}

async function login(email, password) {
  const body = new URLSearchParams();
  body.append("grant_type", "password");
  body.append("username", email);
  body.append("password", password);

  const response = await fetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json"
    },
    body
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Login failed: ${errorText}`);
  }

  const data = await response.json();
  token = data.access_token;
  authSection.classList.add("hidden");
  appSection.classList.remove("hidden");
  showMessage("Logged in successfully.");
}

async function loadApplications() {
  const response = await fetch("/applications/", {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json"
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to load applications: ${errorText}`);
  }

  applications = await response.json();

  const currentId = document.getElementById("application-id").value;
  if (currentId) {
    const stillExists = applications.some(app => app.id === Number(currentId));
    if (!stillExists) {
      resetForm();
    }
  }

  renderApplications();
}

async function saveApplication(payload, applicationId) {
  const hasId = applicationId && applicationId.trim() !== "";
  const url = hasId ? `/applications/${applicationId}` : "/applications/";
  const method = hasId ? "PUT" : "POST";

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to save application: ${errorText}`);
  }

  await response.json();
  resetForm();
  await loadApplications();
  showMessage(hasId ? "Application updated." : "Application created.");
}

async function deleteApplication(id) {
  const response = await fetch(`/applications/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json"
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to delete application: ${errorText}`);
  }

  const currentId = document.getElementById("application-id").value;
  if (currentId && Number(currentId) === id) {
    resetForm();
  }

  await loadApplications();
  showMessage("Application deleted.");
}

function editApplication(id) {
  const application = applications.find(app => app.id === id);
  if (application) {
    fillForm(application);
    clearMessage();
    showMessage("Editing application.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearMessage();

  try {
    await login(
      document.getElementById("email").value,
      document.getElementById("password").value
    );
    await loadApplications();
  } catch (error) {
    showMessage(error.message, "error");
  }
});

if (registerForm) {
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearMessage();

    const fullNameInput = document.getElementById("register-full-name");
    const emailInput = document.getElementById("register-email");
    const passwordInput = document.getElementById("register-password");

    try {
      await register(
        emailInput.value,
        passwordInput.value,
        fullNameInput ? fullNameInput.value : ""
      );

      await login(emailInput.value, passwordInput.value);
      await loadApplications();

      registerForm.reset();
      showMessage("Account created and logged in successfully.");
    } catch (error) {
      showMessage(error.message, "error");
    }
  });
}

applicationForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearMessage();

  const applicationId = document.getElementById("application-id").value;
  const payload = getFormData();

  try {
    await saveApplication(payload, applicationId);
  } catch (error) {
    showMessage(error.message, "error");
  }
});

if (cancelEditBtn) {
  cancelEditBtn.addEventListener("click", () => {
    resetForm();
    clearMessage();
    showMessage("Edit cancelled.");
  });
}

loadApplicationsBtn.addEventListener("click", async () => {
  clearMessage();

  try {
    await loadApplications();
  } catch (error) {
    showMessage(error.message, "error");
  }
});

logoutBtn.addEventListener("click", () => {
  token = "";
  applications = [];
  authSection.classList.remove("hidden");
  appSection.classList.add("hidden");
  applicationsList.innerHTML = `<p class="empty-state">No applications yet.</p>`;
  resetForm();
  clearMessage();
  showMessage("Logged out.");
});

window.editApplication = editApplication;
window.deleteApplication = deleteApplication;