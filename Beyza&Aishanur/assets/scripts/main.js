function renderLiveMenu(menuArray) {
    const grid = document.getElementById('liveMenuGrid');
    if (!grid) return;
    grid.innerHTML = "";

    menuArray.forEach(drink => {
        grid.innerHTML += `
            <div class="order-card shadow-sm rounded bg-white p-3 text-center" style="width: 250px;">
                <img src="${drink.image}" alt="${drink.name}" class="img-fluid rounded mb-3" style="height: 180px; width: 100%; object-fit: cover;">
                <h4>${drink.name}</h4>
                <p style="font-size: 0.85rem; color: var(--text-light); height: 75px; overflow: hidden;">${drink.description}</p>
                <p class="price">$${drink.price.toFixed(2)} <span class="pts-badge" style="color: var(--matcha-light);">+${drink.points} pts</span></p>
                
                <select id="milk_${drink.id}" class="form-select mb-2">
                    <option value="Regular Milk">Regular Milk</option>
                    <option value="Almond Milk">Almond Milk</option>
                    <option value="Oat Milk">Oat Milk</option>
                      <option value="Protein Milk">Protein Milk</option>
                </select>
                
                <select id="syrup_${drink.id}" class="form-select mb-3">
                    <option value="No Syrup">No Syrup</option>
                    <option value="Vanilla">Vanilla Syrup</option>
                </select>
                
                <button class="btn add-to-cart w-100" onclick="addToCart('${drink.name}', ${drink.price}, ${drink.points}, 'milk_${drink.id}', 'syrup_${drink.id}')">Add</button>
            </div>
        `;
    });
}

if (document.getElementById('liveMenuGrid')) {
    renderLiveMenu(matchaMenu);
}

const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredMenu = matchaMenu.filter(drink => drink.name.toLowerCase().includes(searchTerm));
        renderLiveMenu(filteredMenu);
    });
}

const openOrder = document.getElementById('openOrder');
const closeOrder = document.getElementById('closeOrder');
const orderOverlay = document.getElementById('orderOverlay');

if (openOrder && orderOverlay) openOrder.onclick = () => orderOverlay.style.width = "100%";
if (closeOrder && orderOverlay) closeOrder.onclick = () => orderOverlay.style.width = "0%";

let cart = [];
let totalAmount = 0;
let totalPoints = 0;

function addToCart(itemName, price, points, milkSelectId, syrupSelectId) {
    const milkSelection = document.getElementById(milkSelectId).value;
    const syrupSelection = document.getElementById(syrupSelectId).value;

    cart.push({ name: itemName, price: price, points: points, milk: milkSelection, syrup: syrupSelection });
    totalAmount += price;
    totalPoints += points;
    updateCartUI();
    
    if(typeof showMessage === "function") {
        showMessage(`Added ${itemName} to cart!`, "success");
    }
}

function updateCartUI() {
    const cartItemsList = document.getElementById('cartItems');
    if (!cartItemsList) return; 
    
    cartItemsList.innerHTML = ""; 
    
    cart.forEach((item, index) => {
        cartItemsList.innerHTML += `
            <li style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid #eae5d9;">
                <div style="text-align: left;">
                    <strong style="color: var(--text-dark);">${item.name}</strong><br>
                    <span style="font-size: 0.8rem; color: var(--text-light);">${item.milk}, ${item.syrup}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 15px;">
                    <span style="font-weight: 600; color: var(--matcha-dark);">$${item.price.toFixed(2)}</span>
                    <button onclick="removeFromCart(${index})" style="background: none; border: none; color: #ff4d4d; cursor: pointer; font-size: 1.1rem;" title="Remove Item">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </li>
        `;
    });

    document.getElementById('cartTotal').innerText = Math.max(0, totalAmount).toFixed(2);
    document.getElementById('cartPoints').innerText = Math.max(0, totalPoints);
}

window.removeFromCart = function(index) {
    totalAmount -= cart[index].price;
    totalPoints -= cart[index].points;
    cart.splice(index, 1);
    updateCartUI();
    
    if(typeof showMessage === "function") {
        showMessage("Item removed from cart", "error");
    }
};

function checkout() {
    if (cart.length === 0) { 
        if (typeof showMessage === "function") {
            showMessage("Your cart is empty! Add some matcha first 🍵", "error");
        } else {
            alert("Empty cart!");
        }
        return;
    } 
    
    const activeSession = JSON.parse(localStorage.getItem('nekoUser'));

    if (!activeSession) {
        if(typeof showMessage === "function") {
            showMessage("Please Login or Sign Up to earn points!", "error");
        }
        setTimeout(() => window.location.href = "login.html", 1500); 
        return;
    }

    activeSession.points += totalPoints;
    localStorage.setItem('nekoUser', JSON.stringify(activeSession));

    const userIndex = users.findIndex(user => user.id === activeSession.id);
    if(userIndex > -1) {
        users[userIndex].points = activeSession.points;
        saveUsersData();
    }

    if(typeof showMessage === "function") {
        showMessage(`Order placed! You earned ${totalPoints} points ✨`, "success");
    }
    
    cart = [];
    totalAmount = 0;
    totalPoints = 0;
    updateCartUI();
    if(orderOverlay) orderOverlay.style.width = "0%";
}