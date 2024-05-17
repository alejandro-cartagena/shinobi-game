const startBtn = document.getElementById("btn-start");
const welcomePage = document.getElementById("welcome");
const startPage = document.getElementById("main");
const preGameScreen = document.getElementById("pregame-page");
const gamePage = document.getElementById("game-page-container");

const instructionsBtn = document.getElementById("btn-instructions")

// Audio
const preGameAudio = document.createElement("audio")
preGameAudio.src = "./Sounds/sakuya-pre-game.mp3"
preGameAudio.volume = 0.2

startBtn.addEventListener("click", () => {
  startPage.style.display = "none";

  // setTimeout(() => {
  //   preGameScreen.style.display = "none";
  //   gamePage.style.display = "flex";
  // }, 10000);

  preGameScreen.style.display = "flex";
  preGameAudio.play()
  
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
        preGameAudio.pause()
        startGame()
      }, 4000)
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
    preGameAudio.pause()
    startGame()
  })
  instructionsBtn.addEventListener("click", () => {
    document.getElementById("instructions").style.display = 'block'
  })
  document.getElementById("instructions-close").addEventListener("click", () => {
    document.getElementById("instructions").style.display = 'none'
  })
});



