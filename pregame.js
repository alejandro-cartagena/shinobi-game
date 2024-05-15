const startBtn = document.getElementById("btn-start");
const welcomePage = document.getElementById("welcome");
const startPage = document.getElementById("main");
const preGameScreen = document.getElementById("pregame-page");
const gamePage = document.getElementById("game-page-container");

startBtn.addEventListener("click", () => {
  startPage.style.display = "none";

  // setTimeout(() => {
  //   preGameScreen.style.display = "none";
  //   gamePage.style.display = "flex";
  // }, 10000);

  preGameScreen.style.display = "flex";
  
  const letterByLetter = document.getElementById("lore-text");
  let loretext = letterByLetter.innerText;
  letterByLetter.innerHTML = ""
  let i = 0
  let letterInterval = setInterval(() => {
    if(i === loretext.length) {
      clearInterval(letterInterval);
      setTimeout(() => {
        preGameScreen.style.display = "none";
        gamePage.style.display = "flex";
        startGame()
      }, 2000)
    } else {
      letterByLetter.innerHTML += loretext[i]
      i++;
    }
  }, 50)
  document.getElementById("btn-skip").addEventListener("click", () => {
    clearInterval(letterInterval)
    letterByLetter.innerText = loretext
    preGameScreen.style.display = "none";
    gamePage.style.display = "flex";
    startGame()
  })
});



