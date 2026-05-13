let adminPassword = "Neko123";

let matchaMenu = JSON.parse(localStorage.getItem('nekoMenu')) || [
    {
        id: "drink_01",
        name: "Ceremonial Iced Matcha",
        description: "Pure, shade-grown ceremonial matcha hand-whisked to a vibrant green perfection.",
        price: 6.50,
        points: 65,
        image: "assets/images/matcha.jpg"
    },
    {
        id: "drink_02",
        name: "Strawberry Matcha Cloud",
        description: "Sweet, house-made strawberry purée layered under iced milk and matcha.",
        price: 7.50,
        points: 75,
        image: "assets/images/matchastrawberry.jpg"
    },
    {
        id: "drink_03",
        name: "Matcha Latte",
        description: "Vibrant Japanese matcha whisked and poured over smooth, creamy milk.",
        price: 5.50,
        points: 55,
        image: "assets/images/latte.png" 
    },
    {
        id: "drink_04", 
        name: "Chocolate Matcha Cloud",
        description: "Decadent dark chocolate swirled with creamy milk and matcha cold foam.",
        price: 6.00,
        points: 75,
        image: "assets/images/ChocoMatcha.jpg" 
    },
    {
        id: "drink_05",
        name: "Matcha Frappe",
        description: "Japanese matcha blended with ice and milk for a refreshing finish.",
        price: 7.00,
        points: 80,
        image: "assets/images/matchafrappe.jpg" 
    }
];

let users = JSON.parse(localStorage.getItem('nekoUsers')) || [
    { 
        id: "Aishanur.admin", 
        pass: adminPassword, 
        points: 999, 
        role: "admin" 
    }
];

function saveMenuData() {
    localStorage.setItem('nekoMenu', JSON.stringify(matchaMenu));
}

function saveUsersData() {
    localStorage.setItem('nekoUsers', JSON.stringify(users));
}