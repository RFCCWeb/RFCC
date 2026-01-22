// ===== RFCC Website JavaScript - Optimized =====

// DOM Elements
const greetingPopup = document.getElementById('greetingPopup');
const fireWordPopup = document.getElementById('fireWordPopup');
const closeGreeting = document.getElementById('closeGreeting');
const closeFireWord = document.getElementById('closeFireWord');
const continueToFireWord = document.getElementById('continueToFireWord');
const closeAndContinue = document.getElementById('closeAndContinue');
const fireWordTicker = document.getElementById('fireWordTicker');
const todayDate = document.getElementById('todayDate');
const dailyVerseRef = document.getElementById('dailyVerseRef');
const dailyVerseText = document.getElementById('dailyVerseText');
const dailyThought = document.getElementById('dailyThought');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const contactForm = document.getElementById('contactForm');

// Daily Scriptures
const dailyScriptures = [
    {
        verse: "Psalm 100:4",
        text: "Enter his gates with thanksgiving and his courts with praise; give thanks to him and praise his name.",
        thought: "Gratitude turns what you have into enough, opening doors to abundance."
    },
    {
        verse: "Jeremiah 29:11",
        text: "\"For I know the plans I have for you,\" declares the LORD, \"plans to prosper you and not to harm you, plans to give you hope and a future.\"",
        thought: "God's plans for you are perfect. Trust His timing and purpose."
    },
    {
        verse: "Philippians 4:13",
        text: "I can do all this through him who gives me strength.",
        thought: "With Christ, you are equipped for every challenge today."
    }
];

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Show greeting popup on first visit
    if (!sessionStorage.getItem('rfccGreetingShown')) {
        setTimeout(showGreetingPopup, 500);
    } else if (!sessionStorage.getItem('rfccFireWordShown')) {
        setTimeout(showFireWordPopup, 300);
    }
    
    // Set today's scripture
    const today = new Date();
    const dayIndex = today.getDate() % dailyScriptures.length;
    const scripture = dailyScriptures[dayIndex];
    
    dailyVerseRef.textContent = scripture.verse;
    dailyVerseText.textContent = `"${scripture.text}"`;
    dailyThought.textContent = scripture.thought;
    
    // Update ticker
    document.getElementById('tickerVerse').textContent = 
        `${scripture.verse} - "${scripture.text}" • ${scripture.thought} •`;
    
    // Format today's date
    todayDate.textContent = today.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    // Initialize carousel
    initCarousel();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize contact form
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
});

// ===== POPUP FUNCTIONS =====
function showGreetingPopup() {
    greetingPopup.style.display = 'flex';
}

function showFireWordPopup() {
    fireWordPopup.style.display = 'flex';
    sessionStorage.setItem('rfccFireWordShown', 'true');
}

// Close greeting popup
closeGreeting.addEventListener('click', function() {
    greetingPopup.style.display = 'none';
    sessionStorage.setItem('rfccGreetingShown', 'true');
    setTimeout(showFireWordPopup, 300);
});

// Continue to fire word
continueToFireWord.addEventListener('click', function() {
    greetingPopup.style.display = 'none';
    sessionStorage.setItem('rfccGreetingShown', 'true');
    showFireWordPopup();
});

// Close fire word popup
closeFireWord.addEventListener('click', function() {
    fireWordPopup.style.display = 'none';
    showFireWordTicker();
});

closeAndContinue.addEventListener('click', function() {
    fireWordPopup.style.display = 'none';
    showFireWordTicker();
});

function showFireWordTicker() {
    fireWordTicker.style.display = 'block';
}

// ===== CAROUSEL =====
function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Dot controls
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    // Auto rotate every 5 seconds
    setInterval(() => showSlide(currentSlide + 1), 5000);
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    if (!menuToggle || !navMenu) return;
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.main-nav') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
}

// ===== CONTACT FORM =====
function handleContactSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // In production, this would send to a server
    alert(`Thank you ${name}! Your message has been sent. We'll respond to ${email} soon.`);
    
    // Reset form
    e.target.reset();
}

// ===== SCROLL BEHAVIOR FOR TICKER =====
window.addEventListener('scroll', function() {
    const ticker = document.getElementById('fireWordTicker');
    if (ticker.style.display === 'block') {
        if (window.scrollY > 100) {
            ticker.style.position = 'fixed';
            ticker.style.top = '0';
        }
    }
});
