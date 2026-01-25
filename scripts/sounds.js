// ===== RFCC VISTA SOUND EFFECTS SYSTEM =====
// Professional Vista-style sound effects for glass interface

class VistaSounds {
    constructor() {
        this.sounds = {};
        this.enabled = true;
        this.volume = 0.3;
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        this.init();
    }
    
    init() {
        // Check user preference
        const savedPref = localStorage.getItem('rfcc_sound_enabled');
        if (savedPref !== null) {
            this.enabled = savedPref === 'true';
        }
        
        // Create sound toggle in footer
        this.createSoundToggle();
        
        // Load sounds
        this.loadSounds();
        
        // Auto-attach sounds to Vista elements
        this.attachSounds();
    }
    
    loadSounds() {
        // Create Audio objects for each sound
        this.sounds = {
            hover: new Audio('assets/sounds/hover.mp3'),
            click: new Audio('assets/sounds/click.mp3'),
            success: new Audio('assets/sounds/success.mp3'),
            open: new Audio('assets/sounds/open.mp3'),
            close: new Audio('assets/sounds/close.mp3'),
            page: new Audio('assets/sounds/hover.mp3'), // Using hover for page transitions
            minimize: new Audio('assets/sounds/click.mp3'),
            maximize: new Audio('assets/sounds/hover.mp3')
        };
        
        // Configure all sounds
        Object.values(this.sounds).forEach(sound => {
            sound.volume = this.volume;
            sound.preload = 'auto';
            
            // Handle mobile audio restrictions
            if (this.isMobile) {
                sound.addEventListener('touchstart', () => {}, { once: true });
                sound.addEventListener('touchend', () => {}, { once: true });
            }
        });
    }
    
    play(soundName) {
        if (!this.enabled || !this.sounds[soundName]) return;
        
        try {
            // Reset and play
            this.sounds[soundName].currentTime = 0;
            
            // Use promise for better error handling
            const playPromise = this.sounds[soundName].play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    // Auto-play was prevented, user needs to interact first
                    console.log('Sound play prevented:', error);
                    
                    // Create a one-time interaction listener
                    const enableSound = () => {
                        document.removeEventListener('click', enableSound);
                        document.removeEventListener('touchstart', enableSound);
                        this.play(soundName); // Try again
                    };
                    
                    document.addEventListener('click', enableSound, { once: true });
                    document.addEventListener('touchstart', enableSound, { once: true });
                });
            }
        } catch (error) {
            console.log('Sound error:', error);
            // Fail silently - don't break website if sounds don't work
        }
    }
    
    // Convenience methods
    playHover() { this.play('hover'); }
    playClick() { this.play('click'); }
    playSuccess() { this.play('success'); }
    playOpen() { this.play('open'); }
    playClose() { this.play('close'); }
    playPage() { this.play('page'); }
    playMinimize() { this.play('minimize'); }
    playMaximize() { this.play('maximize'); }
    
    toggle(enabled) {
        this.enabled = enabled;
        localStorage.setItem('rfcc_sound_enabled', enabled);
        
        // Update toggle button
        this.updateToggleButton();
        
        // Play confirmation sound if turning on
        if (enabled) {
            this.playSuccess();
        }
    }
    
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        Object.values(this.sounds).forEach(sound => {
            sound.volume = this.volume;
        });
    }
    
    createSoundToggle() {
        // Check if toggle already exists
        if (document.getElementById('soundToggleBtn')) return;
        
        const toggleHTML = `
        <div class="sound-toggle">
            <button class="vista-btn small" id="soundToggleBtn">
                <i class="fas fa-volume-up"></i> Sounds On
            </button>
        </div>`;
        
        // Add to footer or create if doesn't exist
        let footerBottom = document.querySelector('.footer-bottom');
        if (!footerBottom) {
            footerBottom = document.createElement('div');
            footerBottom.className = 'footer-bottom';
            const footer = document.querySelector('.vista-footer .footer-content');
            if (footer) {
                footer.appendChild(footerBottom);
            }
        }
        
        footerBottom.insertAdjacentHTML('beforeend', toggleHTML);
        
        // Add event listener
        document.getElementById('soundToggleBtn').addEventListener('click', () => {
            this.toggle(!this.enabled);
        });
        
        // Update button initially
        this.updateToggleButton();
    }
    
    updateToggleButton() {
        const btn = document.getElementById('soundToggleBtn');
        if (!btn) return;
        
        if (this.enabled) {
            btn.innerHTML = '<i class="fas fa-volume-up"></i> Sounds On';
            btn.classList.add('fire');
        } else {
            btn.innerHTML = '<i class="fas fa-volume-mute"></i> Sounds Off';
            btn.classList.remove('fire');
        }
    }
    
    attachSounds() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.attachSoundsToElements());
        } else {
            this.attachSoundsToElements();
        }
    }
    
    attachSoundsToElements() {
        // Vista buttons
        document.querySelectorAll('.vista-btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => this.playHover());
            btn.addEventListener('click', () => this.playClick());
        });
        
        // Navigation items
        document.querySelectorAll('.vista-nav-item').forEach(item => {
            item.addEventListener('mouseenter', () => this.playHover());
            item.addEventListener('click', () => this.playClick());
        });
        
        // Vista cards
        document.querySelectorAll('.vista-card, .link-card, .service-card').forEach(card => {
            card.addEventListener('mouseenter', () => this.playHover());
            card.addEventListener('click', (e) => {
                // Only play if not clicking a button inside
                if (!e.target.closest('.vista-btn')) {
                    this.playClick();
                }
            });
        });
        
        // Menu toggle
        const menuToggle = document.querySelector('.menu-toggle');
        if (menuToggle) {
            menuToggle.addEventListener('click', () => this.playClick());
        }
        
        // Form submissions
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', () => this.playSuccess());
        });
        
        // Links (page transitions)
        document.querySelectorAll('a[href^="#"], a:not([href^="http"]):not([href^="mailto"]):not([href^="tel"])').forEach(link => {
            if (link.getAttribute('href') !== '#') {
                link.addEventListener('click', () => this.playPage());
            }
        });
        
        // Modal/Window controls
        document.querySelectorAll('.close-modal, .window-btn, .modal-close').forEach(btn => {
            btn.addEventListener('click', () => this.playClose());
        });
        
        // Play buttons in media
        document.querySelectorAll('.play-btn').forEach(btn => {
            btn.addEventListener('click', () => this.playSuccess());
        });
        
        // Copy buttons
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', () => this.playSuccess());
        });
        
        // Tab switches
        document.querySelectorAll('.tab-btn').forEach(tab => {
            tab.addEventListener('click', () => this.playClick());
        });
    }
    
    // Initialize sound on first user interaction (for mobile)
    initOnFirstInteraction() {
        if (!this.isMobile) return;
        
        const initSound = () => {
            // Play a silent sound to unlock audio
            const silentSound = new Audio();
            silentSound.volume = 0;
            silentSound.play().then(() => {
                silentSound.pause();
                silentSound.currentTime = 0;
            }).catch(() => {});
            
            // Remove listeners
            document.removeEventListener('click', initSound);
            document.removeEventListener('touchstart', initSound);
            document.removeEventListener('keydown', initSound);
        };
        
        document.addEventListener('click', initSound, { once: true });
        document.addEventListener('touchstart', initSound, { once: true });
        document.addEventListener('keydown', initSound, { once: true });
    }
}

// Initialize Vista Sounds globally
document.addEventListener('DOMContentLoaded', () => {
    window.vistaSounds = new VistaSounds();
    
    // For mobile devices, initialize on first interaction
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        window.vistaSounds.initOnFirstInteraction();
    }
});

// Export for module systems (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VistaSounds;
}
