document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const menuOverlay = document.getElementById('menu-overlay');
    const headerNav = document.getElementById('header-nav');

    // Open mobile slide menu
    if (menuToggle && headerNav) {
        menuToggle.addEventListener('click', () => {
            headerNav.classList.add('header__nav--open');
            if (menuOverlay) menuOverlay.classList.add('header__overlay--visible');
            menuToggle.setAttribute('aria-expanded', 'true');
        });
    }

    // Close mobile slide menu
    const closeMenu = () => {
        if (headerNav) {
            headerNav.classList.remove('header__nav--open');
            if (menuOverlay) menuOverlay.classList.remove('header__overlay--visible');
            if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
        }
    };

    if (menuClose) {
        menuClose.addEventListener('click', closeMenu);
    }
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }

    // Close mobile menu when links are clicked (useful for sitemap links & contact hash anchors)
    const links = document.querySelectorAll('.header__link');
    links.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
});
