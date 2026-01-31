document.addEventListener("DOMContentLoaded", () => {
  // Hero carousel remains
  const slides = document.querySelectorAll(".hero-slide");
  let index = 0;
  if (slides.length > 0) {
    slides.forEach((s, i) => s.style.display = i===0?"block":"none");
    setInterval(() => {
      slides[index].style.display = "none";
      index = (index + 1) % slides.length;
      slides[index].style.display = "block";
    }, 5000);
  }

  // Scroll reveal
  const blocks = document.querySelectorAll(".block");
  const reveal = () => {
    blocks.forEach(b => {
      const rect = b.getBoundingClientRect();
      if(rect.top < window.innerHeight*0.9) b.classList.add("fade-in");
    });
  };
  window.addEventListener("scroll", reveal);
  reveal();

  // === AUTOPOPULATE EVENTS ===
  fetch("config/events.json")
    .then(res => res.json())
    .then(events => {
      const section = document.querySelector("#events-section");
      events.slice(0,3).forEach(ev => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `<h4>${ev.title} (${ev.date})</h4><p>${ev.description}</p>`;
        section.appendChild(div);
      });
    });

  // === AUTOPOPULATE PROJECTS ===
  fetch("config/projects.json")
    .then(res => res.json())
    .then(projects => {
      const section = document.querySelector("#projects-section");
      projects.slice(0,3).forEach(p => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `<h4>${p.title} (${p.date})</h4><p>${p.summary}</p>`;
        section.appendChild(div);
      });
    });

  // === AUTOPOPULATE MEDIA ===
  fetch("config/media.json")
    .then(res => res.json())
    .then(media => {
      const section = document.querySelector("#media-section");
      media.slice(0,3).forEach(m => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `<h4>${m.title}</h4>
        <a href="${m.link}"><img src="${m.thumbnail}" alt="${m.title}"></a>`;
        section.appendChild(div);
      });
    });

  // === AUTOPOPULATE FIRE NEWS ===
  fetch("config/fire-news.json")
    .then(res => res.json())
    .then(news => {
      const section = document.querySelector("#fire-news-section");
      news.slice(0,3).forEach(n => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `<h4><a href="${n.link}" target="_blank">${n.title}</a></h4><p>${n.summary}</p>`;
        section.appendChild(div);
      });
    });
});
