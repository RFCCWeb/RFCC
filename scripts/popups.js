document.addEventListener("DOMContentLoaded", () => {
  const today = new Date().toDateString();
  if (localStorage.getItem("fireword") === today) return;

  fetch("config/scriptures.json")
    .then(r => r.json())
    .then(data => {
      const f = data[Math.floor(Math.random()*data.length)];

      const p = document.createElement("div");
      p.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;z-index:9999;";
      p.innerHTML = `
        <div style="background:#fff;padding:1.5rem;border-radius:10px;max-width:400px">
          <h3>🔥 Daily Fireword</h3>
          <p>${new Date().toLocaleString()}</p>
          <p>${f.verse}</p>
          <p><em>${f.prayer}</em></p>
          <button id="enter">Enter Site</button>
        </div>`;
      document.body.appendChild(p);

      document.getElementById("enter").onclick = () => {
        localStorage.setItem("fireword", today);
        p.remove();
      };
    });
});
