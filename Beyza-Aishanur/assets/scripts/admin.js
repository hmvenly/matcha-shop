const adminMenuBody = document.getElementById('adminMenuBody');
const addDrinkBtn = document.getElementById('addDrinkBtn');

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

window.deleteDrink = function(drinkId) {
    if (!confirm("Are you sure you want to delete this drink?")) return;

    const index = matchaMenu.findIndex(drink => drink.id === drinkId);
    
    if (index > -1) {
        matchaMenu.splice(index, 1);
        saveMenuData();
        renderAdminMenu();
        
        if (typeof showMessage === "function") {
            showMessage("Drink removed from menu!", "success");
        } else {
            alert("Drink removed!");
        }
    }
};

if (addDrinkBtn) {
    addDrinkBtn.onclick = () => {
        const id = document.getElementById('drinkId').value.trim();
        const name = document.getElementById('drinkName').value.trim();
        const description = document.getElementById('drinkDesc').value.trim();
        const price = parseFloat(document.getElementById('drinkPrice').value);
        const points = parseInt(document.getElementById('drinkPoints').value);
        const image = document.getElementById('drinkImg').value;

        if (!id || !name || !description || isNaN(price) || isNaN(points)) {
            if (typeof showMessage === "function") {
                showMessage("Please fill out all fields correctly!", "error");
            } else {
                alert("Please fill out all fields correctly!");
            }
            return;
        }

        if (matchaMenu.some(drink => drink.id === id)) {
            if (typeof showMessage === "function") {
                showMessage("That Item ID already exists!", "error");
            } else {
                alert("That Item ID already exists!");
            }
            return;
        }

        const newDrink = { 
            id: id, 
            name: name, 
            description: description, 
            price: price, 
            points: points, 
            image: image 
        };

        matchaMenu.push(newDrink);
        saveMenuData();
        renderAdminMenu();

        document.getElementById('addDrinkForm').reset();

        if (typeof showMessage === "function") {
            showMessage(`${name} added to menu! ✨`, "success");
        } else {
            alert(`${name} added to menu! ✨`);
        }
    };
}

if (adminMenuBody) {
    renderAdminMenu();
}