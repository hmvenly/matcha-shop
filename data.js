// GLOBAL DATA STORE

// 1. MENU ITEMS
// Fetch from localStorage to persist admin changes, otherwise load default menu
let matchaMenu = JSON.parse(localStorage.getItem('nekoMenu')) || [
    {
        id: "drink_01",
        name: "Ceremonial Iced Matcha",
        description: "Pure, shade-grown ceremonial matcha hand-whisked to a vibrant green perfection, served over crisp ice and your choice of milk for a refreshing, earthy finish.",
        price: 6.50,
        points: 65,
        image: "assets/images/matcha.jpg"
    },
    {
        id: "drink_02",
        name: "Strawberry Matcha Cloud",
        description: "Sweet, house-made strawberry purée layered under iced milk and crowned with a velvety cloud of premium ceremonial matcha.",
        price: 7.50,
        points: 75,
        image: "assets/images/matchastrawberry.jpg"
    },
    {
        id: "drink_03",
        name: "Matcha Latte",
        description: "A comforting classic. Vibrant, finely milled Japanese matcha whisked to a perfect froth and poured over a smooth, creamy milk of your choice.",
        price: 5.50,
        points: 55,
        image: "assets/images/latte.png" 
    },
    {
        id: "drink_04", 
        name: "Chocolate Matcha Cloud",
        description: "Decadent dark chocolate swirled with creamy milk and topped with a thick, earthy matcha cold foam for the perfect bittersweet balance.",
        price: 6.00,
        points: 75,
        image: "assets/images/ChocoMatcha.jpg" 
    },
    {
        id: "drink_05",
        name: "Matcha Frappe",
        description: "A chilled indulgence. Bright, finely milled Japanese matcha blended with ice and your choice of milk, whipped into a smooth, creamy frappe with a light, refreshing finish.",
        price: 7.00,
        points: 80,
        image: "assets/images/matchafrappe.jpg" 
    }

];

let users = JSON.parse(localStorage.getItem('nekoUsers')) || [
    { 
        id: "Aishanur.admin", 
        pass: "Neko123", 
        points: 999, 
        role: "admin" 
    }
];
// Helper to save menu updates (Called by admin dashboard CRUD operations)
function saveMenuData() {
    localStorage.setItem('nekoMenu', JSON.stringify(matchaMenu));
}



// Helper to save user updates (Called during registration or points update)
function saveUsersData() {
    localStorage.setItem('nekoUsers', JSON.stringify(users));
}
