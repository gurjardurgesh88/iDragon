let score = 0;
let cross = true;
let gameEnded = false;

let audio = new Audio("music.mp3");
let audiogo = new Audio("gameover.mp3");
let audioPlayed = false;

document.onkeydown = function (e) {
  if (gameEnded) return;

  const dino = document.querySelector(".dino");

  // Start background music on first interaction
  if (!audioPlayed) {
    audio.play().catch((err) => console.log("Autoplay blocked:", err));
    audioPlayed = true;
  }

  if (e.keyCode == 38) {
    dino.classList.add("animateDino");
    setTimeout(() => {
      dino.classList.remove("animateDino");
    }, 700);
  }

  if (e.keyCode == 39) {
    let dinoX = parseInt(
      window.getComputedStyle(dino).getPropertyValue("left")
    );
    dino.style.left = dinoX + 112 + "px";
  }

  if (e.keyCode == 37) {
    let dinoX = parseInt(
      window.getComputedStyle(dino).getPropertyValue("left")
    );
    dino.style.left = dinoX - 112 + "px";
  }
};

setInterval(() => {
  if (gameEnded) return;

  const dino = document.querySelector(".dino");
  const gameOver = document.querySelector(".gameOver");
  const obstacle = document.querySelector(".obstacle");

  let dx = parseInt(window.getComputedStyle(dino).getPropertyValue("left"));
  let dy = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
  let ox = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));
  let oy = parseInt(window.getComputedStyle(obstacle).getPropertyValue("top"));

  let offsetX = Math.abs(dx - ox);
  let offsetY = Math.abs(dy - oy);

  if (offsetX < 73 && offsetY < 52) {
    gameOver.innerHTML = "Game Over - Reload to Play Again";
    gameOver.classList.add("active");
    obstacle.classList.remove("obstacleAni");
    gameEnded = true;

    audiogo.play().catch(() => {});
    setTimeout(() => {
      audiogo.pause();
      audio.pause();
    }, 1000);
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
      if (newDur > 1.5) {
        obstacle.style.animationDuration = newDur + "s";
      }
    }, 500);
  }
}, 10);

function updateScore(score) {
  const scoreCont = document.querySelector("#scoreCont");
  scoreCont.innerHTML = "Your Score: " + score;
}
