// ================= API CONFIG =================
const API_BASE_URL = "http://localhost:8080";

// ================= GENERIC API CALL =================
async function apiCall(endpoint, method = "GET", body = null) {
    const config = {
        method,
        headers: { "Content-Type": "application/json" }
    };

    if (body && method !== "GET") {
        config.body = JSON.stringify(body);
    }

    const response = await fetch(API_BASE_URL + endpoint, config);

    if (!response.ok) {
        const text = await response.text();
        // Try to parse as JSON to get a clean error message
        try {
            const errJson = JSON.parse(text);
            throw new Error(errJson.error || errJson.message || "Request failed");
        } catch (parseErr) {
            if (parseErr.message && parseErr.message !== "Request failed") {
                throw parseErr; // Re-throw our own Error from above
            }
            throw new Error("Request failed");
        }
    }
    return response.json();
}

// ================= AUTH STORAGE =================
function setAuth(role, userId, userName) {
    localStorage.setItem("role", role);
    localStorage.setItem("userId", userId);
    localStorage.setItem("userName", userName);
}
function clearAuth() {
    localStorage.clear();
}
function getRole() {
    return localStorage.getItem("role");
}
function getUserId() {
    return localStorage.getItem("userId");
}
function getUserName() {
    return localStorage.getItem("userName");
}

// ================= AUTH CHECK =================
function checkAuth(requiredRole = null) {
    const role = getRole();

    if (!role) {
        window.location.href = "login.html";
        return false;
    }

    if (requiredRole && role !== requiredRole) {
        window.location.href =
            role === "ROLE_ADMIN" ? "admin.html" : "teacher.html";
        return false;
    }
    return true;
}

// ================= UI HELPERS =================
function showAlert(id, msg, type = "error") {
    const el = document.getElementById(id);
    if (!el) return;
    el.className = `alert alert-${type} show`;
    el.textContent = msg;
}
function hideAlert(id) {
    document.getElementById(id)?.classList.remove("show");
}
function displayUserInfo() {
    document.getElementById("userName")?.innerText = getUserName() || "";
}
function logout() {
    clearAuth();
    window.location.href = "login.html";
}
function toggleNavbar() {
    document.getElementById("navbarNav")?.classList.toggle("active");
}

// ================= AUTH APIs =================
async function login(email, password) {
    const data = await apiCall("/auth/login", "POST", { email, password });
    setAuth(data.role, data.userId, data.name);
    return data;
}

async function register(name, email, password, role) {
    return apiCall("/auth/register", "POST", { name, email, password, role });
}

// ================= ADMIN APIs =================
const fetchTeachers = () => apiCall("/admin/teachers");
const fetchSubjects = () => apiCall("/admin/subjects");
const fetchClassrooms = () => apiCall("/admin/classrooms");
const fetchClasses = () => apiCall("/class/all");

const addTeacher = (name, email, availability) =>
    apiCall("/admin/teacher", "POST", { name, email, availability });

const addSubject = (subjectName, hoursPerWeek) =>
    apiCall("/admin/subject", "POST", { subjectName, hoursPerWeek });

const addClassroom = (roomNumber, capacity) =>
    apiCall("/admin/classroom", "POST", { roomNumber, capacity });

// ================= TEACHER APIs =================
const fetchLectures = teacherId =>
    apiCall(`/teacher/${teacherId}/lectures`);

const updateAvailability = (teacherId, availability) =>
    apiCall(`/teacher/${teacherId}/availability?availability=${encodeURIComponent(availability)}`, "PUT");

// ================= REPORT APIs =================
const fetchReport = () => apiCall("/report/timetable");

const sendNotification = message =>
    apiCall(`/report/notify?message=${encodeURIComponent(message)}`, "POST");

// ================= TIMETABLE DROPDOWNS =================
async function loadTimetableDropdowns() {
    try {
        const [teachers, subjects, classrooms, classes] = await Promise.all([
            fetchTeachers(),
            fetchSubjects(),
            fetchClassrooms(),
            fetchClasses()
        ]);

        const teacherSelect = document.getElementById("teacherSelect");
        const subjectSelect = document.getElementById("subjectSelect");
        const classroomSelect = document.getElementById("classroomSelect");
        const classSelect = document.getElementById("classSelect");

        if (!teacherSelect) return;

        teacherSelect.innerHTML = `<option value="">Select Teacher</option>`;
        teachers.forEach(t => {
            teacherSelect.innerHTML += `<option value="${t.id}">${t.name}</option>`;
        });

        subjectSelect.innerHTML = `<option value="">Select Subject</option>`;
        subjects.forEach(s => {
            subjectSelect.innerHTML += `<option value="${s.id}">${s.subjectName}</option>`;
        });

        classroomSelect.innerHTML = `<option value="">Select Classroom</option>`;
        classrooms.forEach(c => {
            classroomSelect.innerHTML += `<option value="${c.id}">${c.roomNumber}</option>`;
        });

        classSelect.innerHTML = `<option value="">Select Class</option>`;
        classes.forEach(c => {
            classSelect.innerHTML += `<option value="${c.id}">${c.className} - ${c.division}</option>`;
        });

        console.log("✅ Timetable dropdowns loaded successfully");

    } catch (err) {
        console.error("❌ Failed to load timetable dropdowns", err);
    }
}

// ================= PAGE INITIALIZERS =================
function initLoginPage() {
    console.log("✅ initLoginPage called");

    const form = document.getElementById("loginForm");
    if (!form) {
        console.error("❌ loginForm not found");
        return;
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // 🔥 THIS IS THE KEY FIX

        console.log("✅ Login submit intercepted");

        try {
            hideAlert("loginAlert");

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const data = await login(email, password);

            console.log("✅ Login success:", data);

            if (data.role === "ROLE_ADMIN") {
                window.location.href = "admin.html";
            } else if (data.role === "ROLE_TEACHER") {
                window.location.href = "teacher.html";
            } else {
                throw new Error("Unknown role");
            }

        } catch (err) {
            showAlert("loginAlert", err.message || "Login failed");
        }
    });
}


function initRegisterPage() {
    const form = document.getElementById("registerForm");
    if (!form) return;

    form.addEventListener("submit", async e => {
        e.preventDefault();
        try {
            hideAlert("registerAlert");
            await register(
                document.getElementById("name").value,
                document.getElementById("email").value,
                document.getElementById("password").value,
                document.getElementById("role").value
            );
            showAlert("registerAlert", "Registration successful!", "success");
            setTimeout(() => window.location.href = "login.html", 1500);
        } catch (err) {
            showAlert("registerAlert", err.message);
        }
    });
}

function initAdminDashboard() {
    if (!checkAuth("ROLE_ADMIN")) return;
    displayUserInfo();

    document.getElementById("teacherForm")?.addEventListener("submit", async e => {
        e.preventDefault();
        try {
            await addTeacher(
                teacherName.value,
                teacherEmail.value,
                teacherAvailability.value
            );
            showAlert("adminAlert", "Teacher added successfully", "success");
            e.target.reset();
        } catch (err) {
            showAlert("adminAlert", err.message);
        }
    });

    document.getElementById("subjectForm")?.addEventListener("submit", async e => {
        e.preventDefault();
        try {
            await addSubject(subjectName.value, subjectHours.value);
            showAlert("adminAlert", "Subject added successfully", "success");
            e.target.reset();
        } catch (err) {
            showAlert("adminAlert", err.message);
        }
    });

    document.getElementById("classroomForm")?.addEventListener("submit", async e => {
        e.preventDefault();
        try {
            await addClassroom(roomNumber.value, roomCapacity.value);
            showAlert("adminAlert", "Classroom added successfully", "success");
            e.target.reset();
        } catch (err) {
            showAlert("adminAlert", err.message);
        }
    });
}

function initTeacherDashboard() {
    if (!checkAuth("ROLE_TEACHER")) return;
    displayUserInfo();

    const teacherId = getUserId();

    // Load lectures assigned to this teacher
    fetchLectures(teacherId).then(data => {
        const tbody = document.getElementById("lecturesBody");
        if (!tbody) return;

        if (data.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4" style="text-align: center;">No lectures assigned</td></tr>`;
            return;
        }

        tbody.innerHTML = data.map(l => `
            <tr>
                <td>${l.day}</td>
                <td>${l.timeSlot}</td>
                <td>${l.subject.subjectName}</td>
                <td>${l.classroom.roomNumber}</td>
            </tr>
        `).join("");
    }).catch(err => {
        console.error("Failed to load lectures", err);
    });

    // Handle availability form
    document.getElementById("availabilityForm")?.addEventListener("submit", async e => {
        e.preventDefault();
        try {
            hideAlert("teacherAlert");
            const availability = document.getElementById("availability").value;
            await updateAvailability(teacherId, availability);
            showAlert("teacherAlert", "Availability updated successfully", "success");
        } catch (err) {
            showAlert("teacherAlert", err.message);
        }
    });
}

function initClassPage() {
    if (!checkAuth("ROLE_ADMIN")) return;

    // Load existing class divisions
    fetchClasses().then(data => {
        const tbody = document.getElementById("classTableBody");
        if (!tbody) return;

        if (data.length === 0) {
            tbody.innerHTML = `<tr><td colspan="3" style="text-align: center;">No class divisions found</td></tr>`;
            return;
        }

        tbody.innerHTML = data.map(c => `
            <tr>
                <td>${c.id}</td>
                <td>${c.className}</td>
                <td>${c.division}</td>
            </tr>
        `).join("");
    }).catch(err => {
        console.error("Failed to load classes", err);
    });

    // Handle add class division form
    document.getElementById("classDivisionForm")?.addEventListener("submit", async e => {
        e.preventDefault();
        try {
            hideAlert("classAlert");
            const className = document.getElementById("className").value;
            const division = document.getElementById("division").value;

            await apiCall("/class/add", "POST", { className, division });
            showAlert("classAlert", "Class division added successfully", "success");
            e.target.reset();

            // Reload table
            initClassPage();
        } catch (err) {
            showAlert("classAlert", err.message);
        }
    });
}

function initReportPage() {
    if (!checkAuth("ROLE_ADMIN")) return;
    displayUserInfo();

    fetchReport().then(data => {
        const tbody = document.getElementById("reportBody");
        if (!tbody) return;

        tbody.innerHTML = data.map(l => `
            <tr>
                <td>${l.day}</td>
                <td>${l.timeSlot}</td>
                <td>${l.teacher.name}</td>
                <td>${l.subject.subjectName}</td>
                <td>${l.classroom.roomNumber}</td>
                <td>${l.classDivision.className}-${l.classDivision.division}</td>
            </tr>
        `).join("");
    });
}

// ================= GLOBAL PAGE ROUTER =================
document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;

    if (path === "/" || path.includes("index.html"))
        initLoginPage();
    if (path.includes("login.html")) initLoginPage();
    if (path.includes("register.html")) initRegisterPage();
    if (path.includes("admin.html")) initAdminDashboard();
    if (path.includes("teacher.html")) initTeacherDashboard();
    if (path.includes("class.html")) initClassPage();
    if (path.includes("report.html")) initReportPage();

    if (path.includes("timetable.html")) {
        checkAuth("ROLE_ADMIN");
        displayUserInfo();
        loadTimetableDropdowns();
    }
});
