const player = new Player()


document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {

    player.element.style.backgroundImage = 'url("./SpriteSheets/Samurai/Run.png")'
    player.element.style.rotate = 'y 180deg'
    player.element.style.backgroundPosition = '192px 192px';
    window.requestAnimationFrame(() => player.animatePlayer("move"))
    player.playerMove(-10)
  }
  if (e.key === 'ArrowRight') {

    player.playerMove(10)
    player.element.style.backgroundImage = 'url("./SpriteSheets/Samurai/Run.png")'
    player.element.style.rotate = 'y 0deg'
    player.element.style.backgroundPosition = '192px 192px';
    window.requestAnimationFrame(() => player.animatePlayer("move"))
  }
  else if (e.key === 'ArrowUp'){
    player.element.style.backgroundImage = 'url("./SpriteSheets/Samurai/Jump.png")'
    player.element.style.backgroundPosition = '192px 192px';
    player.jumpPlayer()
  } 
  else if (e.key === " " || e.key === "Spacebar") {
    player.element.style.backgroundImage = 'url("./SpriteSheets/Samurai/Attack_1.png")'
    player.element.style.backgroundPosition = '192px 192px';
    player.animateAttack()
  }
  
})
 

document.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    // clearInterval(intervalId)
    player.element.style.backgroundImage = 'url("./SpriteSheets/Samurai/Idle.png")'
    player.element.style.backgroundPosition = '192px 192px';
  }
})

