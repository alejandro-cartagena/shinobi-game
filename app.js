const gameScreen = document.getElementById("game-page")
const player = new Player(gameScreen)
let playerLives = 3


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

//Update Interval for moving like a game loop
setInterval(() => {
  if(player.movingLeft) {
    player.playerMove(-10);
  } else if(player.movingRight) {
    player.playerMove(10);
  } else if(!player.attacking) {
    player.animatePlayer('attack');
  }
}, 50)

setTimeout(() => {
  
}, 3000)

