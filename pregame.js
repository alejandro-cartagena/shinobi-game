const startBtn = document.getElementById("btn-dmg");
const welcomePage = document.getElementById("welcome");
const startPage = document.getElementById("main");
const preGameScreen = document.getElementById("pregame-page");
const gamePage = document.getElementById("game-page");

startBtn.addEventListener("click", () => {
  startPage.style.display = "none";

  setTimeout(() => {
    preGameScreen.style.display = "none";
    gamePage.style.display = "flex";
  }, 5000);

  preGameScreen.style.display = "flex";
});
