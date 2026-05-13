// AUTHENTICATION & UI LOGIC (auth.js)

const ADMIN_PASSWORD_SECRET = "Neko123";

function showMessage(message, type) {
    const toastBox = document.getElementById("toastBox");
    if (!toastBox) return;

    const toast = document.createElement("div");
    // Using a template literal for the class
    toast.className = `toast-message ${type === "error" ? "error" : "success"}`;
    toast.innerText = message;
    
    toastBox.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {

    console.log("Auth System Loaded Successfully!");

    //1. DYNAMIC NAVIGATION
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

    //2. REGISTRATION LOGIC
    const signupBtn = document.getElementById('signupSubmit');
    if (signupBtn) {
        signupBtn.addEventListener('click', (event) => {
            event.preventDefault(); 
            const userId = document.getElementById('newUserId').value.trim();
            const userPassword = document.getElementById('newUserPass').value; 

            if (!userId || !userPassword) return showMessage("Please enter ID and Password! 🍵", "error");
            if (userPassword.length < 6) return showMessage("Password must be at least 6 characters.", "error");
            if (!/[0-9]/.test(userPassword)) return showMessage("Password must include at least one number.", "error");
            if (userId.toLowerCase().includes('admin')) return showMessage("You cannot use 'admin' in a customer ID!", "error");

            const userExists = typeof users !== 'undefined' && users.find(user => user.id === userId);
            if (userExists) return showMessage("That ID is already taken!", "error");

            const newUser = { id: userId, pass: userPassword, points: 100, role: "customer" };
            
            if (typeof users !== 'undefined') {
                users.push(newUser); 
                if (typeof saveUsersData === 'function') saveUsersData(); 
            }
            localStorage.setItem('nekoUser', JSON.stringify(newUser)); 
            
            showMessage("Account created! Let's get some matcha ✨", "success");
            setTimeout(() => window.location.href = "our-matcha.html", 1500);
        });
    }

    //3. LOGIN LOGIC
    const loginBtn = document.getElementById('loginSubmit');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', (event) => {
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

            if (typeof users === "undefined") {
                return alert("CRITICAL ERROR: data.js is not loaded properly!");
            }

        
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

            // NORMAL CUSTOMER CHECK
            const validUser = users.find(existingUser => existingUser.id === userId && existingUser.pass === userPassword);

            if (validUser) {
                localStorage.setItem("nekoUser", JSON.stringify(validUser)); 
                showMessage(`Welcome back, ${validUser.id}!`, "success"); 
                setTimeout(() => window.location.href = "welcome.html", 1500); 
            } else {
                showMessage("Invalid ID or Password! Try signing up.", "error"); 
            }
        });
    }
});