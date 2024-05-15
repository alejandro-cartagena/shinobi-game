const gamePageContainer = document.getElementById('game-page-container')
const gameScreen = document.getElementById("game-page")
const gameOverText = document.getElementById('');

const player = new Player(gameScreen)
let playerLives = 3

let score = 0


const enemy = new Enemy(gameScreen)

let gameLoopInterval;

// Player Lives
const playerHearts = document.querySelectorAll(".heart")
let playerHeartsArr = [...playerHearts]

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
  }
  
})
 

document.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    player.movingLeft = false
    player.movingRight = false
    player.element.style.backgroundImage = 'url("./SpriteSheets/Samurai/Idle.png")'
  }
})



function startGame() {
  score = 0
  player.element.style.left = 0
  player.playerPos = 0
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
      player.pushback()
      playerHeartsArr[player.playerLives - 1].classList.remove("fa-heart")
      playerHeartsArr[player.playerLives - 1].classList.add("fa-heart-crack")
    }
    
    gameOver();

    // let enemyDistances = [5, -5]
    // let randomIndex = Math.floor(Math.random() * enemyDistances.length)
    // let randomDistance = enemyDistances[randomIndex]
    // console.log(randomDistance)
    // enemy.enemyMove(-5)
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
      <h3 id="score">Score: 0</h3>
      <button id="reset-btn">RESET</button>
    </div>
  `
    // gameScreen.style.display = 'none'
    gamePage.appendChild(gameOverScreen)

    const resetBtn = document.getElementById('reset-btn'); 
    
    resetBtn.addEventListener('click', () => {

      console.log("RESET CLICK")
      startGame();
      player.playerLives = 3
      gamePage.removeChild(gameOverScreen)
      gameScreen.style.display = 'block'
      
    })
  }
}




