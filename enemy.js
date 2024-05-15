class Enemy {
    constructor(gameScreen) {
        this.gameScreen = gameScreen;
        this.enemyPos = 600;
        this.appearing = false;
        this.movingLeft = true;
        this.movingRight = false;
        this.type = "";
        this.dyingUrl =  ''

        this.dyingLoopIndex

        this.motionLoopIndex = 0;
        this.motionLoop = [1, 2, 3, 4, 5, 6, 7, 8];

        this.enemyIsDying = false

        //Enemy Style
        this.element = document.createElement("div");
        this.element.style.backgroundImage = `url("./SpriteSheets/Yurei/Idle.png")`;
        this.element.style.position = 'absolute';
        this.element.style.height = '192px';
        this.element.style.width = '192px';
        this.element.style.backgroundPosition = '192px 192px';
        this.element.style.backgroundSize = 'cover';
        this.element.style.bottom = '40px';
        this.element.style.left = '600px';
        // this.element.style.border = 'solid red';
        this.element.style.transform = 'rotateY(180deg)';

        gameScreen.appendChild(this.element)
    }

    enemyMove = () => {
        if (this.element.style.left === '0px') {
            this.movingLeft = false
            this.element.style.rotate = `y 180deg`
        }
        else if (this.element.style.left === '600px') {
            this.movingLeft = true
            this.element.style.rotate = `y 0deg`
        }
        this.movingLeft ? this.enemyPos -= 5 : this.enemyPos += 5;
        this.animateEnemy();
    
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

class Yurei extends Enemy {
    constructor(gameScreen) {
        super(gameScreen)
        this.element.style.backgroundImage = `url("./SpriteSheets/Yurei/Idle.png")`;
        this.dyingUrl = 'url("./SpriteSheets/Yurei/Dead.png")'
        this.motionLoopIndex = 0;
        this.motionLoop = [1, 2, 3, 4, 5, 6, 7, 8];
    }
}

class Gotoku extends Enemy {
    constructor(gameScreen) {
        super(gameScreen)
        this.element.style.backgroundImage = `url("./SpriteSheets/Gotoku/Run.png")`;
        this.dyingUrl = 'url("./SpriteSheets/Gotoku/Dead.png")'
        this.motionLoopIndex = 0;
        this.motionLoop = [1, 2, 3, 4, 5, 6, 7];
    }
}

class Onre extends Enemy {
    constructor(gameScreen) {
        super(gameScreen)
        this.element.style.backgroundImage = `url("./SpriteSheets/Onre/Run.png")`;
        this.dyingUrl = 'url("./SpriteSheets/Onre/Dead.png")'
        this.motionLoopIndex = 0;
        this.motionLoop = [1, 2, 3, 4, 5, 6, 7];
    }
}
