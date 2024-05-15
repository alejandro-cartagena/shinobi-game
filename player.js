class Player {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.playerPos = 0;
    this.element = document.getElementById("player");

    this.playerLives = 3

    this.attacking = false;
    this.jumping = false;
    this.falling = false;
    this.takingDamage = true;
    this.movingLeft = false
    this.movingRight = false

    this.isColliding = false

    // For Sprite Sheets Control
    this.motionLoopIndex = 0;
    this.jumpLoopIndex = 0;
    this.attackLoopIndex = 0;
    // Represents The Different Player Movements
    this.motionLoop = [1, 2, 3, 4, 5, 6, 7, 8];
    this.jumpLoop = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    this.attackLoop = [1, 2, 3, 4, 5, 6];
  }

  //MOVE THE PLAYER

  playerMove = (distance) => {
    if (
      (distance < 0 && this.playerPos > 0) ||
      (distance > 0 && this.playerPos < 600)
    ) {
      this.playerPos += distance;
      this.animatePlayer("move");
    }

    this.element.style.left = `${this.playerPos}px`;
  };

  drawPlayer = (frameX, frameY) => {
    this.element.style.backgroundPosition = `${frameX * -192}px ${
      frameY * 192
    }px`;
  };

  //PLAYER ANIMATIONS

  animatePlayer(animation) {
    switch (animation) {
      case "move":
        if (this.motionLoopIndex < this.motionLoop.length) {
          this.drawPlayer(this.motionLoop[this.motionLoopIndex], 1);
          this.motionLoopIndex++;
        } else {
          this.motionLoopIndex = 0;
        }
        break;
      case "attack":
        if (this.attackLoopIndex < this.attackLoop.length) {
          this.drawPlayer(this.attackLoop[this.attackLoopIndex], 1);
          this.attackLoopIndex++;
        } else {
          this.attackLoopIndex = 0;
        }
        break;
      case "jump":
        if (this.jumpLoopIndex < this.jumpLoop.length) {
          this.drawPlayer(this.jumpLoop[this.jumpLoopIndex], 1);
          this.jumpLoopIndex++;
        } else {
          this.jumpLoopIndex = 0;
        }
        break;
    }
  }

  //PLAYER ATTACK

  animateAttack() {
    if (!this.attacking) {
      this.attacking = true;
      this.attackLoopIndex = 0;
      let attackInterval = setInterval(() => {
        this.animatePlayer("attack");
      }, 50);
      setTimeout(() => {
        clearInterval(attackInterval);
        this.element.style.backgroundImage =
          'url("./SpriteSheets/Samurai/Idle.png")';
        this.attacking = false;
      }, 300);
    }
  }

  //PLAYER JUMPING & FALLING

  jumpPlayer = () => {
    if (!this.jumping) {
      this.jumpLoopIndex = 0;
      this.jumping = true;
      //play the jumping sound
      let startJumping = 40;
      let endJumping = 280;
      let jumpSpeed = 30;
      let jumpInterval = setInterval(() => {
        if (startJumping < endJumping) {
          startJumping += jumpSpeed;
          this.element.style.bottom = `${startJumping}px`;
          this.animatePlayer("jump");
        } else {
          clearInterval(jumpInterval);
          this.fallPlayer();
        }
      }, 40);
    }
  };

  fallPlayer = () => {
    let startFalling = 280;
    let endFalling = 40;
    let fallSpeed = 60;

    let fallInterval = setInterval(() => {
      if (startFalling > endFalling) {
        startFalling -= fallSpeed;
        this.element.style.bottom = `${startFalling}px`;
        this.animatePlayer("jump");
      } else {
        clearInterval(fallInterval);
        this.jumping = false;
        this.element.style.backgroundImage =
          'url("./SpriteSheets/Samurai/Idle.png")';
      }
    }, 40);
  };

  didCollide(enemy) {
    const playerRect = this.element.getBoundingClientRect();
    const enemyRect = enemy.element.getBoundingClientRect();
    if (
      playerRect.left + playerRect.width / 1.5 < enemyRect.right &&
      playerRect.right - playerRect.width / 1.5 > enemyRect.left &&
      playerRect.top < enemyRect.bottom &&
      playerRect.bottom > enemyRect.top + enemyRect.height / 1.5
    ) {
      this.isColliding = true
      console.log("collided")
      return true;
    } else {
      return false;
    }
  }

  pushback() {
    let pushbackInterval = setInterval(() => {
      this.playerMove(-5)

    }, 50)
    setTimeout(() => {
      if (this.isColliding) {
        this.playerLives -= 1
      }
      console.log("Player lives: ", this.playerLives)
      clearInterval(pushbackInterval)
      this.isColliding = false
    }, 500)
    
  }

  

}
