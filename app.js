let player = document.getElementById('player');
let intervalId


let decreasing = true;
player.style.opacity = 1
let currentLoopIndex = 0;
const animationLoop = [1, 2, 3, 4, 5, 6, 7, 8];
const jumpLoop = [1, 2, 3, 4, 5, 6, 7, 8, 11, 12]
const attackLoop = [1, 2, 3, 4, 5, 6]
let movInterval
let playerPos = 0

//receive Damage
function damage() {
  let currentOpacity = parseFloat(player.style.opacity);
  if (decreasing) {
    if (currentOpacity > 0.2) {
      player.style.opacity = currentOpacity - 0.2;
    } else {
      decreasing = false;
    }
  } else {
    if (currentOpacity < 1) {
      player.style.opacity = currentOpacity + 0.2;
    } else {
      decreasing = true;
    }
  }
}

function animateAttack() {
  if (currentLoopIndex < attackLoop.length) {
    drawPlayer(attackLoop[currentLoopIndex], 1);
    currentLoopIndex++;
  } else {
    currentLoopIndex = 0;
    clearInterval(intervalId)
  }
}


const drawPlayer = (frameX, frameY) => {
  player.style.backgroundPosition = `${frameX * -192}px ${frameY * 192}px`;
}
//Move player forward
function animatePlayer(imageArr) {

  if (currentLoopIndex < imageArr.length) {
    drawPlayer(imageArr[currentLoopIndex], 1);
    console.log(imageArr[currentLoopIndex], imageArr.length)
    currentLoopIndex++;
  } else {
    currentLoopIndex = 0;
  }

}

//Jump Player
// const jumpPlayer = () => {

// }

let gameScreen = document.getElementById('game-page');

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    //clearInterval(movInterval)
    player.style.backgroundImage = 'url("./SpriteSheets/Samurai/Run.png")'
    player.style.rotate = 'y 180deg'
    player.style.backgroundPosition = '192px 192px';
    window.requestAnimationFrame(() => animatePlayer(animationLoop))
    //movInterval = setInterval(animatePlayer, 34);
    playerMove(-10)
  }
  if (e.key === 'ArrowRight') {
    //clearInterval(movInterval)

    playerMove(10)
    player.style.backgroundImage = 'url("./SpriteSheets/Samurai/Run.png")'
    player.style.rotate = 'y 0deg'
    player.style.backgroundPosition = '192px 192px';
    window.requestAnimationFrame(() => animatePlayer(animationLoop))
    //movInterval = setInterval(animatePlayer, 34);
  }

})

document.addEventListener("keypress", (e) => {
  if (e.key === " " || e.key === "Spacebar") {
    clearInterval(intervalId)
    player.style.backgroundImage = 'url("./SpriteSheets/Samurai/Attack_1.png")'
    player.style.backgroundPosition = '192px 192px';
    intervalId = setInterval(animateAttack, 60)
    setTimeout(() => {
      player.style.backgroundImage = 'url("./SpriteSheets/Samurai/Idle.png")'
      player.style.backgroundPosition = '192px 192px';
    }, 360)
  }
})


document.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    clearInterval(intervalId)
    player.style.backgroundImage = 'url("./SpriteSheets/Samurai/Idle.png")'
    player.style.backgroundPosition = '192px 192px';
  }
})




const playerMove = (distance) => {
  playerPos += distance
  player.style.left = `${playerPos}px`;
}