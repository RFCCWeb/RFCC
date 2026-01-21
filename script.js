// ===== RFCC Website JavaScript =====

// DOM Elements
const greetingPopup = document.getElementById('greetingPopup');
const fireWordPopup = document.getElementById('fireWordPopup');
const closeGreeting = document.getElementById('closeGreeting');
const closeFireWord = document.getElementById('closeFireWord');
const continueToFireWord = document.getElementById('continueToFireWord');
const closeAndContinue = document.getElementById('closeAndContinue');
const fireWordTicker = document.getElementById('fireWordTicker');
const tickerVerse = document.getElementById('tickerVerse');
const todayDate = document.getElementById('todayDate');
const dailyVerseRef = document.getElementById('dailyVerseRef');
const dailyVerseText = document.getElementById('dailyVerseText');
const dailyThought = document.getElementById('dailyThought');
const currentDateTime = document.getElementById('currentDateTime');
const visitorCount = document.getElementById('visitorCount');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const langButtons = document.querySelectorAll('.lang-btn');
const calendarDays = document.getElementById('calendarDays');
const currentMonth = document.getElementById('currentMonth');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const eventPopup = document.getElementById('eventPopup');
const closeEventPopup = document.querySelector('.close-event-popup');

// Social Media Links Configuration (UPDATE THESE)
const socialLinks = {
    facebook: "https://facebook.com/robert.nikoi",
    youtube: "https://youtube.com/@rfcgg",
    instagram: "https://instagram.com/rfcgg",
    twitter: "https://twitter.com/rfcgg",
    tiktok: "https://tiktok.com/@rfcgg",
    whatsapp: "https://wa.me/233249845856",
    website: "https://rfcgg.org",
    // Add more as needed
};

// Daily Scriptures Database (365 entries - ADD YOUR OWN)
const dailyScriptures = {
    1: {
        verse: "Psalm 100:4",
        text: "Enter his gates with thanksgiving and his courts with praise; give thanks to him and praise his name.",
        thought: "Gratitude turns what you have into enough, opening doors to abundance."
    },
    2: {
        verse: "Jeremiah 29:11",
        text: "\"For I know the plans I have for you,\" declares the LORD, \"plans to prosper you and not to harm you, plans to give you hope and a future.\"",
        thought: "God's plans for you are perfect. Trust His timing and purpose."
    },
    3: {
        verse: "Philippians 4:13",
        text: "I can do all this through him who gives me strength.",
        thought: "With Christ, you are equipped for every challenge today."
    },
    4: {
        verse: "Isaiah 40:31",
        text: "But those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
        thought: "Wait on God. He renews your strength for the journey ahead."
    },
    5: {
        verse: "Proverbs 3:5-6",
        text: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
        thought: "God's guidance is perfect. Trust Him completely today."
    }
    // Add 360 more entries for a full year...
};

// Ministry Events Data
const ministryEvents = {
    "2026-03-29": {
        title: "Good Friday Service",
        time: "6:00 PM",
        location: "Main Auditorium",
        description: "Commemoration of Christ's sacrifice on the cross. Special communion service."
    },
    "2026-03-31": {
        title: "Easter Sunday Celebration",
        time: "8:00 AM & 10:30 AM",
        location: "Rhema Prayer City",
        description: "Resurrection Sunday celebration with special music and message of hope."
    },
    "2026-04-15": {
        title: "Jesus Balm Medical Outreach",
        time: "9:00 AM - 4:00 PM",
        location: "Amanokrom Community",
        description: "Free medical checkup, medication, and prayer for the community."
    },
    "2026-12-25": {
        title: "Christmas Service",
        time: "9:00 AM",
        location: "Main Auditorium",
        description: "Celebrating the birth of our Savior with carols, drama, and special presentation."
    }
};

// Christian Holidays 2026
const christianHolidays = [
    "2026-03-29", // Good Friday
    "2026-03-31", // Easter Sunday
    "2026-12-25", // Christmas
    "2026-01-01", // New Year
    "2026-05-25", // Ascension Day
    "2026-06-05", // Pentecost
];

// Current Date
const today = new Date();
const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Show greeting popup on first visit
    if (!sessionStorage.getItem('rfccGreetingShown')) {
        setTimeout(() => {
            greetingPopup.style.display = 'flex';
        }, 1000);
    } else {
        // If already seen greeting, show fire word directly
        setTimeout(() => {
            showFireWordPopup();
        }, 500);
    }
    
    // Initialize today's date display
    updateDateTime();
    setInterval(updateDateTime, 60000); // Update every minute
    
    // Set today's scripture
    const scripture = dailyScriptures[dayOfYear] || dailyScriptures[1];
    dailyVerseRef.textContent = scripture.verse;
    dailyVerseText.textContent = `"${scripture.text}"`;
    dailyThought.textContent = scripture.thought;
    tickerVerse.textContent = `${scripture.verse} - "${scripture.text}"`;
    
    // Format today's date
    todayDate.textContent = today.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    // Initialize calendar
    generateCalendar(today.getFullYear(), today.getMonth());
    
    // Initialize countdown timer
    initializeCountdown();
    
    // Initialize photo slider
    initializePhotoSlider();
    
    // Initialize visitor counter (simulated)
    initializeVisitorCounter();
    
    // Initialize language switcher
    initializeLanguageSwitcher();
    
    // Initialize mobile menu
    initializeMobileMenu();
});

// ===== POPUP FUNCTIONS =====
closeGreeting.addEventListener('click', function() {
    greetingPopup.style.display = 'none';
    sessionStorage.setItem('rfccGreetingShown', 'true');
});

continueToFireWord.addEventListener('click', function() {
    greetingPopup.style.display = 'none';
    sessionStorage.setItem('rfccGreetingShown', 'true');
    showFireWordPopup();
});

function showFireWordPopup() {
    setTimeout(() => {
        fireWordPopup.style.display = 'flex';
    }, 300);
}

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

// ===== DATE & TIME FUNCTIONS =====
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    currentDateTime.textContent = now.toLocaleDateString('en-US', options);
}

// ===== CALENDAR FUNCTIONS =====
function generateCalendar(year, month) {
    // Clear previous calendar
    calendarDays.innerHTML = '';
    
    // Set current month display
    const monthNames = ["January", "February", "March", "April", "May", "June",
                       "July", "August", "September", "October", "November", "December"];
    currentMonth.textContent = `${monthNames[month]} ${year}`;
    
    // Get first day of month and total days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const totalDays = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    // Add empty cells for days before first day of month
    for (let i = 0; i < startingDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('empty-day');
        calendarDays.appendChild(emptyCell);
    }
    
    // Add days of the month
    for (let day = 1; day <= totalDays; day++) {
        const dayCell = document.createElement('div');
        dayCell.textContent = day;
        
        // Create date string for comparison
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        
        // Check if today
        if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
            dayCell.classList.add('today');
        }
        
        // Check if event day
        if (ministryEvents[dateStr]) {
            dayCell.classList.add('event-day');
            const eventIndicator = document.createElement('div');
            eventIndicator.classList.add('event-indicator');
            dayCell.appendChild(eventIndicator);
            
            // Add click event
            dayCell.addEventListener('click', function() {
                showEventPopup(dateStr);
            });
            dayCell.style.cursor = 'pointer';
        }
        
        // Check if holiday
        if (christianHolidays.includes(dateStr)) {
            dayCell.classList.add('holiday');
        }
        
        calendarDays.appendChild(dayCell);
    }
}

function showEventPopup(dateStr) {
    const event = ministryEvents[dateStr];
    if (event) {
        document.getElementById('popupEventTitle').textContent = event.title;
        document.getElementById('popupEventDate').textContent = `Date: ${formatDate(dateStr)}`;
        document.getElementById('popupEventTime').textContent = `Time: ${event.time}`;
        document.getElementById('popupEventLocation').textContent = `Location: ${event.location}`;
        document.getElementById('popupEventDescription').textContent = event.description;
        
        eventPopup.style.display = 'flex';
    }
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Calendar navigation
let currentCalendarDate = new Date();

prevMonthBtn.addEventListener('click', function() {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
    generateCalendar(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth());
});

nextMonthBtn.addEventListener('click', function() {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
    generateCalendar(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth());
});

// Close event popup
closeEventPopup.addEventListener('click', function() {
    eventPopup.style.display = 'none';
});

// ===== COUNTDOWN TIMER =====
function initializeCountdown() {
    // Set next event date (March 29, 2026 - Good Friday)
    const nextEvent = new Date('2026-03-29T18:00:00');
    
    function updateCountdown() {
        const now = new Date();
        const timeDiff = nextEvent - now;
        
        if (timeDiff > 0) {
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            
            document.getElementById('countdownDays').textContent = String(days).padStart(2, '0');
            document.getElementById('countdownHours').textContent = String(hours).padStart(2, '0');
            document.getElementById('countdownMinutes').textContent = String(minutes).padStart(2, '0');
        } else {
            // Event has passed
            document.getElementById('countdownDays').textContent = '00';
            document.getElementById('countdownHours').textContent = '00';
            document.getElementById('countdownMinutes').textContent = '00';
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 60000); // Update every minute
}

// ===== PHOTO SLIDER =====
function initializePhotoSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slide-prev');
    const nextBtn = document.querySelector('.slide-next');
    let currentSlide = 0;
    
    function showSlide(n) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current slide
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Next/previous controls
    nextBtn.addEventListener('click', function() {
        showSlide(currentSlide + 1);
    });
    
    prevBtn.addEventListener('click', function() {
        showSlide(currentSlide - 1);
    });
    
    // Dot controls
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
        });
    });
    
    // Auto slide every 5 seconds
    setInterval(function() {
        showSlide(currentSlide + 1);
    }, 5000);
}

// ===== VISITOR COUNTER =====
function initializeVisitorCounter() {
    // Simulated visitor count (in a real site, this would come from a server)
    let count = localStorage.getItem('rfccVisitorCount') || 1247;
    
    // Increment for this session
    if (!sessionStorage.getItem('rfccVisited')) {
        count++;
        localStorage.setItem('rfccVisitorCount', count);
        sessionStorage.setItem('rfccVisited', 'true');
    }
    
    // Format with commas
    visitorCount.textContent = count.toLocaleString();
}

// ===== LANGUAGE SWITCHER =====
function initializeLanguageSwitcher() {
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            
            // Update active button
            langButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // In a real implementation, this would load language files
            switchLanguage(lang);
        });
    });
}

function switchLanguage(lang) {
    // This is a simplified version. In production, you would:
    // 1. Load JSON language file
    // 2. Update all text elements with data-lang-key attributes
    
    console.log(`Switching to ${lang} language`);
    
    // Play greeting in selected language
    playLanguageGreeting(lang);
}

function playLanguageGreeting(lang) {
    // In production, you would have audio files:
    // assets/audio/voices/welcome-en.mp3
    // assets/audio/voices/welcome-fr.mp3
    // assets/audio/voices/welcome-tw.mp3
    
    console.log(`Playing welcome greeting in ${lang}`);
}

// ===== MOBILE MENU =====
function initializeMobileMenu() {
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
}

// ===== CAROUSEL AUTOPLAY =====
// Theme carousel autoplay
let carouselIndex = 0;
const carouselSlides = document.querySelectorAll('.carousel-slide');
const carouselDots = document.querySelectorAll('.dot');

function showCarouselSlide(n) {
    carouselSlides.forEach(slide => slide.classList.remove('active'));
    carouselDots.forEach(dot => dot.classList.remove('active'));
    
    carouselIndex = (n + carouselSlides.length) % carouselSlides.length;
    carouselSlides[carouselIndex].classList.add('active');
    carouselDots[carouselIndex].classList.add('active');
}

// Auto-rotate carousel every 6 seconds
setInterval(function() {
    showCarouselSlide(carouselIndex + 1);
}, 6000);

// Dot controls for carousel
carouselDots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
        showCarouselSlide(index);
    });
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// ===== SHARE FUNCTIONALITY =====
document.querySelector('.share-btn').addEventListener('click', function() {
    const verse = dailyVerseRef.textContent;
    const text = dailyVerseText.textContent;
    const thought = dailyThought.textContent;
    
    const shareText = `Today's Fire Word: ${verse}\n${text}\n\nThought: ${thought}\n\nFrom Rhema Fire Christian Church`;
    
    if (navigator.share) {
        navigator.share({
            title: `Daily Fire Word - ${verse}`,
            text: shareText,
            url: window.location.href
        });
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Fire Word copied to clipboard! Share with others.');
        });
    }
});

// ===== AUDIO PLAYER SIMULATION =====
document.querySelectorAll('.audio-play-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // In production, this would play actual audio
        alert('Audio playback would start here. In the full version, MP3 files will be loaded.');
    });
});

// ===== SOCIAL MEDIA LINK UPDATER =====
// This function would update all social media links with real URLs
function updateSocialLinks() {
    // Example: document.querySelector('.facebook-link').href = socialLinks.facebook;
    // You would implement this based on your actual social media URLs
}

// ===== SCROLL ANIMATIONS =====
// Add scroll animations for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.ministry-link, .vision-card, .event-card, .news-card').forEach(el => {
    observer.observe(el);
});

// ===== EXPORT FOR CUSTOMIZATION =====
// Make configuration available for easy updates
window.RFCC_CONFIG = {
    socialLinks: socialLinks,
    dailyScriptures: dailyScriptures,
    ministryEvents: ministryEvents,
    updateSocialLinks: function(links) {
        Object.assign(this.socialLinks, links);
        updateSocialLinks();
    },
    addScripture: function(day, verse, text, thought) {
        this.dailyScriptures[day] = { verse, text, thought };
    },
    addEvent: function(date, title, time, location, description) {
        this.ministryEvents[date] = { title, time, location, description };
    }
};
