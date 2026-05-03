// burdan sonrasını ekledim

    const adminUser = { // bunu ekledim
    id: "admin",
    pass: "admin123",
    points: 0,
    role: "admin"
};

function showMessage(message, type) {
    const toastBox = document.getElementById("toastBox");

    if (!toastBox) {
        return;
    }

    const toast = document.createElement("div");
    toast.className = "toast-message";

    if (type === "error") {
        toast.className += " error";
    }

    toast.innerText = message;
    toastBox.appendChild(toast);

    setTimeout(function () {
        toast.remove();
    }, 3000);
}

$(document).ready(function () {
    $(".menu ul").slicknav({
        label: "Menu",
        prependTo: "body"
    });
});

const accountLink = document.getElementById("accountLink");
const savedUserForHeader = JSON.parse(localStorage.getItem("nekoUser"));

if (accountLink && savedUserForHeader) {
    accountLink.innerHTML = `Welcome, ${savedUserForHeader.id}!`;

    if (savedUserForHeader.role === "admin") {
        const menuList = document.querySelector(".menu ul");

        const adminItem = document.createElement("li");
        adminItem.innerHTML = `<a href="admin.html" style="color: var(--matcha-dark); font-weight: 600;">HQ <i class="fa-solid fa-gear"></i></a>`;

        menuList.insertBefore(adminItem, accountLink.parentElement);
    }
    const logoutItem = document.createElement("li");
logoutItem.innerHTML = `<a href="#" id="logoutLink">Logout <i class="fa-solid fa-right-from-bracket"></i></a>`;
accountLink.parentElement.after(logoutItem);

document.getElementById("logoutLink").onclick = function () {
    localStorage.removeItem("nekoUser");
    window.location.href = "index.html";
};
}

// buraya kadar

const openOrder = document.getElementById('openOrder');
const closeOrder = document.getElementById('closeOrder');
const orderOverlay = document.getElementById('orderOverlay');

// We use 'if' statements to make sure these only run if the buttons actually exist on the page!
if (openOrder && orderOverlay) {
    openOrder.onclick = () => orderOverlay.style.width = "100%";
}

if (closeOrder && orderOverlay) {
    closeOrder.onclick = () => orderOverlay.style.width = "0%";
}

let cart = [];
let totalAmount = 0;
let totalPoints = 0;

function addToCart(itemName, price, points, milkSelectId, syrupSelectId) {
    const milk = document.getElementById(milkSelectId).value;
    const syrup = document.getElementById(syrupSelectId).value;

    cart.push({ name: itemName, price: price, points: points, milk: milk, syrup: syrup });
    totalAmount += price;
    totalPoints += points;
    updateCartUI();
}

function updateCartUI() {
    const cartItemsList = document.getElementById('cartItems');
    if (!cartItemsList) return; // Failsafe
    
    cartItemsList.innerHTML = ""; // clear list
    
    cart.forEach(item => {
        cartItemsList.innerHTML += `
            <li>
                <div>
                    <strong>${item.name}</strong><br>
                    <span style="font-size: 0.8rem; color: #666;">${item.milk}, ${item.syrup}</span>
                </div>
                <span>$${item.price.toFixed(2)}</span>
            </li>
        `;
    });

    document.getElementById('cartTotal').innerText = totalAmount.toFixed(2);
    document.getElementById('cartPoints').innerText = totalPoints;
}

function checkout() {
    if (cart.length === 0) { // değiştim
    showMessage("Your cart is empty! Add some matcha first 🍵", "error"); // bu
    return; // bu
} // bu
    
    const savedUser = JSON.parse(localStorage.getItem('nekoUser'));

    if (!savedUser) {
       showMessage("Please Login or Sign Up to earn points on this order!", "error"); // değiştim
        window.location.href = "login.html"; // Redirects to your new login page!
        return;
    }

    // Add points to user and save
    savedUser.points += totalPoints;
    localStorage.setItem('nekoUser', JSON.stringify(savedUser));

   showMessage(`Order placed! You earned ${totalPoints} points ✨`, "success"); // değiştim
    
    // Reset cart
    cart = [];
    totalAmount = 0;
    totalPoints = 0;
    updateCartUI();
    if(orderOverlay) orderOverlay.style.width = "0%";
}

// === AUTHENTICATION LOGIC (Login & Register) === //
const loginSubmit = document.getElementById('loginSubmit');
const signupSubmit = document.getElementById('signupSubmit');

if (signupSubmit) {
    signupSubmit.onclick = () => {
        const userId = document.getElementById('newUserId').value;
        const userPass = document.getElementById('newUserPass').value;

        if (!userId || !userPass) { // bu kısmı değiştim
    showMessage("Please enter ID and Password! 🍵", "error"); // bu
    return; } // bu

    if (userPass.length < 6) { // bunu da ekledim
    showMessage("Password must be at least 6 characters.", "error");
    return;
}

if (!/[0-9]/.test(userPass)) { // bunu da ekledim
    showMessage("Password must include at least one number.", "error");
    return;
}

        const newUser = { id: userId, pass: userPass, points: 100, role: "customer" }; // değiştim
        localStorage.setItem('nekoUser', JSON.stringify(newUser));
        
        showMessage("Account created! Let's get some matcha ✨", "success"); // değiştim
        window.location.href = "index.html"; // Sends them back to home
    };
}

if (loginSubmit) { // burdan sonrasını değiştim
    loginSubmit.onclick = () => {
        const userId = document.getElementById('loginId').value;
        const userPass = document.getElementById('loginPass').value;
        const savedUser = JSON.parse(localStorage.getItem('nekoUser'));

        if (userId === adminUser.id && userPass === adminUser.pass) {
    localStorage.setItem("nekoUser", JSON.stringify(adminUser));
    showMessage(`Welcome back, ${adminUser.id}!`, "success");

    setTimeout(function () {
        window.location.href = "index.html";
    }, 1500);
}
else if (savedUser && savedUser.id === userId && savedUser.pass === userPass) {
    showMessage(`Welcome back, ${savedUser.id}!`, "success");

    setTimeout(function () {
        window.location.href = "index.html";
    }, 1500);
}
else {
    showMessage("Invalid ID or Password! Or maybe you need to sign up first? 🍵", "error");
}
    };
}
