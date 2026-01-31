// FIREWORD Popup
document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("fireword-popup");
  const closeBtn = document.getElementById("close-popup");
  const today = new Date().toISOString().slice(0,10);

  if (localStorage.getItem("firewordShown") !== today) {
    popup.style.display = "flex";
    localStorage.setItem("firewordShown", today);
    playPopupMusic();
    fadeIn(popup);
  }

  // Close button
  closeBtn.addEventListener("click", () => {
    stopPopupMusic();
    fadeOut(popup);
  });

  // Load daily scripture (placeholder)
  fetch('config/scriptures.json')
    .then(res => res.json())
    .then(data => {
      const index = new Date().getDate() % data.length;
      document.getElementById("fireword-date").textContent = `Date: ${new Date().toLocaleDateString()}`;
      document.getElementById("fireword-verse").textContent = data[index].verse;
      document.getElementById("fireword-prayer").textContent = data[index].prayer;
    });

});

// Simple fade functions
function fadeIn(el) { el.style.opacity = 0; el.style.display="flex"; let op=0; const timer=setInterval(()=>{op+=0.05;if(op>=1){op=1;clearInterval(timer);}el.style.opacity=op;},15);}
function fadeOut(el){let op=1;const timer=setInterval(()=>{op-=0.05;if(op<=0){op=0;el.style.display="none";clearInterval(timer);}el.style.opacity=op;},15);}
