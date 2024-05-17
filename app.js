const gamePageContainer = document.getElementById('game-page-container')
const gameScreen = document.getElementById("game-page")
const gameOverText = document.getElementById('');
const scoreElement = document.getElementById('score')

const bossTextElement = document.createElement("h1")

// Sounds

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


function killEnemy() {
  const playerRect = player.element.getBoundingClientRect();
  const enemyRect = enemy.element.getBoundingClientRect();
  
  if (player.element.style.rotate === 'y 0deg') {
    if ((playerRect.right - playerRect.width / 2 > enemyRect.left) && (enemyRect.left > playerRect.left)) {
      enemy.element.style.backgroundImage = enemy.dyingUrl
      enemy.enemyIsDying = true
      // Checks if the enemy is the Boss
      if(enemy instanceof Boss) {
        // This is the Hurt condition for the Boss
        if (enemy.bossLives > 0) {
          enemy.element.style.backgroundImage = enemy.hurtUrl
          setTimeout(() => {
            enemy.enemyIsDying = false
            enemy.element.style.backgroundImage = `url("./SpriteSheets/Kitsune/Run.png")`
          }, 1000)
          enemy.bossLives--
        }
        else {
          // This is the die condition for the Boss
          // Also the WIN condition
          enemy.enemyIsDying = true
          enemy.element.style.backgroundImage = enemy.dyingUrl
          setTimeout(() => {
            gameScreen.removeChild(enemy.element)
            winGame()
          }, 1000)
        }
      }
      else {
        killEnemyAudio.play()
        setTimeout(() => {
          gameScreen.removeChild(enemy.element)
          score++
          scoreElement.innerText = score
      
          if (enemies.length === 1) {
            spawnBoss()
            setTimeout(() => {
              enemy = enemies.splice(0, 1)[0]
              gameScreen.removeChild(bossTextElement)
              gameScreen.appendChild(enemy.element)
            }, 2000)
            
          }
          else {
            enemy = enemies.splice(0, 1)[0]
            gameScreen.appendChild(enemy.element)
          }
          
        }, 1000)
      }
      
    }
  }
  else if (player.element.style.rotate === 'y 180deg') {
    if ((playerRect.left + playerRect.width / 2 < enemyRect.right) && (enemyRect.right < playerRect.right)) {
      enemy.element.style.backgroundImage = enemy.dyingUrl
      enemy.enemyIsDying = true
      // Checks if the enemy is the Boss
      if(enemy instanceof Boss) {
        // This is the Hurt condition for the Boss
        if (enemy.bossLives > 0) {
          enemy.element.style.backgroundImage = enemy.hurtUrl
          setTimeout(() => {
            enemy.enemyIsDying = false
            enemy.element.style.backgroundImage = `url("./SpriteSheets/Kitsune/Run.png")`
          }, 1000)
          enemy.bossLives--
        }
        else {
          // This is the die condition for the Boss
          // Also the WIN condition
          enemy.enemyIsDying = true
          enemy.element.style.backgroundImage = enemy.dyingUrl
          setTimeout(() => {
            gameScreen.removeChild(enemy.element)
            winGame()
          }, 1000)
        }
      }
      else {
        killEnemyAudio.play()
        setTimeout(() => {
          gameScreen.removeChild(enemy.element)
          score++
          scoreElement.innerText = score
          
          if (enemies.length === 1) {
            spawnBoss()
            setTimeout(() => {
              enemy = enemies.splice(0, 1)[0]
              gameScreen.removeChild(bossTextElement)
              gameScreen.appendChild(enemy.element)
            }, 2000)
          }
          else {
            enemy = enemies.splice(0, 1)[0]
            gameScreen.appendChild(enemy.element)
          }
          
        }, 1000)
      }
    }
  }
  
}

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
  gameAudio.play()

  // Resets the enemies
  enemies = []
  
  // Creates 10 random enemies
  for (let i = 0; i < 3; i++) {
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
    // Che
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
    loseAudio.play()
    gameAudio.pause()
    bossAudio.pause()

    clearInterval(gameLoopInterval);

    let gameOverScreen = document.createElement('div')
    gameOverScreen.innerHTML = `
    <div id="game-over">
      <h1 id="">GAME OVER</h1>
      <h2 id="score">Score: ${score}</h2>
      <button id="reset-btn">TRY AGAIN</button>
    </div>
  `
    // gameScreen.style.display = 'none'
    gameScreen.appendChild(gameOverScreen)

    const resetBtn = document.getElementById('reset-btn'); 
    
    resetBtn.addEventListener('click', () => {
      gameScreen.removeChild(enemy.element)
      startGame();
      player.playerLives = 3
      gameScreen.removeChild(gameOverScreen)
      gameScreen.style.display = 'block'
      
    })
  }
}

function winGame() {
  clearInterval(gameLoopInterval);
  gameAudio.pause()
  bossAudio.pause()
  victoryAudio.play()

  let winGameScreen = document.createElement("div")
  winGameScreen.innerHTML = `
    <div id="game-won">
      <h1 id="">YOU ARE A TRUE SAMURAI</h1>
      <h2 id="score">Score: ${score}</h2>
      <button id="reset-btn">PLAY AGAIN</button>
    </div>
  `

  gamePage.appendChild(winGameScreen)

    const resetBtn = document.getElementById('reset-btn'); 
    
    resetBtn.addEventListener('click', () => {
      startGame();
      player.playerLives = 3
      gamePage.removeChild(winGameScreen)
      gameScreen.style.display = 'block'
    })
}




