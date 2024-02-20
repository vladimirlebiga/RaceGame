class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.player = new Player(
      this.gameScreen,
      200,
      500,
      100,
      150,
      "./images/car.png"
    );
    this.height = 600;
    this.width = 500;
    this.obstacles = [];
    this.score = 0;
    this.lives = 3;
    this.gameOver = false;
    this.gameIntervalId = null;
    this.gameLoopFrecuency = Math.round(1000 / 60);
  }

  start() {
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    this.gameIntervalId = setInterval(
      this.gameLoop.bind(this),
      this.gameLoopFrecuency
    );
  }
  gameLoop() {
    this.update();
    if (this.gameOver) {
      clearInterval(this.gameIntervalId);
    }
  }
  update() {
    console.log("update");
    this.player.move();
    // this.player.didCollide();
    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      obstacle.move();
      if (this.player.didCollide(obstacle)) {
        obstacle.element.remove();
        this.obstacles.splice(i, 1);
        this.lives -= 1;
        const element = document.querySelector("#lives");
        element.textContent = this.lives;
        i--;
      } else if (obstacle.top > this.height) {
        this.score += 1;
        const score = document.querySelector("#score");
        score.textContent = this.score;
        obstacle.element.remove();
        this.obstacles.splice(i, 1);
        i--;
      }
    }
    if (!this.lives) {
      this.endGame();
    }
    if ((Math.random() > 0, 98 && this.obstacles.length < 1)) {
      console.log(this.gameScreen);
      this.obstacles.push(new Obstacle(this.gameScreen));
    }
  }

  endGame() {
    this.player.element.remove();
    this.obstacles.forEach((element) => {
      element.element.remove();
    });
    this.gameOver = true;
    this.gameScreen.style.display = "none";
    this.gameEndScreen.style.display = "block";
  }
}
