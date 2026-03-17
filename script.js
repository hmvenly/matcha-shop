<script>
    // 1. Menu Logic
    const openBtn = document.getElementById('openMenu');
    const closeBtn = document.getElementById('closeMenu');
    const menuOverlay = document.getElementById('menuOverlay');

    openBtn.onclick = () => menuOverlay.style.width = "100%";
    closeBtn.onclick = () => menuOverlay.style.width = "0%";

    // 2. Login & Dashboard Logic
    const loginTrigger = document.getElementById('loginTrigger');
    const loginOverlay = document.getElementById('loginOverlay');
    const loginSubmit = document.getElementById('loginSubmit');
    const dashboard = document.getElementById('pointsDashboard');
    const progressBar = document.getElementById('progressBar');

    const users = {
        "22401018": {
            name: "Aishanur", pass: "Aishanur", points: 650,
            orders: [
                { item: "Iced Banana Cloud Matcha", notes: "With oat milk / Less ice", pts: "+100" },
                { item: "Matcha Mochi Donut", notes: "Extra glaze", pts: "+50" },
                { item: "Ceremonial Matcha", notes: "Hot / No sweetener", pts: "+100" }
            ]
        },
        "22402692": {
            name: "Beyza", pass: "Beyza", points: 450,
            orders: [
                { item: "Strawberry Matcha Latte", notes: "With soy milk / 50% sugar", pts: "+100" },
                { item: "Iced Matcha", notes: "Regular milk / Extra ice", pts: "+100" }
            ]
        }
    };

    loginTrigger.onclick = (e) => {
        e.preventDefault();
        loginOverlay.style.width = "100%";
    };

    loginSubmit.onclick = () => {
        const userField = document.getElementById('username').value;
        const passField = document.getElementById('password').value;
        const userData = users[userField];

        if (userData && passField === userData.pass) {
            loginOverlay.style.width = "0%";
            dashboard.style.width = "100%";
            
            document.querySelector('#pointsDashboard h2').innerText = `${userData.name}'s Profile`;
            document.getElementById('userPoints').innerText = userData.points;
            
            let progressPercent = (userData.points / 800) * 100;
            setTimeout(() => { progressBar.style.width = progressPercent + "%"; }, 500);

            const orderList = document.getElementById('orderList');
            orderList.innerHTML = ""; 
            userData.orders.forEach(order => {
                orderList.innerHTML += `
                    <li style="margin-bottom: 15px; border-bottom: 0.5px solid rgba(47, 93, 58, 0.2); padding-bottom: 8px;">
                        <div style="display: flex; justify-content: space-between; align-items: baseline;">
                            <span style="font-weight: bold; text-transform: uppercase; font-size: 0.85rem;">${order.item}</span>
                            <span style="color: #6b8f71; font-size: 0.8rem; font-weight: bold;">${order.pts}</span>
                        </div>
                        <div style="font-style: italic; font-size: 0.75rem; color: #666; margin-top: 2px;">${order.notes}</div>
                    </li>`;
            });
        } else {
            alert("Invalid ID or Password 🍵");
        }
    };

    document.getElementById('closeLogin').onclick = () => loginOverlay.style.width = "0%";
    document.getElementById('closeDashboard').onclick = () => dashboard.style.width = "0%";
</script>
