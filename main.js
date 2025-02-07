const guessBtn = document.querySelector("#guess-btn");
const retryBtn = document.querySelector(".box__actions--retry--button");
const input = document.querySelector("#user-guess");
const numberDisplay = document.querySelector(".box--items-number");
const guessLimitText = document.querySelector(".box__limit--text");
const noteText = document.querySelector(".box__note--text");

let numberToGuess = Math.floor(Math.random() * 100) + 1;
let attemptsLeft = 7;
console.log(numberToGuess);

const updateNote = (message) => noteText.textContent = message;
const updateAttempts = () => guessLimitText.textContent = `Qolgan urinishlar: ${attemptsLeft}`;

guessBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const userGuess = +input.value;
  if (userGuess < 1 || userGuess > 100) return updateNote("Iltimos, 1 dan 100 gacha bo'lgan raqam kiriting!");
  
  attemptsLeft--;
  if (userGuess === numberToGuess) {
    numberDisplay.textContent = numberToGuess;
    updateNote("Siz to'g'ri raqamni topdingiz!");
    const sound = new Audio("./public/audios/goodresult-82807 (1).mp3")
    sound.play()
    guessBtn.disabled = true;
  } else {
    updateNote(userGuess < numberToGuess ? "Siz kichik raqam kiritdingiz!" : "Siz katta raqam kiritdingiz!");
  }
  
  if (attemptsLeft == 0) {
    numberDisplay.textContent = numberToGuess;
    updateNote(`O'yin tugadi! To'g'ri raqam: ${numberToGuess}`);
    const gameOver = new Audio("./public/audios/game-over-39-199830.mp3")
    gameOver.play()
    guessBtn.disabled = true;
    attemptsLeft.textContent = 0
  } else {
    updateAttempts();
  }

  input.value = "";
});

retryBtn.addEventListener("click", () => {
  numberToGuess = Math.floor(Math.random() * 100) + 1;
  attemptsLeft = 7;
  numberDisplay.textContent = "?";
  updateAttempts();
  updateNote("Start guessing...");
  guessBtn.disabled = false;
  input.value = "";
});
