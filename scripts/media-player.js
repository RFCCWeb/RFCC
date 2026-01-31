let popupAudio;
function playPopupMusic() {
  const tracks = [
    "assets/music/gospel1.mp3",
    "assets/music/gospel2.mp3",
    "assets/music/gospel3.mp3"
  ];
  const track = tracks[Math.floor(Math.random()*tracks.length)];
  popupAudio = new Audio(track);
  popupAudio.volume = 0.5;
  popupAudio.play();
}

function stopPopupMusic() {
  if (popupAudio) {
    popupAudio.pause();
    popupAudio.currentTime = 0;
  }
}
