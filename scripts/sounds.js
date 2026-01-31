document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => {
    const clickSound = new Audio("assets/sounds/click.mp3");
    clickSound.play();
  });
});
