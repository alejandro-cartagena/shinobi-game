class Enemy {
    constructor(gameScreen) {
        this.gameScreen = gameScreen;
        this.enemyPos = 0;
        this.appearing = false;
        this.movingLeft = false;
        this.movingRight = false;
        this.type = "";
        this.motionLoopIndex = 0;
        this.motionLoop = [1, 2, 3, 4, 5, 6, 7, 8];
        //Enemy Style
        this.element = document.createElement("img");
        this.element.src = "./SpriteSheets/Yurei/idle.png";
        this.element.style = {
            position: 'absolute',
            height: '192px',
            width: '192px',
            backgroundPosition: '192px 192px',
            backgroundSize: 'cover',
        }
    }
}