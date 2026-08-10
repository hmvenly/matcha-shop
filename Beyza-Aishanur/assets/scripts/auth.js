// AUTHENTICATION & UI LOGIC (auth.js)

const ADMIN_PASSWORD_SECRET = "Neko123";

function showMessage(message, type) {
    const toastBox = document.getElementById("toastBox");
    if (!toastBox) return;

    const toast = document.createElement("div");
    toast.className = `toast-message ${type === "error" ? "error" : "success"}`;
    toast.innerText = message;

    toastBox.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {

    console.log("Auth System Loaded Successfully!");

    // 1. DYNAMIC NAVIGATION
    const accountLink = document.getElementById("accountLink");
    const activeSession = JSON.parse(localStorage.getItem("nekoUser"));

    if (accountLink && activeSession) {
        accountLink.innerHTML = `Welcome, ${activeSession.id}!`;

        if (activeSession.role === "admin") {
            const menuList = document.querySelector(".menu ul");
            if (menuList) {
                const adminItem = document.createElement("li");
                adminItem.innerHTML = `<a href="admin.html" style="color: var(--matcha-dark); font-weight: 600;">HQ <i class="fa-solid fa-gear"></i></a>`;
                menuList.insertBefore(adminItem, accountLink.parentElement);
            }
        }

        const logoutItem = document.createElement("li");
        logoutItem.innerHTML = `<a href="#" id="logoutLink">Logout <i class="fa-solid from-bracket"></i></a>`;
        accountLink.parentElement.after(logoutItem);

        const logoutBtn = document.getElementById("logoutLink");
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (event) => {
                event.preventDefault();
                localStorage.removeItem("nekoUser");
                window.location.href = "index.html";
            });
        }
    }

    // 2. REGISTRATION LOGIC
    const signupBtn = document.getElementById('signupSubmit');
    if (signupBtn) {
        signupBtn.addEventListener('click', async (event) => {
            event.preventDefault();
            const userId = document.getElementById('newUserId').value.trim();
            const userPassword = document.getElementById('newUserPass').value;

            if (!userId || !userPassword) return showMessage("Please enter ID and Password! 🍵", "error");
            if (userPassword.length < 6) return showMessage("Password must be at least 6 characters.", "error");

            try {
                const response = await fetch('http://localhost:5000/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: userId, password: userPassword })
                });

                const result = await response.json();

                if (!response.ok) {
                    return showMessage(result.error || "Registration failed", "error");
                }

                showMessage("Account created! Let's get some matcha ✨", "success");
                setTimeout(() => window.location.href = "login.html", 1500);
            } catch (err) {
                showMessage("Cannot connect to server!", "error");
            }
        });
    }

    // 3. LOGIN LOGIC
    const loginBtn = document.getElementById('loginSubmit');

    if (loginBtn) {
        loginBtn.addEventListener('click', async (event) => { // <-- Fixed: Added 'async' here
            event.preventDefault();

            const idInput = document.getElementById('loginId');
            const passwordInput = document.getElementById('loginPass');

            if (!idInput || !passwordInput) {
                return alert("CRITICAL ERROR: UI inputs missing!");
            }

            const userId = idInput.value.trim();
            const userPassword = passwordInput.value;

            if (!userId || !userPassword) {
                return showMessage("Please enter ID and Password!", "error");
            }

            // ADMIN CHECK
            if (userId.toLowerCase().includes('admin')) {
                if (userPassword === ADMIN_PASSWORD_SECRET) {
                    const adminSession = { id: userId, role: "admin", points: 999 };
                    localStorage.setItem("nekoUser", JSON.stringify(adminSession));

                    showMessage(`Welcome to HQ, ${userId}!`, "success");
                    setTimeout(() => window.location.href = "admin.html", 1500);
                } else {
                    showMessage("Incorrect Master Admin Password!", "error");
                }
                return;
            }

            // CUSTOMER CHECK VIA BACKEND
            try {
                const response = await fetch('http://localhost:5000/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: userId, password: userPassword })
                });

                const result = await response.json();

                if (!response.ok) {
                    return showMessage(result.error || "Invalid ID or Password!", "error");
                }

                localStorage.setItem("nekoUser", JSON.stringify({ id: userId, role: "customer" }));
                showMessage(`Welcome back, ${userId}!`, "success");
                setTimeout(() => window.location.href = "welcome.html", 1500);
            } catch (err) {
                showMessage("Cannot connect to server!", "error");
            }
        });
    }
});