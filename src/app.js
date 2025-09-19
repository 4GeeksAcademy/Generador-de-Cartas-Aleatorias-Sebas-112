// Diccionarios para nombres de cartas (ES)
const RANK_NAMES = {
  A: "As",
  "2": "Dos", "3": "Tres", "4": "Cuatro", "5": "Cinco",
  "6": "Seis", "7": "Siete", "8": "Ocho", "9": "Nueve", "10": "Diez",
  J: "Jota", Q: "Reina", K: "Rey"
};
const SUIT_NAMES = { "♦": "Diamantes", "♥": "Corazones", "♠": "Picas", "♣": "Tréboles" };

let autoTimer = null;

window.onload = () => {
  // Tema
  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('theme-light', themeToggle.checked);
    document.body.classList.toggle('theme-dark', !themeToggle.checked);
  });

  // Generar
  generateCard();
  document.getElementById("new-card").addEventListener("click", generateCard);

  // Auto
  const autoBtn = document.getElementById('autoToggle');
  const speed = document.getElementById('speed');
  const speedVal = document.getElementById('speedVal');

  const updateSpeedLabel = () => {
    speedVal.textContent = (speed.value/1000).toFixed(1) + 's';
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = setInterval(generateCard, Number(speed.value));
    }
  };
  speed.addEventListener('input', updateSpeedLabel);
  updateSpeedLabel();

  autoBtn.addEventListener('click', () => {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
      autoBtn.textContent = 'Auto';
    } else {
      autoTimer = setInterval(generateCard, Number(speed.value));
      autoBtn.textContent = 'Detener';
    }
  });

  // Atajos
  window.addEventListener("keydown", (e)=>{
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      generateCard();
    }
  });

  // Tilt 3D
  const wrap = document.getElementById('cardWrap');
  const card = document.getElementById('card');
  const damp = 18;
  wrap.addEventListener('mousemove', (e)=>{
    const r = wrap.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rx = ((y - r.height/2) / r.height) * -damp;
    const ry = ((x - r.width/2) / r.width) * damp;
    card.style.transform = `rotateY(${ry}deg) rotateX(${rx}deg)`;
  });
  wrap.addEventListener('mouseleave', ()=>{ card.style.transform = ''; });
};

function generateCard() {
  const suits = ["♦", "♥", "♠", "♣"];
  const numbers = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];

  const suit = suits[Math.floor(Math.random() * suits.length)];
  const rank = numbers[Math.floor(Math.random() * numbers.length)];

  const card = document.querySelector("#card");
  const topSuit = card.querySelector(".top-suit");
  const bottomSuit = card.querySelector(".bottom-suit");
  const number = card.querySelector(".number");
  const label = document.getElementById('cardLabel');

  topSuit.textContent = suit;
  bottomSuit.textContent = suit;
  number.textContent = rank;

  // Reset colores por pinta
  card.classList.remove("spade","heart","club","diamond");
  switch (suit) {
    case "♦": card.classList.add("diamond"); break;
    case "♥": card.classList.add("heart");   break;
    case "♠": card.classList.add("spade");   break;
    case "♣": card.classList.add("club");    break;
  }

  // Nombre completo
  const rankName = RANK_NAMES[rank] || rank;
  const suitName = SUIT_NAMES[suit];
  label.textContent = `${rank}${suit} — ${rankName} de ${suitName}`;

  // Re-disparar animación flip
  card.classList.remove('playing');
  void card.offsetWidth; // reflow
  card.classList.add('playing');
}
