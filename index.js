let score = 0;
let cross = true;
let isGameOver = false;

const audio = new Audio("music.mp3");
const audiogo = new Audio("gameover.mp3");
let audioPlayed = false;

document.onkeydown = function (e) {
  if (isGameOver) return;

  const dino = document.querySelector(".dino");

  if (!audioPlayed) {
    audio.play().catch((err) => console.log("Autoplay blocked:", err));
    audioPlayed = true;
  }

  if (e.keyCode === 38) {
    if (!dino.classList.contains("animateDino")) {
      dino.classList.add("animateDino");
      setTimeout(() => {
        dino.classList.remove("animateDino");
      }, 600);
    }
  }

  if (e.keyCode === 39) {
    const dinoX = parseInt(
      window.getComputedStyle(dino).getPropertyValue("left")
    );
    dino.style.left = dinoX + 112 + "px";
  }

  if (e.keyCode === 37) {
    const dinoX = parseInt(
      window.getComputedStyle(dino).getPropertyValue("left")
    );
    dino.style.left = dinoX - 112 + "px";
  }
};

setInterval(() => {
  if (isGameOver) return;

  const dino = document.querySelector(".dino");
  const obstacle = document.querySelector(".obstacle");
  const gameOverText = document.querySelector(".gameOver");
  const reloadBtn = document.getElementById("reloadBtn");

  const dx = parseInt(window.getComputedStyle(dino).getPropertyValue("left"));
  const dy = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
  const ox = parseInt(
    window.getComputedStyle(obstacle).getPropertyValue("left")
  );
  const oy = parseInt(
    window.getComputedStyle(obstacle).getPropertyValue("top")
  );

  const offsetX = Math.abs(dx - ox);
  const offsetY = Math.abs(dy - oy);

  if (offsetX < 73 && offsetY < 52) {
    gameOverText.innerHTML = "Game Over - Reload to Play Again";
    obstacle.classList.remove("obstacleAni");
    audiogo.play();
    audio.pause();
    isGameOver = true;
    reloadBtn.style.display = "block";
  } else if (offsetX < 145 && cross) {
    score += 1;
    updateScore(score);
    cross = false;

    setTimeout(() => {
      cross = true;
    }, 1000);

    setTimeout(() => {
      let aniDur = parseFloat(
        window.getComputedStyle(obstacle).getPropertyValue("animation-duration")
      );
      let newDur = aniDur - 0.1;
      if (newDur > 0.5) {
        obstacle.style.animationDuration = newDur + "s";
      }
    }, 500);
  }
}, 10);

function updateScore(score) {
  const scoreCont = document.querySelector("#scoreCont");
  scoreCont.innerHTML = "Your Score: " + score;
}
