const startScreen = document.getElementById("startScreen");
const startBtn = document.getElementById("startBtn");
const yesButtons = document.querySelectorAll(".yesBtn");
const response = document.getElementById("response");
const returnBtn = document.getElementById("returnBtn");
const particles = document.getElementById("particles");

let audioCtx;

function initAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}

function beep(freq = 600, duration = 0.05) {
  initAudio();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.frequency.value = freq;
  osc.type = "square";
  gain.gain.value = 0.04;
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

function startGame() {
  beep(800);
  startScreen.style.display = "none";
}

function resetGame() {
  response.classList.add("hidden");
  returnBtn.classList.add("hidden");
  yesButtons.forEach(b => {
    b.style.display = "inline-block";
  });
  startScreen.style.display = "grid";
}

startBtn.addEventListener("click", startGame);
document.addEventListener("keydown", e => {
  if (e.key === "Enter" && startScreen.style.display !== "none") startGame();
});

function burst(x, y) {
  for (let i = 0; i < 14; i++) {
    const p = document.createElement("div");
    p.className = "p";
    p.textContent = "💖";
    p.style.left = x + "px";
    p.style.top = y + "px";
    p.style.setProperty("--dx", `${Math.random()*200-100}px`);
    p.style.setProperty("--dy", `${Math.random()*-200}px`);
    particles.appendChild(p);
    p.addEventListener("animationend", () => p.remove());
  }
}

yesButtons.forEach(btn => {
  btn.addEventListener("mouseenter", () => beep(900, 0.03));
  btn.addEventListener("click", e => {
    beep(1200, 0.08);
    response.textContent = "💘 QUEST COMPLETE: VALENTINE ACCEPTED 💘";
    response.classList.remove("hidden");
    yesButtons.forEach(b => b.style.display = "none");
    returnBtn.classList.remove("hidden");
    burst(e.clientX, e.clientY);
  });
});

returnBtn.addEventListener("click", resetGame);
