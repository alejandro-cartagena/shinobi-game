const gamePageContainer = document.getElementById('game-page-container')
const gameScreen = document.getElementById("game-page")
const gameOverText = document.getElementById('');
const scoreElement = document.getElementById('score')

let player
let enemy
let score = 0


let gameLoopInterval;

// Player Lives
let playerHeartsArr = [...document.querySelectorAll(".heart")]

// let movingLeft = false
// let movingRight = false

// if (playerLives === 3) {
//   playerHeartsArr[2].classList.remove("fa-heart")
//   playerHeartsArr[2].classList.add("fa-heart-crack")
// }
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
    killEnemy()
  }
  
})
 

document.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    player.movingLeft = false
    player.movingRight = false
    player.element.style.backgroundImage = 'url("./SpriteSheets/Samurai/Idle.png")'
  }
})


function killEnemy() {
  const playerRect = player.element.getBoundingClientRect();
  const enemyRect = enemy.element.getBoundingClientRect();
  if (player.element.style.rotate === 'y 0deg') {
    if ((playerRect.right - playerRect.width / 2 > enemyRect.left) && (enemyRect.left > playerRect.left)) {
      enemy.element.style.backgroundImage = enemy.dyingUrl
      enemy.enemyIsDying = true
      setTimeout(() => {
        gameScreen.removeChild(enemy.element)
        score += 1
        scoreElement.innerText = score
        enemy = new Onre(gameScreen)
      }, 1000)
    }
  }
  else if (player.element.style.rotate === 'y 180deg') {
    if ((playerRect.left + playerRect.width / 2 < enemyRect.right) && (enemyRect.right < playerRect.right)) {
      enemy.element.style.backgroundImage = enemy.dyingUrl
      enemy.enemyIsDying = true
      setTimeout(() => {
        gameScreen.removeChild(enemy.element)
        score += 1
        scoreElement.innerText = score
        enemy = new Onre(gameScreen)
      }, 1000)
    }
  }

  
}


function startGame() {
  player = new Player(gameScreen)
  enemy = new Yurei(gameScreen)
  score = 0
  scoreElement.innerText = score
  playerHeartsArr.forEach(heart => {
    heart.className = "fa-solid fa-heart heart"
  })

  gameLoopInterval = setInterval(() => {
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
        player.pushback()
        playerHeartsArr[player.playerLives - 1].classList.remove("fa-heart")
        playerHeartsArr[player.playerLives - 1].classList.add("fa-heart-crack")
      }
    }
    gameOver();
    
    

    // let enemyDistances = [5, -5]
    // let randomIndex = Math.floor(Math.random() * enemyDistances.length)
    // let randomDistance = enemyDistances[randomIndex]
    // console.log(randomDistance)
    enemy.enemyMove()
  }, 50)

  
  setTimeout(() => {
    
  }, 3000)
}

//Update Interval for moving like a game loop
function gameOver() {
  if(player.playerLives == 0) {
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
    gamePage.appendChild(gameOverScreen)

    const resetBtn = document.getElementById('reset-btn'); 
    
    resetBtn.addEventListener('click', () => {
      gameScreen.removeChild(enemy.element)
      startGame();
      player.playerLives = 3
      gamePage.removeChild(gameOverScreen)
      gameScreen.style.display = 'block'
      
    })
  }
}




