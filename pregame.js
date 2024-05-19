const startBtn = document.getElementById("btn-start");
const welcomePage = document.getElementById("welcome");
const startPage = document.getElementById("main");
const preGameScreen = document.getElementById("pregame-page");
const gamePage = document.getElementById("game-page-container");
const mobilePage = document.getElementById("mobile-page")

const instructionsBtn = document.getElementById("btn-instructions")

// Size of the window (screen)
let windowSize = window.innerWidth
window.addEventListener("resize", () => {
  windowSize = window.innerWidth
})

// Audio
const preGameAudio = document.createElement("audio")
preGameAudio.src = "./Sounds/sakuya-pre-game.mp3"
preGameAudio.volume = 0.2

startBtn.addEventListener("click", () => {
  startPage.style.display = "none";
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
    preGameAudio.pause()
    if (windowSize >= 800) {
      gamePage.style.display = "flex";
      startGame()
    }
    else {
      mobilePage.style.display = "flex"
    }
    
  })

  instructionsBtn.addEventListener("click", () => {
    document.getElementById("instructions").style.display = 'block'
  })

  document.getElementById("instructions-close").addEventListener("click", () => {
    document.getElementById("instructions").style.display = 'none'
  })

  
});



