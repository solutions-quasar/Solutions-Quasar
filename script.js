document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    function updateThemeIcon(isDark) {
        const icon = themeToggle?.querySelector('i');
        if (icon) {
            icon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
            if (window.lucide) {
                window.lucide.createIcons();
            }
        }
    }

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        updateThemeIcon(true);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = body.classList.toggle('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateThemeIcon(isDark);
        });
    }

    // Mobile Menu Toggle
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            document.body.classList.toggle('mobile-menu-open');
            mobileBtn.classList.toggle('active');
        });
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                if (window.innerWidth <= 960 && navLinks) {
                    document.body.classList.remove('mobile-menu-open');
                    mobileBtn?.classList.remove('active');
                }
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    // Update Year
    const yearElements = document.querySelectorAll('.current-year');
    const year = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = year;
    });

    // Smart Header
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        if (window.innerWidth > 960) {
            navbar.classList.remove('navbar-hidden');
            return;
        }

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Don't do anything if near top
        if (scrollTop < scrollThreshold) {
            navbar.classList.remove('navbar-hidden');
            return;
        }

        if (scrollTop > lastScrollTop) {
            // Scrolling down
            navbar.classList.add('navbar-hidden');
        } else {
            // Scrolling up
            navbar.classList.remove('navbar-hidden');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, { passive: true });
});
