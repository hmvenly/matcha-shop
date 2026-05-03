// === ORDERING & CART LOGIC === //
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
    if(cart.length === 0) return alert("Your cart is empty! Add some matcha first 🍵");
    
    const savedUser = JSON.parse(localStorage.getItem('nekoUser'));
    if (!savedUser) {
        alert("Please Login or Sign Up to earn points on this order!");
        window.location.href = "login.html"; // Redirects to your new login page!
        return;
    }

    // Add points to user and save
    savedUser.points += totalPoints;
    localStorage.setItem('nekoUser', JSON.stringify(savedUser));

    alert(`Order placed! You earned ${totalPoints} points ✨`);
    
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

        if (!userId || !userPass) return alert("Please enter ID and Password! 🍵");

        const newUser = { id: userId, pass: userPass, points: 100 }; // Gives them 100 free points!
        localStorage.setItem('nekoUser', JSON.stringify(newUser));
        
        alert("Account created! Let's get some matcha ✨");
        window.location.href = "index.html"; // Sends them back to home
    };
}

if (loginSubmit) {
    loginSubmit.onclick = () => {
        const userId = document.getElementById('loginId').value;
        const userPass = document.getElementById('loginPass').value;
        const savedUser = JSON.parse(localStorage.getItem('nekoUser'));

        if (savedUser && savedUser.id === userId && savedUser.pass === userPass) {
            alert(`Welcome back, ${savedUser.id}!`);
            window.location.href = "index.html"; // Sends them back to home
        } else {
            alert("Invalid ID or Password! Or maybe you need to sign up first? 🍵");
        }
    };
}
