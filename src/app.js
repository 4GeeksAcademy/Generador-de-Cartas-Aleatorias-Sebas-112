window.onload = () => {
  generateCard();

  document.querySelector("#new-card").addEventListener("click", () => {
    generateCard();
  });

  // setInterval(generateCard, 10000); // opcional: nueva cada 10s
};

function generateCard() {
  const suits = ["♦", "♥", "♠", "♣"];
  const numbers = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

  const randomSuit = suits[Math.floor(Math.random() * suits.length)];
  const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];

  const card = document.querySelector("#card");
  const topSuit = card.querySelector(".top-suit");
  const bottomSuit = card.querySelector(".bottom-suit");
  const number = card.querySelector(".number");

  topSuit.innerText = randomSuit;
  bottomSuit.innerText = randomSuit;
  number.innerText = randomNumber;

  card.classList.remove("spade", "heart", "club", "diamond");

  switch (randomSuit) {
    case "♦":
      card.classList.add("diamond");
      break;
    case "♥":
      card.classList.add("heart");
      break;
    case "♠":
      card.classList.add("spade");
      break;
    case "♣":
      card.classList.add("club");
      break;
  }
}
