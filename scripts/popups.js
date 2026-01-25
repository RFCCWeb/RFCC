// ===== VISTA STYLE POPUP SYSTEM =====
class VistaPopup {
    constructor() {
        // Vista colors for popup
        this.colors = {
            blue: '#0078D7',
            lightBlue: '#229FFF',
            white: '#FFFFFF',
            glass: 'rgba(255, 255, 255, 0.85)'
        };
        
        this.init();
    }
    
    init() {
        this.createVistaPopup();
        this.loadScriptures();
        this.initVistaClock();
    }
    
    createVistaPopup() {
        const popupHTML = `
        <div class="vista-popup-overlay" id="vistaPopupOverlay">
            <div class="vista-popup vista-window" id="vistaPopup">
                <div class="popup-header vista-glass">
                    <div class="header-left">
                        <i class="fas fa-fire" style="color: #FF8C00;"></i>
                        <h3>Daily Fire Word</h3>
                    </div>
                    <div class="header-right">
                        <div class="vista-clock" id="popupClock">00:00:00</div>
                        <button class="vista-btn close-btn" id="closePopup">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                
                <div class="popup-content">
                    <div class="vista-card scripture-card">
                        <div class="scripture-header">
                            <span class="vista-badge blue">GRATITUDE 2026</span>
                            <span class="scripture-ref" id="scriptureRef">Psalm 100:4</span>
                        </div>
                        <div class="scripture-text" id="scriptureText">
                            "Enter into his gates with thanksgiving, and into his courts with praise..."
                        </div>
                    </div>
                    
                    <div class="vista-card prayer-card">
                        <h4><i class="fas fa-praying-hands"></i> Prophetic Prayer</h4>
                        <p id="prayerText">Father, I enter Your presence with a heart full of thanksgiving...</p>
                    </div>
                    
                    <div class="popup-actions">
                        <button class="vista-btn" id="playMusicBtn">
                            <i class="fas fa-music"></i> Play Music
                        </button>
                        <button class="vista-btn" id="shareBtn">
                            <i class="fas fa-share-alt"></i> Share
                        </button>
                        <button class="vista-btn fire" id="closeActionBtn">
                            <i class="fas fa-check"></i> Amen & Close
                        </button>
                    </div>
                </div>
                
                <div class="popup-footer vista-glass">
                    <div class="footer-text">
                        <i class="fas fa-info-circle"></i>
                        Rhema Fire Christian Church • The Fire Generation
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Vista Ticker -->
        <div class="vista-ticker" id="vistaTicker">
            <div class="ticker-content">
                <span class="ticker-label"><i class="fas fa-fire"></i> Today's Word:</span>
                <span id="tickerVerse">Psalm 100:4 - Enter into his gates with thanksgiving...</span>
            </div>
        </div>`;
        
        document.body.insertAdjacentHTML('beforeend', popupHTML);
        this.bindVistaEvents();
    }
    
    bindVistaEvents() {
        // Vista style close buttons
        document.getElementById('closePopup').addEventListener('click', () => this.hidePopup());
        document.getElementById('closeActionBtn').addEventListener('click', () => this.hidePopup());
        
        // Play Vista sound on interactions
        document.querySelectorAll('.vista-btn').forEach(btn => {
            btn.addEventListener('click', () => this.playVistaSound('click'));
            btn.addEventListener('mouseenter', () => this.playVistaSound('hover'));
        });
    }
    
    playVistaSound(type) {
        if (window.vistaSounds) {
            window.vistaSounds.play(type);
        }
    }
    
    initVistaClock() {
        const update = () => {
            const now = new Date();
            const time = now.toLocaleTimeString('en-US', { 
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            document.getElementById('popupClock').textContent = time;
        };
        update();
        setInterval(update, 1000);
    }
    
    showPopup() {
        document.getElementById('vistaPopupOverlay').style.display = 'flex';
        this.playVistaSound('open');
    }
    
    hidePopup() {
        document.getElementById('vistaPopupOverlay').style.display = 'none';
        this.playVistaSound('close');
    }
}

// Initialize Vista Popup
document.addEventListener('DOMContentLoaded', () => {
    window.vistaPopup = new VistaPopup();
    // Show popup after 2 seconds
    setTimeout(() => window.vistaPopup.showPopup(), 2000);
});
