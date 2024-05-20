const gamePageContainer = document.getElementById('game-page-container')
const gameScreen = document.getElementById("game-page")
const gameOverText = document.getElementById('');
const scoreElement = document.getElementById('score')
const bossTextElement = document.createElement("h1")


// SOUNDS

const gameAudio = document.createElement("audio")
gameAudio.src = "./Sounds/misora-game.mp3"
gameAudio.loop = true
gameAudio.volume = 0.2

const bossAudio = document.createElement("audio")
bossAudio.src = "./Sounds/boss-music.mp3"
bossAudio.loop = true
bossAudio.volume = 0.3

const loseAudio = document.createElement("audio")
loseAudio.src = "./Sounds/death-of-shinobi.mp3"
loseAudio.loop = true
loseAudio.volume = 0.2

const killEnemyAudio = document.createElement("audio")
killEnemyAudio.src = "./Sounds/enemy-death.mp3"

const victoryAudio = document.createElement("audio")
victoryAudio.src = "./Sounds/victory.mp3"
victoryAudio.loop = true
victoryAudio.volume = 0.2

const bossAppearsAudio = document.createElement("audio")
bossAppearsAudio.src = "./Sounds/boss-appears.mp3"
bossAppearsAudio.volume = 0.4


// Will Keep Track on Window Size

let resizeInterval

const screenResizePage = document.getElementById("mobile-page")
let windowSizeGamePage = window.innerWidth
window.addEventListener("resize", () => {
  windowSizeGamePage = window.innerWidth
})


let player
let enemy
let enemyArray =  ["Yurei", "Gotoku", "Onre"]
let enemies = []
let score = 0

let gameLoopInterval;



// Player Lives
let playerHeartsArr = [...document.querySelectorAll(".heart")]


document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    player.element.style.backgroundImage = 'url("./SpriteSheets/Samurai/Run.png")'
    player.element.style.rotate = 'y 180deg'
    player.movingLeft = true
  }
  else if (e.key === 'ArrowRight') {
    player.element.style.backgroundImage = 'url("./SpriteSheets/Samurai/Run.png")'
    player.element.style.rotate = 'y 0deg'
    player.movingRight = true
  }
  else if (e.key === 'ArrowUp'){
    player.element.style.backgroundImage = 'url("./SpriteSheets/Samurai/Jump.png")'
    player.jumpPlayer()
  } 
  else if (e.key === " " || e.key === "Spacebar") {
    player.element.style.backgroundImage = 'url("./SpriteSheets/Samurai/Attack_1.png")'
    player.animateAttack()
    if (!enemy.enemyIsDying) {
      killEnemy()
    }

  }
  
})
 

document.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    player.movingLeft = false
    player.movingRight = false
    player.element.style.backgroundImage = 'url("./SpriteSheets/Samurai/Idle.png")'
  }
})


function spawnBoss() {
  bossTextElement.classList.add("boss-text")
  bossTextElement.innerText = "BOSS FIGHT!"
  gameScreen.appendChild(bossTextElement)
  bossAppearsAudio.play()
}

// Kill enemies Mechanics
function killEnemy() {
  const playerRect = player.element.getBoundingClientRect();
  const enemyRect = enemy.element.getBoundingClientRect();
  const isFacingRight = player.element.style.rotate === 'y 0deg';
  const isFacingLeft = player.element.style.rotate === 'y 180deg';
  const halfPlayerWidth = playerRect.width / 2;

  const isHitRight = isFacingRight && playerRect.right - halfPlayerWidth > enemyRect.left && enemyRect.left > playerRect.left;
  const isHitLeft = isFacingLeft && playerRect.left + halfPlayerWidth < enemyRect.right && enemyRect.right < playerRect.right;

  if (isHitRight || isHitLeft) {
    handleEnemyHit();
  }
}

function handleEnemyHit() {
  enemy.element.style.backgroundImage = enemy.dyingUrl;
  enemy.enemyIsDying = true;

  if (enemy instanceof Boss) {
    handleBossHit();
  } else {
    handleRegularEnemyHit();
  }
}

function handleBossHit() {
  if (enemy.bossLives > 0) {
    killEnemyAudio.play();
    enemy.element.style.backgroundImage = enemy.hurtUrl;
    setTimeout(() => {
      enemy.enemyIsDying = false;
      enemy.element.style.backgroundImage = `url("./SpriteSheets/Kitsune/Run.png")`;
    }, 1000);
    enemy.bossLives--;
  } else {
    handleBossDefeat();
  }
}

function handleBossDefeat() {
  enemy.enemyIsDying = true;
  enemy.element.style.backgroundImage = enemy.dyingUrl;
  setTimeout(() => {
    gameScreen.removeChild(enemy.element);
    winGame();
  }, 1000);
}

function handleRegularEnemyHit() {
  killEnemyAudio.play();
  setTimeout(() => {
    gameScreen.removeChild(enemy.element);
    score++;
    scoreElement.innerText = score;

    if (enemies.length === 1) {
      spawnBossWithDelay();
    } else {
      replaceEnemy();
    }
  }, 1000);
}

function spawnBossWithDelay() {
  spawnBoss();
  setTimeout(() => {
    enemy = enemies.splice(0, 1)[0];
    gameScreen.removeChild(bossTextElement);
    gameScreen.appendChild(enemy.element);
  }, 2000);
}

function replaceEnemy() {
  enemy = enemies.splice(0, 1)[0];
  gameScreen.appendChild(enemy.element);
}

//End of Kill Enemy mechanics

function pickRandomEnemy(enemyArr) {
  let randomEnemyIndex = Math.floor(Math.random() * enemyArr.length)
  let randomEnemy = enemyArr[randomEnemyIndex]

  switch(randomEnemy) {
    case "Yurei":
      return new Yurei(gameScreen)
    case "Gotoku":
      return new Gotoku(gameScreen)
    case "Onre":
      return new Onre(gameScreen)
  }
}


function startGame() {
  // Resets All the Sounds
  bossAudio.pause()
  bossAudio.currentTime = 0
  gameAudio.currentTime = 0
  loseAudio.pause()
  loseAudio.currentTime = 0
  victoryAudio.pause()
  victoryAudio.currentTime = 0
  

  // Resets the enemies
  enemies = []
  
  // Creates 10 random enemies
  for (let i = 0; i < 10; i++) {
    enemies.push(pickRandomEnemy(enemyArray))
  }
  enemies.push(new Boss(gameScreen))


  // Appends Player and Enemy to Screen
  player = new Player(gameScreen)
  enemy = enemies.splice(0, 1)[0]
  gameScreen.appendChild(enemy.element)

  score = 0
  scoreElement.innerText = score
  playerHeartsArr.forEach(heart => {
    heart.className = "fa-solid fa-heart heart"
  })

  
  gameLoopInterval = setInterval(() => {

    // Checks if the screen size goes below 800px
    screenSizeCheckGame(gameAudio)

    if (enemy instanceof Boss) {
      gameAudio.pause()
      bossAudio.play()
    }

    if(player.movingLeft) {
      if(player.jumping || player.falling) {
        player.playerMove(-20)
      }
      else {
        player.playerMove(-10);
      }
    } else if(player.movingRight) {
      if(player.jumping || player.falling) {
        player.playerMove(20)
      }
      else {
        player.playerMove(10);
      }
    } else if(!player.attacking) {
      player.animatePlayer('attack');
    }
    if (player.didCollide(enemy)) {
      if (player.playerLives > 0) {
        player.pushback(enemy)
        playerHeartsArr[player.playerLives - 1].classList.remove("fa-heart")
        playerHeartsArr[player.playerLives - 1].classList.add("fa-heart-crack")
      }
    }
    
    gameOver();
    enemy.enemyMove()

  }, 50)

  
  setTimeout(() => {
    
  }, 3000)
}

//Update Interval for moving like a game loop
function gameOver() {
    
  if(player.playerLives == 0) {
    // loseAudio.play()
    gameAudio.pause()
    bossAudio.pause()

    screenSizeCheckWinLose(loseAudio)
    
    clearInterval(gameLoopInterval);
    
    let gameOverScreen = document.createElement('div')
    gameOverScreen.innerHTML = `
      <div id="game-over">
        <h1 id="">GAME OVER</h1>
        <h2 id="score">Score: ${score}</h2>
        <button class="reset-btn">TRY AGAIN</button>
      </div>
      `
    // gameScreen.style.display = 'none'
    gameScreen.appendChild(gameOverScreen)
    
    const resetBtn = document.querySelector('.reset-btn');
    resetBtn.addEventListener('click', () => {
      clearInterval(resizeInterval)
      gameScreen.contains(enemy.element) && gameScreen.removeChild(enemy.element) 
      startGame();
      player.playerLives = 3
      gameScreen.removeChild(gameOverScreen)
      gameScreen.style.display = 'block'
    }) 
  }

}

function winGame() {
  if(player.playerLives > 0 ){
    clearInterval(gameLoopInterval);
    gameAudio.pause()
    bossAudio.pause()
    // victoryAudio.play()
    screenSizeCheckWinLose(victoryAudio)
    
    let winGameScreen = document.createElement("div")
    winGameScreen.innerHTML = `
      <div id="game-won">
        <h1 id="">YOU ARE A TRUE SAMURAI</h1>
        <h2 id="score">Score: ${score}</h2>
        <button class="reset-btn">PLAY AGAIN</button>
      </div>
      `
    
    gameScreen.appendChild(winGameScreen)
    
    const resetBtn = document.querySelector('.reset-btn'); 
    resetBtn.addEventListener('click', () => {
      clearInterval(resizeInterval)
      startGame();
      player.playerLives = 3
      gameScreen.removeChild(winGameScreen)
      gameScreen.style.display = 'block'
    })
  }
}


// Checks for screen size change when the game is running
function screenSizeCheckGame(audio) {
  if (windowSizeGamePage < 800) {
    audio.pause()
    gamePageContainer.style.display = 'none'
    screenResizePage.style.display = 'flex'
  }
  else {
    gamePageContainer.style.display = 'flex'
    screenResizePage.style.display = 'none'
    audio.play()
  }
}


// Checks for screen size change when the game won or lost
function screenSizeCheckWinLose(audio) {
  resizeInterval = setInterval(() => {
    if (windowSizeGamePage < 800) {
      audio.pause()
      gamePageContainer.style.display = 'none'
      screenResizePage.style.display = 'flex'
    }
    else {
      gamePageContainer.style.display = 'flex'
      screenResizePage.style.display = 'none'
      audio.play()
    }
  },50)
}

function pauseBackgroundAudio() {
  gameAudio.pause()
  loseAudio.pause()
  bossAudio.pause()
  loseAudio.pause()
}






