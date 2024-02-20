window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");

  startButton.addEventListener("click", function () {
    startGame();
  });
  const game = new Game();
  function startGame() {
    console.log("start game");

    game.start();
  }

  restartButton.addEventListener("click", function () {
    location.reload();
  });

  function handleKeydown(event) {
    const key = event.key;
    console.log(key);
    const possibleKeys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"];
    if (possibleKeys.includes(key)) {
      switch (key) {
        case "ArrowLeft":
          game.player.directionX = -1;
          console.log(game.player.directionX);
          break;
        case "ArrowUp":
          game.player.directionY = 1;
          break;
        case "ArrowRight":
          game.player.directionX = 1;
          break;
        case "ArrowDown":
          game.player.directionY = -1;
          break;
      }
    }
  }
  window.addEventListener("keydown", handleKeydown);
};
