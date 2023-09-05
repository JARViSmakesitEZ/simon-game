$("body").keydown(function () {
  if (started === 0 || over === 1) {
    console.log("started");
    restartGame();
  }
});

$(".btn").click(function () {
  if (started === 1) {
    const button = $(this);
    const color = findColor(button);
    if (color !== nextSequence[index++]) {
      gameOver();
    } else {
      pressColor(color);
      checkLevelup();
    }
  }
});

let started = 0;
let over = 0;
const heading = $("h1");
let level = 1;
const colors = ["red", "blue", "yellow", "green"];
let nextSequence = [];
let turn = "computer";
let index = 0;

function checkLevelup() {
  if (started === 1 && index === nextSequence.length) {
    heading.text(`level ${level++}`);
    index = 0;
    turn = "computer";
    computerTurn();
  }
}

function restartGame() {
  started = 1;
  level = 1;
  heading.text(`level ${level++}`);
  nextSequence = [];
  index = 0;
  if (over === 1) {
    $("body").removeClass("game-over");
  }
  over = 0;
  turn = "computer";
  computerTurn();
}

function playSound(randomColor) {
  const audio = new Audio(`sounds/${randomColor}.mp3`);
  audio.play();
}

function flashComputer(randomColor) {
  const button = $(`#${randomColor}`);
  button.fadeOut();
  setTimeout(function () {
    button.fadeIn();
  }, 0.5);
}

function flashUser(randomColor) {
  const button = $(`#${randomColor}`);
  button.addClass("pressed");
  setTimeout(function () {
    button.removeClass("pressed");
  }, 150);
}

function pressColor(randomColor) {
  console.log(turn);
  playSound(randomColor);
  turn === "computer" ? flashComputer(randomColor) : flashUser(randomColor);
}

function getColor() {
  const randomIndex = Math.floor(4 * Math.random());
  const randomColor = colors[randomIndex];
  nextSequence.push(randomColor);
  return randomColor;
}

function findColor(element) {
  for (let i = 0; i < 4; i++) {
    if (element.hasClass(colors[i])) {
      return colors[i];
    }
  }
}

function computerTurn() {
  console.log(turn);
  const randomColor = getColor();
  setTimeout(function () {
    console.log("this is " + turn);
    pressColor(randomColor);
    turn = "user";
  }, 1000);
}

function gameOver() {
  heading.text("Press Any Key ,to Restart");
  const wrongAudio = new Audio("sounds/wrong.mp3");
  $("body").addClass("game-over");
  wrongAudio.play();
  over = 1;
}
