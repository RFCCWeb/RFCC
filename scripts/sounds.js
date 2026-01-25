// ===== VISTA SOUND EFFECTS SYSTEM =====
// Professional sound effects for Vista glass interface

class VistaSounds {
    constructor() {
        this.sounds = {};
        this.enabled = true;
        this.volume = 0.3;
        
        // Check if user has audio enabled
        this.checkAudioPermission();
        this.loadSounds();
    }
    
    checkAudioPermission() {
        // Check if audio is generally allowed
        if (typeof Audio === 'undefined') {
            this.enabled = false;
            console.log('Audio not supported in this browser');
            return;
        }
        
        // Check user preference from localStorage
        const soundPref = localStorage.getItem('rfcc_sound_enabled');
        if (soundPref === 'false') {
            this.enabled = false;
        }
        
        // Check if this is a mobile device (might have stricter autoplay policies)
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    loadSounds() {
        // Base64 encoded sound effects (short, efficient)
        // These are placeholder sounds - in production, use actual MP3 files
        
        // Hover sound - gentle chime
        this.sounds.hover = this.createSound(`
            // Simple sine wave chime
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        `);
        
        // Click sound - soft tap
        this.sounds.click = this.createSound(`
            // Click sound using noise
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const bufferSize = audioContext.sampleRate * 0.01;
            const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
            const output = buffer.getChannelData(0);
            
            for (let i = 0; i < bufferSize; i++) {
                output[i] = Math.random() * 2 - 1;
            }
            
            const source = audioContext.createBufferSource();
            const gainNode = audioContext.createGain();
            
            source.buffer = buffer;
            source.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
            
            source.start();
        `);
        
        // Page transition sound - subtle whoosh
        this.sounds.page = this.createSound(`
            // Whoosh effect
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.type = 'sine';
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.5);
            
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        `);
        
        // Popup open sound - angelic tone
        this.sounds.open = this.createSound(`
            // Angelic chime
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator1 = audioContext.createOscillator();
            const oscillator2 = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator1.type = 'sine';
            oscillator2.type = 'sine';
            
            oscillator1.connect(gainNode);
            oscillator2.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator1.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
            oscillator2.frequency.setValueAtTime(659.25, audioContext.currentTime); // E5
            
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
            
            oscillator1.start();
            oscillator2.start();
            oscillator1.stop(audioContext.currentTime + 1);
            oscillator2.stop(audioContext.currentTime + 1);
        `);
        
        // Close sound - gentle close
        this.sounds.close = this.createSound(`
            // Gentle close sound
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.type = 'triangle';
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.3);
            
            gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.3);
        `);
        
        // Success sound - positive feedback
        this.sounds.success = this.createSound(`
            // Success chime
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.type = 'sine';
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Play a little melody: C - E - G
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
            oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
            
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime + 0.1);
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime + 0.2);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.5);
        `);
    }
    
    createSound(code) {
        // Return a function that plays the sound
        return () => {
            if (!this.enabled) return;
            
            try {
                // For now, we'll use simple Audio objects
                // In production, replace with actual MP3 files
                
                // Fallback: Create a simple beep if Web Audio API fails
                this.playFallbackSound();
                
            } catch (error) {
                console.log('Sound play error:', error);
                // Silent fail - don't break the website if sounds don't work
            }
        };
    }
    
    playFallbackSound() {
        // Simple fallback using HTML5 Audio
        const audio = new Audio();
        audio.volume = this.volume;
        
        // Create a simple beep (data URL for a short beep sound)
        const beepData = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==';
        audio.src = beepData;
        
        audio.play().catch(e => {
            // Sound play failed (user may have blocked audio)
            console.log('Fallback sound play failed');
        });
    }
    
    play(soundName) {
        if (this.sounds[soundName] && this.enabled) {
            this.sounds[soundName]();
        }
    }
    
    toggle(enabled) {
        this.enabled = enabled;
        localStorage.setItem('rfcc_sound_enabled', enabled);
    }
    
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
    }
    
    // Convenience methods
    playHover() { this.play('hover'); }
    playClick() { this.play('click'); }
    playPage() { this.play('page'); }
    playOpen() { this.play('open'); }
    playClose() { this.play('close'); }
    playSuccess() { this.play('success'); }
}

// Initialize and attach to window
document.addEventListener('DOMContentLoaded', () => {
    window.vistaSounds = new VistaSounds();
    
    // Add sound controls to the page
    createSoundControls();
});

function createSoundControls() {
    // Create sound toggle button in footer
    const soundToggle = document.createElement('div');
    soundToggle.className = 'sound-toggle';
    soundToggle.innerHTML = `
        <button class="vista-btn small" id="soundToggleBtn">
            <i class="fas fa-volume-up"></i> Sounds
        </button>
    `;
    
    // Add to footer if exists
    const footer = document.querySelector('.vista-footer .footer-bottom');
    if (footer) {
        footer.appendChild(soundToggle);
        
        // Add event listener
        document.getElementById('soundToggleBtn').addEventListener('click', () => {
            if (window.vistaSounds) {
                window.vistaSounds.toggle(!window.vistaSounds.enabled);
                
                const btn = document.getElementById('soundToggleBtn');
                if (window.vistaSounds.enabled) {
                    btn.innerHTML = '<i class="fas fa-volume-up"></i> Sounds On';
                    btn.classList.add('fire');
                    window.vistaSounds.playSuccess();
                } else {
                    btn.innerHTML = '<i class="fas fa-volume-mute"></i> Sounds Off';
                    btn.classList.remove('fire');
                }
            }
        });
    }
}

// Auto-attach sounds to Vista elements
function attachVistaSounds() {
    // Hover sounds for Vista buttons
    document.querySelectorAll('.vista-btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            if (window.vistaSounds) window.vistaSounds.playHover();
        });
        
        btn.addEventListener('click', () => {
            if (window.vistaSounds) window.vistaSounds.playClick();
        });
    });
    
    // Hover sounds for navigation items
    document.querySelectorAll('.vista-nav-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (window.vistaSounds) window.vistaSounds.playHover();
        });
    });
    
    // Hover sounds for glass panels
    document.querySelectorAll('.glass-panel.sound-hover').forEach(panel => {
        panel.addEventListener('mouseenter', () => {
            if (window.vistaSounds) window.vistaSounds.playHover();
        });
    });
    
    // Page transition sounds for internal links
    document.querySelectorAll('a[href^="#"], a:not([href^="http"])').forEach(link => {
        if (link.getAttribute('href') !== '#') {
            link.addEventListener('click', () => {
                if (window.vistaSounds) window.vistaSounds.playPage();
            });
        }
    });
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', attachVistaSounds);
