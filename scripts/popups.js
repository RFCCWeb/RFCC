// ===== RFCC ENHANCED POPUP SYSTEM =====
// Vista Glass Design + KJV Verses + Music + History

class FireWordPopup {
    constructor() {
        // KJV Scriptures focused on Gratitude & Prophetic Warfare
        this.scriptures = {
            // GRATITUDE Theme (2026)
            'gratitude': [
                {
                    reference: "Psalm 100:4",
                    verse: "Enter into his gates with thanksgiving, and into his courts with praise: be thankful unto him, and bless his name.",
                    prayer: "Father, I enter Your presence with a heart full of thanksgiving. Open the gates of glory for me today as I offer You the sacrifice of praise."
                },
                {
                    reference: "1 Thessalonians 5:18",
                    verse: "In every thing give thanks: for this is the will of God in Christ Jesus concerning you.",
                    prayer: "Lord, teach me to give thanks in ALL circumstances. Let gratitude be my weapon against discouragement and my key to unlocking Your will."
                },
                {
                    reference: "Philippians 4:6",
                    verse: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.",
                    prayer: "Heavenly Father, I bring all my cares to You today with thanksgiving. Let my grateful heart activate answers to my prayers."
                },
                {
                    reference: "Colossians 3:15",
                    verse: "And let the peace of God rule in your hearts, to the which also ye are called in one body; and be ye thankful.",
                    prayer: "God of peace, let Your peace rule my heart as I cultivate a spirit of thankfulness. Dispel all anxiety with the power of gratitude."
                },
                {
                    reference: "Psalm 107:1",
                    verse: "O give thanks unto the LORD, for he is good: for his mercy endureth for ever.",
                    prayer: "I thank You Lord for Your goodness and enduring mercy. Let Your mercy speak for me in every situation today."
                }
            ],
            // PROPHETIC WARFARE Scriptures
            'warfare': [
                {
                    reference: "2 Corinthians 10:4",
                    verse: "(For the weapons of our warfare are not carnal, but mighty through God to the pulling down of strong holds;)",
                    prayer: "Mighty God, I take up spiritual weapons today. Pull down every stronghold opposing my destiny in Jesus' name."
                },
                {
                    reference: "Ephesians 6:12",
                    verse: "For we wrestle not against flesh and blood, but against principalities, against powers, against the rulers of the darkness of this world, against spiritual wickedness in high places.",
                    prayer: "Lord of hosts, open my eyes to spiritual realities. Equip me to wrestle effectively against every dark power assigned against me."
                },
                {
                    reference: "Isaiah 54:17",
                    verse: "No weapon that is formed against thee shall prosper; and every tongue that shall rise against thee in judgment thou shalt condemn. This is the heritage of the servants of the LORD, and their righteousness is of me, saith the LORD.",
                    prayer: "By the blood of Jesus, I condemn every weapon formed against me. No tongue rising in judgment shall prosper. I claim my heritage as Your servant."
                },
                {
                    reference: "Psalm 144:1",
                    verse: "Blessed be the LORD my strength, which teacheth my hands to war, and my fingers to fight:",
                    prayer: "Teach my hands to war and my fingers to fight, O Lord. Be my strength in every spiritual battle I face today."
                },
                {
                    reference: "Jeremiah 51:20",
                    verse: "Thou art my battle axe and weapons of war: for with thee will I break in pieces the nations, and with thee will I destroy kingdoms;",
                    prayer: "Use me as Your battle axe today, Lord. Break every enemy stronghold and destroy every kingdom of darkness opposing Your will."
                }
            ],
            // DELIVERANCE Scriptures
            'deliverance': [
                {
                    reference: "Luke 10:19",
                    verse: "Behold, I give unto you power to tread on serpents and scorpions, and over all the power of the enemy: and nothing shall by any means hurt you.",
                    prayer: "I receive power over all the enemy's power today. No weapon formed against me shall prosper. I tread upon serpents and scorpions in Jesus' name."
                },
                {
                    reference: "Psalm 91:13",
                    verse: "Thou shalt tread upon the lion and adder: the young lion and the dragon shalt thou trample under feet.",
                    prayer: "I trample every lion, adder, and dragon under my feet today. No evil shall prevail against me for I dwell in Your secret place."
                },
                {
                    reference: "James 4:7",
                    verse: "Submit yourselves therefore to God. Resist the devil, and he will flee from you.",
                    prayer: "I submit to You completely, Lord. As I resist the devil in every area of my life, I command him to flee now in Jesus' name."
                },
                {
                    reference: "1 John 4:4",
                    verse: "Ye are of God, little children, and have overcome them: because greater is he that is in you, than he that is in the world.",
                    prayer: "Greater is He that is in me than he that is in the world! I walk in victory today, overcoming every challenge by Your power within me."
                },
                {
                    reference: "Psalm 34:17",
                    verse: "The righteous cry, and the LORD heareth, and delivereth them out of all their troubles.",
                    prayer: "Hear my cry today, O Lord. Deliver me from every trouble and set my feet upon the rock. Thank You for being my deliverer."
                }
            ]
        };
        
        // Music files (you'll replace with your MP3 files)
        this.musicFiles = [
            'assets/music/worship1.mp3',
            'assets/music/worship2.mp3', 
            'assets/music/worship3.mp3',
            'assets/music/prayer1.mp3',
            'assets/music/prayer2.mp3'
        ];
        
        this.currentDate = new Date();
        this.dayOfYear = this.getDayOfYear(this.currentDate);
        this.hasPlayedToday = false;
        this.popupHistory = [];
        this.audioPlayer = null;
        
        this.init();
    }
    
    getDayOfYear(date) {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date - start;
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    }
    
    init() {
        // Create popup HTML structure
        this.createPopup();
        
        // Load previous days from localStorage
        this.loadHistory();
        
        // Show popup if not seen today
        if (!this.hasSeenToday()) {
            setTimeout(() => this.show(), 1000);
        } else {
            // Show ticker instead
            this.showTicker();
        }
        
        // Initialize audio
        this.initAudio();
        
        // Update digital clock
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
    }
    
    createPopup() {
        // Create popup container
        const popupHTML = `
        <div class="vista-popup-overlay" id="fireWordOverlay">
            <div class="vista-popup" id="fireWordPopup">
                <div class="popup-header">
                    <div class="digital-clock" id="popupClock"></div>
                    <button class="vista-btn close-btn" id="closePopup">&times;</button>
                </div>
                
                <div class="popup-content">
                    <div class="fire-header">
                        <h2><i class="fas fa-fire"></i> 🔥FIRE WORD DAILY</h2>
                        <p class="popup-date" id="popupDate"></p>
                    </div>
                    
                    <div class="scripture-section">
                        <div class="scripture-header">
                            <h3 id="scriptureReference">Psalm 100:4</h3>
                            <span class="badge gratitude">GRATITUDE 2026</span>
                        </div>
                        <div class="scripture-text" id="scriptureText">
                            "Enter into his gates with thanksgiving, and into his courts with praise..."
                        </div>
                    </div>
                    
                    <div class="prayer-section">
                        <h4><i class="fas fa-pray"></i> PROPHETIC PRAYER</h4>
                        <div class="prayer-text" id="prayerText">
                            Father, I enter Your presence with a heart full of thanksgiving...
                        </div>
                    </div>
                    
                    <div class="history-nav">
                        <button class="vista-btn" id="prevDay"><i class="fas fa-chevron-left"></i> Previous</button>
                        <span id="historyInfo">Today's Word</span>
                        <button class="vista-btn" id="nextDay">Next <i class="fas fa-chevron-right"></i></button>
                    </div>
                    
                    <div class="popup-actions">
                        <button class="vista-btn fire" id="playMusic">
                            <i class="fas fa-play"></i> Play Prayer Music
                        </button>
                        <button class="vista-btn" id="shareWord">
                            <i class="fas fa-share"></i> Share
                        </button>
                        <button class="vista-btn" id="closeContinue">
                            Close & Continue
                        </button>
                    </div>
                </div>
                
                <div class="music-controls" id="musicControls" style="display: none;">
                    <div class="music-info">
                        <i class="fas fa-music"></i>
                        <span id="nowPlaying">Prayer Atmosphere</span>
                    </div>
                    <div class="music-progress">
                        <div class="progress-bar">
                            <div class="progress" id="musicProgress"></div>
                        </div>
                        <span id="musicTime">0:00 / 1:00</span>
                    </div>
                    <button class="vista-btn" id="stopMusic">
                        <i class="fas fa-stop"></i> Stop
                    </button>
                </div>
            </div>
        </div>
        
        <div class="fireword-ticker" id="fireWordTicker">
            <div class="ticker-content">
                <span class="ticker-label"><i class="fas fa-fire"></i> Today's FIRE WORD:</span>
                <span id="tickerVerse">Psalm 100:4 - Enter into his gates with thanksgiving...</span>
                <span class="ticker-prayer">• Prophetic Prayer: Open the gates of glory for me today •</span>
            </div>
        </div>`;
        
        document.body.insertAdjacentHTML('beforeend', popupHTML);
        
        // Add event listeners
        this.bindEvents();
    }
    
    bindEvents() {
        // Close buttons
        document.getElementById('closePopup').addEventListener('click', () => this.hide());
        document.getElementById('closeContinue').addEventListener('click', () => this.hide());
        
        // Overlay click to close
        document.getElementById('fireWordOverlay').addEventListener('click', (e) => {
            if (e.target.id === 'fireWordOverlay') this.hide();
        });
        
        // Music controls
        document.getElementById('playMusic').addEventListener('click', () => this.playMusic());
        document.getElementById('stopMusic').addEventListener('click', () => this.stopMusic());
        
        // History navigation
        document.getElementById('prevDay').addEventListener('click', () => this.showPreviousDay());
        document.getElementById('nextDay').addEventListener('click', () => this.showNextDay());
        
        // Share button
        document.getElementById('shareWord').addEventListener('click', () => this.shareWord());
        
        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.hide();
        });
    }
    
    getTodayScripture() {
        // Determine category based on day
        const categories = ['gratitude', 'warfare', 'deliverance'];
        const categoryIndex = this.dayOfYear % categories.length;
        const category = categories[categoryIndex];
        
        // Get random scripture from category
        const scriptures = this.scriptures[category];
        const scriptureIndex = this.dayOfYear % scriptures.length;
        
        return {
            ...scriptures[scriptureIndex],
            category: category,
            date: this.currentDate.toISOString().split('T')[0]
        };
    }
    
    show() {
        const scripture = this.getTodayScripture();
        
        // Update popup content
        document.getElementById('scriptureReference').textContent = scripture.reference;
        document.getElementById('scriptureText').textContent = `"${scripture.verse}"`;
        document.getElementById('prayerText').textContent = scripture.prayer;
        document.getElementById('popupDate').textContent = this.formatDate(this.currentDate);
        
        // Update ticker
        document.getElementById('tickerVerse').textContent = 
            `${scripture.reference} - ${scripture.verse.substring(0, 60)}...`;
        
        // Show popup
        document.getElementById('fireWordOverlay').style.display = 'flex';
        
        // Add to history
        this.addToHistory(scripture);
        
        // Mark as seen today
        this.markAsSeen();
        
        // Auto-play music if first time today
        if (!this.hasPlayedToday) {
            setTimeout(() => this.playMusic(), 500);
            this.hasPlayedToday = true;
        }
    }
    
    hide() {
        // Stop music
        this.stopMusic();
        
        // Hide popup
        document.getElementById('fireWordOverlay').style.display = 'none';
        
        // Show ticker
        this.showTicker();
    }
    
    showTicker() {
        document.getElementById('fireWordTicker').style.display = 'block';
    }
    
    playMusic() {
        // Create audio player if doesn't exist
        if (!this.audioPlayer) {
            this.audioPlayer = new Audio();
            this.audioPlayer.loop = false;
            this.audioPlayer.volume = 0.7;
            
            // Update progress bar
            this.audioPlayer.addEventListener('timeupdate', () => {
                const progress = (this.audioPlayer.currentTime / this.audioPlayer.duration) * 100;
                document.getElementById('musicProgress').style.width = `${progress}%`;
                
                const current = this.formatTime(this.audioPlayer.currentTime);
                const total = this.formatTime(this.audioPlayer.duration || 60);
                document.getElementById('musicTime').textContent = `${current} / ${total}`;
            });
            
            // Hide controls when finished
            this.audioPlayer.addEventListener('ended', () => {
                document.getElementById('musicControls').style.display = 'none';
                document.getElementById('playMusic').style.display = 'block';
            });
        }
        
        // Select random music file
        const randomIndex = Math.floor(Math.random() * this.musicFiles.length);
        this.audioPlayer.src = this.musicFiles[randomIndex];
        
        // Play
        this.audioPlayer.play().catch(e => {
            console.log('Audio play failed:', e);
            // Fallback to no music
            document.getElementById('musicControls').style.display = 'none';
        });
        
        // Show music controls
        document.getElementById('musicControls').style.display = 'flex';
        document.getElementById('playMusic').style.display = 'none';
    }
    
    stopMusic() {
        if (this.audioPlayer) {
            this.audioPlayer.pause();
            this.audioPlayer.currentTime = 0;
        }
        document.getElementById('musicControls').style.display = 'none';
        document.getElementById('playMusic').style.display = 'block';
    }
    
    showPreviousDay() {
        if (this.popupHistory.length > 1) {
            // Move back in history (skip current day)
            const prevScripture = this.popupHistory[this.popupHistory.length - 2];
            if (prevScripture) {
                this.displayHistoryScripture(prevScripture, -1);
            }
        }
    }
    
    showNextDay() {
        // Only allow going back to today
        this.displayTodayScripture();
    }
    
    displayHistoryScripture(scripture, offset) {
        document.getElementById('scriptureReference').textContent = scripture.reference;
        document.getElementById('scriptureText').textContent = `"${scripture.verse}"`;
        document.getElementById('prayerText').textContent = scripture.prayer;
        
        // Calculate date for display
        const historyDate = new Date(this.currentDate);
        historyDate.setDate(historyDate.getDate() + offset);
        document.getElementById('popupDate').textContent = `${this.formatDate(historyDate)} (Previous)`;
        
        // Update history info
        const daysAgo = Math.abs(offset);
        const dayText = daysAgo === 1 ? 'Yesterday' : `${daysAgo} days ago`;
        document.getElementById('historyInfo').textContent = `${dayText}'s Word`;
        
        // Disable/Enable navigation buttons
        document.getElementById('prevDay').disabled = this.popupHistory.length <= 2;
        document.getElementById('nextDay').disabled = offset === 0;
    }
    
    displayTodayScripture() {
        const scripture = this.getTodayScripture();
        document.getElementById('scriptureReference').textContent = scripture.reference;
        document.getElementById('scriptureText').textContent = `"${scripture.verse}"`;
        document.getElementById('prayerText').textContent = scripture.prayer;
        document.getElementById('popupDate').textContent = this.formatDate(this.currentDate);
        document.getElementById('historyInfo').textContent = "Today's Word";
        
        // Enable/Disable navigation buttons
        document.getElementById('prevDay').disabled = this.popupHistory.length <= 1;
        document.getElementById('nextDay').disabled = true;
    }
    
    addToHistory(scripture) {
        // Only add if not already in history for today
        const today = this.currentDate.toISOString().split('T')[0];
        const exists = this.popupHistory.some(item => item.date === today);
        
        if (!exists) {
            this.popupHistory.push(scripture);
            // Keep only last 4 days
            if (this.popupHistory.length > 4) {
                this.popupHistory.shift();
            }
            this.saveHistory();
        }
    }
    
    loadHistory() {
        const saved = localStorage.getItem('rfcc_fireword_history');
        if (saved) {
            this.popupHistory = JSON.parse(saved);
        }
    }
    
    saveHistory() {
        localStorage.setItem('rfcc_fireword_history', JSON.stringify(this.popupHistory));
    }
    
    hasSeenToday() {
        const lastSeen = localStorage.getItem('rfcc_fireword_lastseen');
        return lastSeen === this.currentDate.toISOString().split('T')[0];
    }
    
    markAsSeen() {
        localStorage.setItem('rfcc_fireword_lastseen', this.currentDate.toISOString().split('T')[0]);
    }
    
    shareWord() {
        const scripture = this.getTodayScripture();
        const shareText = `🔥 FIRE WORD for ${this.formatDate(this.currentDate)}:\n\n"${scripture.verse}"\n\n${scripture.reference}\n\nProphetic Prayer: ${scripture.prayer}\n\nFrom Rhema Fire Christian Church - The Fire Generation`;
        
        if (navigator.share) {
            navigator.share({
                title: `Daily Fire Word - ${scripture.reference}`,
                text: shareText,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(shareText).then(() => {
                alert('Fire Word copied to clipboard! Share with others.');
            });
        }
    }
    
    updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        const dateString = now.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Update popup clock
        document.getElementById('popupClock').textContent = timeString;
        document.getElementById('popupDate').textContent = dateString;
        
        // Update main website clock if exists
        const mainClock = document.getElementById('mainClock');
        if (mainClock) {
            mainClock.textContent = `${dateString} | ${timeString}`;
        }
    }
    
    formatDate(date) {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    initAudio() {
        // Preload audio context for better performance
        if ('AudioContext' in window || 'webkitAudioContext' in window) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioContext();
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.fireWordPopup = new FireWordPopup();
});
