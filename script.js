const openBtn = document.getElementById('openMenu');
const closeBtn = document.getElementById('closeMenu');
const overlay = document.getElementById('menuOverlay');

openBtn.addEventListener('click', () => {
    overlay.style.width = "100%";
});

closeBtn.addEventListener('click', () => {
    overlay.style.width = "0%";
});
