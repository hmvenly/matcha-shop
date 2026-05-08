// ========================================== //
// ADMIN DASHBOARD LOGIC (admin.js)
// ========================================== //

const adminMenuBody = document.getElementById('adminMenuBody');
const addDrinkBtn = document.getElementById('addDrinkBtn');

// --- 1. RENDER ADMIN TABLE ---
function renderAdminMenu() {
    if (!adminMenuBody) return;
    adminMenuBody.innerHTML = "";

    matchaMenu.forEach(drink => {
        adminMenuBody.innerHTML += `
            <tr>
                <td><img src="${drink.image}" alt="${drink.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px; border: 1px solid #eae5d9;"></td>
                <td style="font-weight: 600; color: var(--text-dark);">${drink.name}</td>
                <td style="color: var(--text-light);">$${drink.price.toFixed(2)}</td>
                <td>
                    <button class="btn btn-sm" style="background-color: #ff4d4d; color: white; border-radius: 50%; width: 35px; height: 35px;" onclick="deleteDrink('${drink.id}')" title="Delete Item">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
}

// --- 2. DELETE DRINK LOGIC ---
// Attached to the window object so the HTML onclick can find it
window.deleteDrink = function(drinkId) {
    if (!confirm("Are you sure you want to delete this drink?")) return;

    // Find the exact drink in the array
    const index = matchaMenu.findIndex(d => d.id === drinkId);
    
    if (index > -1) {
        matchaMenu.splice(index, 1); // Remove it
        saveMenuData(); // Save the new array to localStorage
        renderAdminMenu(); // Refresh the table
        
        if (typeof showMessage === "function") {
            showMessage("Drink removed from menu!", "success");
        } else {
            alert("Drink removed!");
        }
    }
};

// --- 3. ADD NEW DRINK LOGIC ---
if (addDrinkBtn) {
    addDrinkBtn.onclick = () => {
        // Grab all the typed values
        const id = document.getElementById('drinkId').value.trim();
        const name = document.getElementById('drinkName').value.trim();
        const desc = document.getElementById('drinkDesc').value.trim();
        const price = parseFloat(document.getElementById('drinkPrice').value);
        const points = parseInt(document.getElementById('drinkPoints').value);
        const img = document.getElementById('drinkImg').value;

        // Strict Validation
        if (!id || !name || !desc || isNaN(price) || isNaN(points)) {
            return typeof showMessage === "function" 
                ? showMessage("Please fill out all fields correctly!", "error") 
                : alert("Please fill out all fields correctly!");
        }

        // Prevent Duplicate IDs
        if (matchaMenu.some(d => d.id === id)) {
            return typeof showMessage === "function" 
                ? showMessage("That Item ID already exists!", "error") 
                : alert("That Item ID already exists!");
        }

        // Build the new drink object
        const newDrink = { 
            id: id, 
            name: name, 
            description: desc, 
            price: price, 
            points: points, 
            image: img 
        };

        // Push to database, save, and refresh UI
        matchaMenu.push(newDrink);
        saveMenuData();
        renderAdminMenu();

        // Clear the input form automatically
        document.getElementById('addDrinkForm').reset();

        if (typeof showMessage === "function") {
            showMessage(`${name} added to menu! ✨`, "success");
        } else {
            alert(`${name} added to menu! ✨`);
        }
    };
}

// Initialize the table when the page loads
if (adminMenuBody) {
    renderAdminMenu();
}
