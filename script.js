// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        // Handle absolute top scroll for the logo
        if (targetId === '#top') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }

        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Calculate offset for the fixed navbar
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Simple typing effect for the hero section
// Rotating typing effect for the hero section
const textElement = document.querySelector('.typing-text');
const phrases = [
    "Senior Software Engineer",
    "Golang Developer",
    "Systems Architect",
    "Tech Enthusiast",
];

let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentText = phrases[currentPhraseIndex];
    
    if (isDeleting) {
        // Remove a character
        textElement.textContent = currentText.substring(0, currentCharIndex - 1);
        currentCharIndex--;
    } else {
        // Add a character
        textElement.textContent = currentText.substring(0, currentCharIndex + 1);
        currentCharIndex++;
    }

    // Set typing and deleting speeds
    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && currentCharIndex === currentText.length) {
        // Pause at the end of the full phrase before deleting
        typeSpeed = 2000; 
        isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
        // Move to the next phrase and pause before typing again
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        typeSpeed = 500; 
    }

    setTimeout(typeWriter, typeSpeed);
}

// Clear the initial text and start the effect on load
textElement.textContent = '';
window.addEventListener('load', typeWriter);

// Add scroll shadow to navbar
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Phone Menu Logic
const phoneBtn = document.getElementById('phone-btn');
const phoneMenu = document.getElementById('phone-menu');
const viewPhoneBtn = document.getElementById('view-phone');

// Set your display number here
const displayPhoneNumber = "+91-8100295854"; 

// Toggle menu visibility
phoneBtn.addEventListener('click', (e) => {
    e.preventDefault();
    phoneMenu.classList.toggle('active');
});

// Handle "View" click to reveal number
viewPhoneBtn.addEventListener('click', (e) => {
    e.preventDefault();
    viewPhoneBtn.innerHTML = `<span class="viewed-number">${displayPhoneNumber}</span>`;
    viewPhoneBtn.style.cursor = 'default';
});

// Close menu when clicking outside of it
document.addEventListener('click', (e) => {
    if (!phoneBtn.contains(e.target) && !phoneMenu.contains(e.target)) {
        phoneMenu.classList.remove('active');
        
        // Reset the "View" button back to its default state after menu hides
        setTimeout(() => {
            if (!phoneMenu.classList.contains('active')) {
                viewPhoneBtn.innerHTML = `<i class="fas fa-eye"></i> View`;
                viewPhoneBtn.style.cursor = 'pointer';
            }
        }, 200); 
    }
});

// Mobile Hamburger Menu Logic
const mobileToggle = document.getElementById('mobile-menu-toggle');
const navLinksContainer = document.getElementById('nav-links');
const mobileIcon = mobileToggle.querySelector('i');

mobileToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');

    const isOpen = navLinksContainer.classList.contains('active');
    mobileToggle.setAttribute('aria-expanded', isOpen);

    if (isOpen) {
        mobileIcon.classList.remove('fa-bars');
        mobileIcon.classList.add('fa-times');
    } else {
        mobileIcon.classList.remove('fa-times');
        mobileIcon.classList.add('fa-bars');
    }
});

// Close mobile menu automatically when any link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileIcon.classList.remove('fa-times');
        mobileIcon.classList.add('fa-bars');
    });
});

// ── Animations ──────────────────────────────────────────────────────────────

document.documentElement.classList.add('js-ready');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {

    // Scroll-reveal observer — triggers when element is 48px inside viewport
    let scrollDir = 'down';
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        scrollDir = window.scrollY > lastScrollY ? 'down' : 'up';
        lastScrollY = window.scrollY;
    }, { passive: true });

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.toggle('scroll-up', scrollDir === 'up');
                requestAnimationFrame(() => entry.target.classList.add('is-visible'));
            } else {
                entry.target.classList.remove('is-visible', 'scroll-up');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

    // Section titles
    document.querySelectorAll('.section-title').forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // About paragraphs — staggered
    document.querySelectorAll('.about-content p').forEach((el, i) => {
        el.classList.add('reveal');
        el.style.setProperty('--reveal-delay', `${i * 110}ms`);
        revealObserver.observe(el);
    });

    // Timeline companies — staggered
    document.querySelectorAll('.timeline-company').forEach((el, i) => {
        el.classList.add('reveal');
        el.style.setProperty('--reveal-delay', `${i * 100}ms`);
        revealObserver.observe(el);
    });

    // Skill cards — staggered within the grid
    document.querySelectorAll('.skills-grid').forEach(grid => {
        [...grid.children].forEach((card, i) => {
            card.classList.add('reveal-card');
            card.style.setProperty('--reveal-delay', `${i * 90}ms`);
            revealObserver.observe(card);
        });
    });

    // Domain headers
    document.querySelectorAll('.domain-header').forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // Project cards — staggered per grid
    document.querySelectorAll('.projects-grid').forEach(grid => {
        [...grid.children].forEach((card, i) => {
            card.classList.add('reveal-card');
            card.style.setProperty('--reveal-delay', `${i * 80}ms`);
            revealObserver.observe(card);
        });
    });

    // Contact section
    const contactDesc = document.querySelector('.contact-desc');
    if (contactDesc) {
        contactDesc.classList.add('reveal');
        revealObserver.observe(contactDesc);
    }
    document.querySelectorAll('.contact-links > *').forEach((el, i) => {
        el.classList.add('reveal');
        el.style.setProperty('--reveal-delay', `${i * 80}ms`);
        revealObserver.observe(el);
    });

    // Hero grid parallax — shifts the dot grid subtly as page scrolls
    const heroEl = document.getElementById('hero');
    let rafPending = false;
    window.addEventListener('scroll', () => {
        if (!rafPending) {
            rafPending = true;
            requestAnimationFrame(() => {
                heroEl.style.setProperty('--scroll', window.scrollY);
                rafPending = false;
            });
        }
    }, { passive: true });
}