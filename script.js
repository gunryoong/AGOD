document.addEventListener('DOMContentLoaded', () => {
    console.log('AGOD Redesign Loaded');

    const header = document.querySelector('.site-header');
    const menuToggle = document.getElementById('menuToggle');
    const menuOverlay = document.getElementById('menuOverlay');
    const body = document.body;

    // Scroll effect for header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    function toggleMenu() {
        body.classList.toggle('menu-open');
    }

    menuToggle.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);
});
