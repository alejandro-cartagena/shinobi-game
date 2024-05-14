class Player {
    constructor(gameScreen) {
        this.gameScreen = gameScreen
        this.playerPos = 0
        this.element = document.getElementById("player")
        
        this.attacking = false
        this.jumping = false
        this.falling = false
        this.takingDamage = true

        // For Sprite Sheets Control
        this.motionLoopIndex = 0;
        this.jumpLoopIndex = 0
        this.attackLoopIndex = 0
        // Represents The Different Player Movements
        this.motionLoop = [1, 2, 3, 4, 5, 6, 7, 8];
        this.jumpLoop = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        this.attackLoop = [1, 2, 3, 4, 5, 6]
        
    }

    playerMove = (distance) => {
        console.log("(Left offset, Right offset)", this.gameScreen.offsetLeft, this.gameScreen.offsetWidth)
        console.log("Player Position: ", this.playerPos )
        if ((distance < 0 && this.playerPos > 0) || (distance > 0 && this.playerPos < 600)) {
            this.playerPos += distance
        }

        this.element.style.left = `${this.playerPos}px`;
    }

    drawPlayer = (frameX, frameY) => {
        this.element.style.backgroundPosition = `${frameX * -192}px ${frameY * 192}px`;
    }
      //Move player forward
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
                console.log("attack loop index: " + this.attackLoopIndex);
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

    animateAttack() {
        
        if (!this.attacking) {
            this.attacking = true
            this.attackLoopIndex = 0
            let attackInterval = setInterval(() => {
                this.animatePlayer("attack")
            }, 60)
            setTimeout(() => {
                clearInterval(attackInterval)
                this.element.style.backgroundImage = 'url("./SpriteSheets/Samurai/Idle.png")'
                this.attacking = false
            }, 360)
        }
        
        
    }

    //Jump Player
    jumpPlayer = () => {
        if (!this.jumping) {
        this.jumpLoopIndex = 0
        this.jumping = true
        //play the jumping sound
        let startJumping = 40
        let endJumping = 200
        let jumpSpeed = 20
        let jumpInterval = setInterval(() => {
            if (startJumping < endJumping) {
            startJumping += jumpSpeed
            this.element.style.bottom = `${startJumping}px`
            this.animatePlayer("jump")
            } else {
            clearInterval(jumpInterval)
            this.fallPlayer()
            }
        }, 40)
        }
    }
    
    fallPlayer = () => {
        let startFalling = 200
        let endFalling = 40
        let fallSpeed = 40
    
        let fallInterval = setInterval(() => {
        if (startFalling > endFalling) {
            startFalling -= fallSpeed
            this.element.style.bottom = `${startFalling}px`
            this.animatePlayer("jump")
        } else {
            clearInterval(fallInterval)
            this.jumping = false
            this.element.style.backgroundImage = 'url("./SpriteSheets/Samurai/Idle.png")'
        }
        }, 40)
    }


    


}