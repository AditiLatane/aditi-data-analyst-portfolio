document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 50) {
                el.classList.add('active');
            }
        });
    };

    // Scroll Spy for active nav links
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    const updateActiveLink = () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 100; // Offset for better detection

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', () => {
        revealOnScroll();
        updateActiveLink();
    });

    // Run once on load
    revealOnScroll();
    updateActiveLink();

    // Smooth scroll for nav links (handled by CSS, but good to have JS fallback)
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.onclick = (e) => {
            e.stopPropagation();
            const isVisible = navLinks.classList.contains('mobile-active');
            if (isVisible) {
                navLinks.classList.remove('mobile-active');
            } else {
                navLinks.classList.add('mobile-active');
            }
        };
    }

    // Close menu on scroll or click outside
    window.addEventListener('scroll', () => {
        if (navLinks.classList.contains('mobile-active')) {
            navLinks.classList.remove('mobile-active');
        }
    });

    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.classList.remove('mobile-active');
        }
    });

    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
    }
    // Removed auto-dark mode detection to make light mode default

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            const currentTheme = body.classList.contains('dark-theme') ? 'dark-theme' : '';
            localStorage.setItem('theme', currentTheme);
        });
    }

    // Scroll effect for Navbar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.style.padding = '1rem 0';
        }
    });

    // Hero email link redirection and highlight
    const heroEmailLink = document.getElementById('hero-email-link');
    const contactEmail = document.getElementById('contact-email');

    if (heroEmailLink && contactEmail) {
        heroEmailLink.addEventListener('click', (e) => {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                window.scrollTo({
                    top: contactSection.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Add highlight class after scroll starts
                setTimeout(() => {
                    contactEmail.classList.add('highlight-method');
                    // Remove class after animation completes (7s)
                    setTimeout(() => {
                        contactEmail.classList.remove('highlight-method');
                    }, 7000);
                }, 500); // Wait for scroll to be mostly complete
            }
        });
    }

    // Form submission logic removed as contact form was removed.
});
