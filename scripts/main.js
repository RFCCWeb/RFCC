// ===== RFCC MAIN JAVASCRIPT =====
// Vista Glass Website with Interactive Features

class RFCCWebsite {
    constructor() {
        this.init();
    }
    
    init() {
        // Initialize components when DOM is ready
        document.addEventListener('DOMContentLoaded', () => {
            this.initNavigation();
            this.initCarousel();
            this.initSounds();
            this.initVisitorCounter();
            this.initMinistryGrid();
            this.initEventCountdowns();
            this.initPrayerRequest();
            this.updateLiveClock();
        });
    }
    
    initNavigation() {
        // Vista glass navigation
        const navItems = document.querySelectorAll('.vista-nav-item');
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');
        
        // Menu toggle for mobile
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                this.playSound('click');
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.main-nav') && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            });
        }
        
        // Navigation item clicks
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // Remove active class from all items
                navItems.forEach(nav => nav.classList.remove('active'));
                
                // Add active class to clicked item
                item.classList.add('active');
                
                // Play sound
                this.playSound('hover');
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            });
            
            // Hover sound
            item.addEventListener('mouseenter', () => {
                this.playSound('hover');
            });
        });
        
        // Dropdown menus
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('mouseenter', () => {
                dropdown.querySelector('.dropdown-content').style.display = 'block';
            });
            
            dropdown.addEventListener('mouseleave', () => {
                dropdown.querySelector('.dropdown-content').style.display = 'none';
            });
        });
    }
    
    initCarousel() {
        const carousel = document.querySelector('.vista-carousel-container');
        if (!carousel) return;
        
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dots = carousel.querySelectorAll('.carousel-dot');
        const prevBtn = carousel.querySelector('.carousel-arrow.prev');
        const nextBtn = carousel.querySelector('.carousel-arrow.next');
        
        let currentSlide = 0;
        let slideInterval;
        
        // Function to show a specific slide
        const showSlide = (n) => {
            // Hide all slides
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Calculate new slide index
            currentSlide = (n + slides.length) % slides.length;
            
            // Show current slide
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        };
        
        // Next slide function
        const nextSlide = () => {
            showSlide(currentSlide + 1);
        };
        
        // Previous slide function
        const prevSlide = () => {
            showSlide(currentSlide - 1);
        };
        
        // Event listeners for arrows
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                this.playSound('click');
                resetInterval();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                this.playSound('click');
                resetInterval();
            });
        }
        
        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                this.playSound('click');
                resetInterval();
            });
        });
        
        // Auto-rotate slides every 5 seconds
        const startInterval = () => {
            slideInterval = setInterval(nextSlide, 5000);
        };
        
        // Reset interval on user interaction
        const resetInterval = () => {
            clearInterval(slideInterval);
            startInterval();
        };
        
        // Start auto-rotation
        startInterval();
        
        // Pause on hover
        carousel.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            startInterval();
        });
        
        // Touch/swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        const handleSwipe = () => {
            const swipeThreshold = 50;
            
            if (touchStartX - touchEndX > swipeThreshold) {
                // Swipe left - next slide
                nextSlide();
                resetInterval();
            }
            
            if (touchEndX - touchStartX > swipeThreshold) {
                // Swipe right - previous slide
                prevSlide();
                resetInterval();
            }
        };
    }
    
    initSounds() {
        // Create audio elements for sounds
        this.sounds = {
            hover: new Audio('assets/sounds/hover.mp3'),
            click: new Audio('assets/sounds/click.mp3'),
            page: new Audio('assets/sounds/page.mp3')
        };
        
        // Set volume
        Object.values(this.sounds).forEach(sound => {
            sound.volume = 0.3;
        });
        
        // Preload sounds
        Object.values(this.sounds).forEach(sound => {
            sound.load();
        });
    }
    
    playSound(type) {
        if (this.sounds && this.sounds[type]) {
            this.sounds[type].currentTime = 0;
            this.sounds[type].play().catch(e => {
                // Sound play failed (user may have blocked audio)
                console.log('Sound play failed:', e);
            });
        }
    }
    
    initVisitorCounter() {
        const counterElement = document.getElementById('visitorCounter');
        if (!counterElement) return;
        
        // Simulate visitor count (in production, this would come from server)
        let count = localStorage.getItem('rfcc_visitor_count') || 1587;
        
        // Increment for this session
        if (!sessionStorage.getItem('rfcc_visited')) {
            count++;
            localStorage.setItem('rfcc_visitor_count', count);
            sessionStorage.setItem('rfcc_visited', 'true');
        }
        
        // Format with commas
        counterElement.textContent = count.toLocaleString();
        
        // Add fire animation
        counterElement.classList.add('fire-glow');
    }
    
    initMinistryGrid() {
        const ministryCards = document.querySelectorAll('.ministry-card');
        ministryCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
                this.playSound('hover');
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
            
            card.addEventListener('click', (e) => {
                if (!e.target.closest('a') && !e.target.closest('button')) {
                    const ministryName = card.querySelector('h3').textContent;
                    alert(`Learn more about ${ministryName} on our Ministries page.`);
                    this.playSound('click');
                }
            });
        });
    }
    
    initEventCountdowns() {
        const countdownElements = document.querySelectorAll('.countdown-timer');
        countdownElements.forEach(element => {
            const eventDate = element.getAttribute('data-date');
            if (eventDate) {
                this.updateCountdown(element, eventDate);
                setInterval(() => this.updateCountdown(element, eventDate), 1000);
            }
        });
    }
    
    updateCountdown(element, eventDate) {
        const now = new Date();
        const eventTime = new Date(eventDate).getTime();
        const timeDiff = eventTime - now.getTime();
        
        if (timeDiff > 0) {
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
            
            element.innerHTML = `
                <div class="countdown-item">
                    <span class="countdown-number">${days}</span>
                    <span class="countdown-label">Days</span>
                </div>
                <div class="countdown-separator">:</div>
                <div class="countdown-item">
                    <span class="countdown-number">${hours.toString().padStart(2, '0')}</span>
                    <span class="countdown-label">Hours</span>
                </div>
                <div class="countdown-separator">:</div>
                <div class="countdown-item">
                    <span class="countdown-number">${minutes.toString().padStart(2, '0')}</span>
                    <span class="countdown-label">Minutes</span>
                </div>
                <div class="countdown-separator">:</div>
                <div class="countdown-item">
                    <span class="countdown-number">${seconds.toString().padStart(2, '0')}</span>
                    <span class="countdown-label">Seconds</span>
                </div>
            `;
        } else {
            element.innerHTML = `<div class="event-live">🎉 EVENT LIVE NOW!</div>`;
        }
    }
    
    initPrayerRequest() {
        const prayerForm = document.getElementById('prayerForm');
        if (prayerForm) {
            prayerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const name = document.getElementById('prayerName').value;
                const request = document.getElementById('prayerRequest').value;
                
                // Show confirmation with animation
                const confirmation = document.createElement('div');
                confirmation.className = 'prayer-confirmation glass-panel';
                confirmation.innerHTML = `
                    <h3><i class="fas fa-pray"></i> Prayer Received!</h3>
                    <p>Thank you ${name || 'Beloved'}, your prayer request has been lifted up.</p>
                    <p>Our prayer team is interceding for you.</p>
                `;
                
                prayerForm.parentNode.insertBefore(confirmation, prayerForm.nextSibling);
                
                // Animate the confirmation
                confirmation.style.opacity = '0';
                confirmation.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    confirmation.style.transition = 'all 0.5s ease';
                    confirmation.style.opacity = '1';
                    confirmation.style.transform = 'translateY(0)';
                }, 10);
                
                // Reset form
                prayerForm.reset();
                
                // Play confirmation sound
                this.playSound('page');
                
                // Remove confirmation after 5 seconds
                setTimeout(() => {
                    confirmation.style.opacity = '0';
                    confirmation.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        confirmation.remove();
                    }, 500);
                }, 5000);
            });
        }
    }
    
    updateLiveClock() {
        const update = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', { 
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            const dateString = now.toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
            
            const clockElement = document.getElementById('mainClock');
            if (clockElement) {
                clockElement.textContent = `${dateString} | ${timeString}`;
            }
        };
        
        update();
        setInterval(update, 1000);
    }
    
    // Page transition effects
    initPageTransitions() {
        // Add page transition class to all internal links
        document.querySelectorAll('a[href^="#"], a:not([href^="http"])').forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.getAttribute('href') !== '#') {
                    this.playSound('page');
                    
                    // Add transition effect
                    document.body.style.opacity = '0.8';
                    document.body.style.transition = 'opacity 0.3s ease';
                    
                    setTimeout(() => {
                        document.body.style.opacity = '1';
                    }, 300);
                }
            });
        });
    }
}

// Initialize the website
window.rfccWebsite = new RFCCWebsite();
