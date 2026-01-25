// ===== VISTA MEDIA PLAYER =====
class VistaMediaPlayer {
    constructor() {
        this.audio = null;
        this.video = null;
        this.isPlaying = false;
        this.currentTrack = 0;
        this.playlist = [];
        
        this.initPlayer();
    }
    
    initPlayer() {
        this.createPlayerUI();
        this.bindEvents();
        this.loadPlaylist();
    }
    
    createPlayerUI() {
        const playerHTML = `
        <div class="vista-media-player" id="mediaPlayer">
            <div class="player-header">
                <h4><i class="fas fa-music"></i> RFCC Media Player</h4>
                <button class="player-close">&times;</button>
            </div>
            <div class="player-body">
                <div class="now-playing">
                    <div class="track-info">
                        <h5 id="trackTitle">Select a track to play</h5>
                        <p id="trackArtist">Rhema Fire Christian Church</p>
                    </div>
                    <div class="album-art">
                        <i class="fas fa-compact-disc"></i>
                    </div>
                </div>
                <div class="player-controls">
                    <button class="control-btn" id="prevBtn">
                        <i class="fas fa-step-backward"></i>
                    </button>
                    <button class="control-btn play-btn" id="playBtn">
                        <i class="fas fa-play"></i>
                    </button>
                    <button class="control-btn" id="nextBtn">
                        <i class="fas fa-step-forward"></i>
                    </button>
                </div>
                <div class="player-progress">
                    <div class="progress-bar">
                        <div class="progress" id="progressBar"></div>
                    </div>
                    <div class="time-display">
                        <span id="currentTime">0:00</span>
                        <span id="totalTime">0:00</span>
                    </div>
                </div>
                <div class="player-volume">
                    <i class="fas fa-volume-down"></i>
                    <input type="range" min="0" max="100" value="70" id="volumeSlider">
                    <i class="fas fa-volume-up"></i>
                </div>
            </div>
            <div class="player-playlist">
                <h5>Playlist</h5>
                <ul id="playlistItems"></ul>
            </div>
        </div>`;
        
        document.body.insertAdjacentHTML('beforeend', playerHTML);
    }
    
    bindEvents() {
        document.getElementById('playBtn').addEventListener('click', () => this.togglePlay());
        document.getElementById('prevBtn').addEventListener('click', () => this.prevTrack());
        document.getElementById('nextBtn').addEventListener('click', () => this.nextTrack());
        document.getElementById('volumeSlider').addEventListener('input', (e) => this.setVolume(e.target.value));
        document.querySelector('.player-close').addEventListener('click', () => this.hidePlayer());
        
        // Play buttons on page
        document.querySelectorAll('.play-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const audioSrc = e.target.closest('[data-audio]')?.dataset.audio;
                const videoSrc = e.target.closest('[data-video]')?.dataset.video;
                
                if (audioSrc) this.playAudio(audioSrc);
                if (videoSrc) this.playVideo(videoSrc);
            });
        });
    }
    
    loadPlaylist() {
        this.playlist = [
            { title: 'The Power of a Thankful Heart', artist: 'RFCC', src: 'assets/music/thankful-heart.mp3', duration: '45:00' },
            { title: 'Abiding in the True Vine', artist: 'RFCC', src: 'assets/music/true-vine.mp3', duration: '55:00' },
            { title: 'Fire Generation Worship', artist: 'RFCC', src: 'assets/music/worship-album.mp3', duration: '60:00' }
        ];
        
        this.updatePlaylistUI();
    }
    
    updatePlaylistUI() {
        const playlist = document.getElementById('playlistItems');
        playlist.innerHTML = '';
        
        this.playlist.forEach((track, index) => {
            const li = document.createElement('li');
            li.className = 'playlist-item';
            li.innerHTML = `
                <span class="track-number">${index + 1}</span>
                <span class="track-title">${track.title}</span>
                <span class="track-duration">${track.duration}</span>
            `;
            li.addEventListener('click', () => this.playTrack(index));
            playlist.appendChild(li);
        });
    }
    
    playTrack(index) {
        this.currentTrack = index;
        const track = this.playlist[index];
        
        if (this.audio) {
            this.audio.pause();
            this.audio = null;
        }
        
        this.audio = new Audio(track.src);
        this.audio.volume = document.getElementById('volumeSlider').value / 100;
        
        this.audio.addEventListener('loadedmetadata', () => {
            document.getElementById('totalTime').textContent = this.formatTime(this.audio.duration);
        });
        
        this.audio.addEventListener('timeupdate', () => {
            const progress = (this.audio.currentTime / this.audio.duration) * 100;
            document.getElementById('progressBar').style.width = `${progress}%`;
            document.getElementById('currentTime').textContent = this.formatTime(this.audio.currentTime);
        });
        
        this.audio.addEventListener('ended', () => this.nextTrack());
        
        this.play();
        this.updateNowPlaying(track);
    }
    
    play() {
        if (this.audio) {
            this.audio.play();
            this.isPlaying = true;
            document.getElementById('playBtn').innerHTML = '<i class="fas fa-pause"></i>';
        }
    }
    
    pause() {
        if (this.audio) {
            this.audio.pause();
            this.isPlaying = false;
            document.getElementById('playBtn').innerHTML = '<i class="fas fa-play"></i>';
        }
    }
    
    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
    
    prevTrack() {
        this.currentTrack = (this.currentTrack - 1 + this.playlist.length) % this.playlist.length;
        this.playTrack(this.currentTrack);
    }
    
    nextTrack() {
        this.currentTrack = (this.currentTrack + 1) % this.playlist.length;
        this.playTrack(this.currentTrack);
    }
    
    setVolume(volume) {
        if (this.audio) {
            this.audio.volume = volume / 100;
        }
    }
    
    updateNowPlaying(track) {
        document.getElementById('trackTitle').textContent = track.title;
        document.getElementById('trackArtist').textContent = track.artist;
    }
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    hidePlayer() {
        document.getElementById('mediaPlayer').style.display = 'none';
    }
    
    showPlayer() {
        document.getElementById('mediaPlayer').style.display = 'block';
    }
}

// Initialize Media Player
document.addEventListener('DOMContentLoaded', () => {
    window.mediaPlayer = new VistaMediaPlayer();
});
