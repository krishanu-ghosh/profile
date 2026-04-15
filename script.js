// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
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
    "Krishanu Ghosh",
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