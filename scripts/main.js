// ===== RFCC MAIN FUNCTIONALITY - VISTA THEME =====
class RFCCVista {
    constructor() {
        this.init();
    }
    
    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initNavigation();
            this.initVistaEffects();
            this.initServiceTabs();
            this.initPrayerRequest();
            this.initVisitorCounter();
            this.initLiveClock();
            this.initSmoothScroll();
        });
    }
    
    initNavigation() {
        const menuToggle = document.querySelector('.menu-toggle');
        const vistaNav = document.querySelector('.vista-nav');
        
        if (menuToggle && vistaNav) {
            menuToggle.addEventListener('click', () => {
                vistaNav.classList.toggle('active');
                this.playSound('click');
            });
            
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.vista-nav') && !e.target.closest('.menu-toggle')) {
                    vistaNav.classList.remove('active');
                }
            });
        }
        
        document.querySelectorAll('.vista-nav-item').forEach(item => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.vista-nav-item').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                this.playSound('click');
            });
            
            item.addEventListener('mouseenter', () => {
                this.playSound('hover');
            });
        });
    }
    
    initVistaEffects() {
        document.querySelectorAll('.vista-btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => this.playSound('hover'));
            btn.addEventListener('click', () => this.playSound('click'));
        });
        
        document.querySelectorAll('.vista-card, .link-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px)';
                this.playSound('hover');
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }
    
    initServiceTabs() {
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('click', () => {
                const serviceName = card.querySelector('h3').textContent;
                alert(`View detailed schedule for ${serviceName} on our Events page.`);
                this.playSound('click');
            });
        });
    }
    
    initPrayerRequest() {
        const prayerBtn = document.getElementById('prayerBtn');
        if (prayerBtn) {
            prayerBtn.addEventListener('click', () => {
                this.showPrayerModal();
                this.playSound('open');
            });
        }
    }
    
    showPrayerModal() {
        const modalHTML = `
        <div class="vista-modal-overlay">
            <div class="vista-modal vista-window">
                <div class="modal-header">
                    <h3><i class="fas fa-pray"></i> Submit Prayer Request</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="prayerForm">
                        <input type="text" placeholder="Your Name (Optional)" class="vista-input">
                        <textarea placeholder="Your prayer request..." rows="4" class="vista-input" required></textarea>
                        <select class="vista-input">
                            <option value="">Prayer Category</option>
                            <option value="healing">Healing & Health</option>
                            <option value="deliverance">Deliverance</option>
                            <option value="family">Family & Relationships</option>
                            <option value="financial">Financial Breakthrough</option>
                        </select>
                        <button type="submit" class="vista-btn fire">Submit Prayer</button>
                    </form>
                </div>
            </div>
        </div>`;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        document.querySelector('.close-modal').addEventListener('click', () => {
            document.querySelector('.vista-modal-overlay').remove();
            this.playSound('close');
        });
        
        document.getElementById('prayerForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.playSound('success');
            alert('Prayer request submitted! Our team will pray for you.');
            document.querySelector('.vista-modal-overlay').remove();
        });
    }
    
    initVisitorCounter() {
        const counter = document.getElementById('visitorCounter');
        if (counter) {
            let count = parseInt(localStorage.getItem('rfcc_visitors') || '1587');
            
            if (!sessionStorage.getItem('rfcc_visited')) {
                count++;
                localStorage.setItem('rfcc_visitors', count.toString());
                sessionStorage.setItem('rfcc_visited', 'true');
            }
            
            counter.textContent = count.toLocaleString();
            
            // Animate counter
            counter.style.fontSize = '3.5rem';
            setTimeout(() => {
                counter.style.fontSize = '3rem';
                counter.style.transition = 'font-size 0.3s ease';
            }, 300);
        }
    }
    
    initLiveClock() {
        const updateClock = () => {
            const now = new Date();
            const time = now.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            const date = now.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
            
            document.querySelectorAll('.live-clock').forEach(clock => {
                clock.textContent = `${date} | ${time}`;
            });
        };
        
        updateClock();
        setInterval(updateClock, 1000);
    }
    
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 100,
                        behavior: 'smooth'
                    });
                    this.playSound('click');
                }
            });
        });
    }
    
    playSound(type) {
        if (window.vistaSounds) {
            window.vistaSounds.play(type);
        }
    }
}

// Initialize
window.rfcc = new RFCCVista();
