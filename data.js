/* 
   1. THE MENU ARRAY 
   This holds all the drinks that will display on the index page
   and manage on the admin dashboard
*/
let matchaMenu = [
    {
        id: "drink_01",
        name: "Ceremonial Iced Matcha",
        description: "Premium ceremonial grade matcha whisked with your choice of milk.",
        price: 6.50,
        points: 65,
        image: "assets/images/matcha.png"
    },
    {
        id: "drink_02",
        name: "Strawberry Matcha Cloud",
        description: "Sweet strawberry purée layered with rich matcha and creamy milk.",
        price: 7.50,
        points: 75,
        image: "assets/images/matchastrawberry.png"
    },
    {
        id: "drink_03",
        name: "Matcha Latte",
        description: "Smooth, creamy, and balanced with rich Japanese matcha.",
        price: 5.50,
        points: 55,
        image: "assets/images/latte.png" // Make sure to add a cute pic for this later!
    }
];

/* 
   2. THE USERS ARRAY 
   We try to grab existing users from localStorage first so they don't get deleted 
   when you refresh the page. If it's empty, we load in some default accounts!
*/
let users = JSON.parse(localStorage.getItem('nekoUsers')) || [
    {
        id: "admin",
        pass: "admin123",
        points: 999,
        role: "admin" // You can use this later to hide/show the admin dashboard!
    },
    {
        id: "beyzos",
        pass: "matcha4ever",
        points: 200,
        role: "user"
    }
];

/* 
   3. SAVE HELPER 
   Call this function whenever someone registers or earns points 
   so the changes are saved permanently to the browser.
*/
function saveUsersData() {
    localStorage.setItem('nekoUsers', JSON.stringify(users));
}
