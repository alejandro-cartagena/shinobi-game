class Enemy {
    constructor(gameScreen) {
        this.gameScreen = gameScreen;
        this.enemyPos = 600;
        this.appearing = false;
        this.movingLeft = false;
        this.movingRight = false;
        this.type = "";
        this.motionLoopIndex = 0;
        this.motionLoop = [1, 2, 3, 4, 5, 6, 7, 8];

        //Enemy Style
        this.element = document.createElement("div");
        this.element.style.backgroundImage = `url("./SpriteSheets/Yurei/idle.png")`;
        this.element.style.position = 'absolute';
        this.element.style.height = '192px';
        this.element.style.width = '192px';
        this.element.style.backgroundPosition = '192px 192px';
        this.element.style.backgroundSize = 'cover';
        this.element.style.bottom = '40px';
        this.element.style.left = '600px';
        this.element.style.border = 'solid red';
        this.element.style.transform = 'rotateY(180deg)';

        gameScreen.appendChild(this.element)
    }

    enemyMove = (distance) => {

        if (
          (distance < 0 && this.enemyPos > 0) ||
          (distance > 0 && this.enemyPos < 600)
        ) {
          this.enemyPos += distance;
          this.animateEnemy();
        }
    
        this.element.style.left = `${this.enemyPos}px`;
      };
    
      drawEnemy = (frameX, frameY) => {
        this.element.style.backgroundPosition = `${frameX * -192}px ${
          frameY * 192
        }px`;
      };
    
      //PLAYER ANIMATIONS
    
      animateEnemy(animation) {
        
        if (this.motionLoopIndex < this.motionLoop.length) {
                this.drawEnemy(this.motionLoop[this.motionLoopIndex], 1);
                this.motionLoopIndex++;
            } else {
                this.motionLoopIndex = 0;
            }
      }
}



/*

    class Enemy {
        constructor() {
            this.enemyPos = 0
        }

        enemyMove() {
            if (this.enemyPos > 0 && this.enemyPos < 600) {
                this.enemyPos += -10
            }

            this.element.style.left = `${this.playerPos}px`;
        }

        drawEnemy() {

        }

        animateEnemy() {

        }
    }

    class Gotoku extends Enemy {
        constructor(gameScreen) {
            super()
            this.gameScreen = gameScreen

            this.motionLoopIndex = 0
            this.motionLoop = [1, 2, 3, 4, 5, 6, 7]
        }
    }

    class Onre extends Enemy {

    }

    class Yurei extends Enemy {

    }

*/