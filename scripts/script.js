//game vars
const box = [];
const whose_turn_el = document.getElementById("whose-turn");
const reset_el = document.getElementById("reset");
const x_score_el = document.getElementById("p-x-score");
const o_score_el = document.getElementById("p-o-score");
//model box vars
const setting_btn = document.getElementById("setting");
const model_container = document.getElementById("model-box-container");
const model_box = document.getElementById("model-box");
const mute_btn = document.getElementById("mute");
const mute_icon_span = document.getElementById("mute-icon");

let is_x_turn = true;
let game_board = [];
let has_won = false;
let mute = false;

//=====HANDLING_SOUNDS==============================================
const clickSound = new Audio();
clickSound.src = "../assets/audio/click.wav";

const winSound = new Audio();
winSound.src = "../assets/audio/win.wav";

const resetSound = new Audio();
resetSound.src = "../assets/audio/reset.wav";

function playClickSound() {
  if (!mute && !has_won) {
    clickSound.play();
  }
}

function playWinSound() {
  if (!mute || !has_won) {
    winSound.play();
  }
}

function playResetSound() {
  if (!mute || !has_won) {
    resetSound.play();
  }
}

//=====EVENT_LISTENER==============================================
reset_el.addEventListener("click", () => {
  console.log("clicked");
  resetGameBoard();
});

setting_btn.addEventListener("click", () => {
  model_container.style.display = "flex";
});

mute_btn.addEventListener("click", (event) => {
  if (!mute) {
    mute_icon_span.classList.remove("not-in-mute");
    mute_icon_span.classList.add("in-mute");
    mute = !mute;
  } else {
    mute_icon_span.classList.remove("in-mute");
    mute_icon_span.classList.add("not-in-mute");
    mute = !mute;
  }
});

model_box.addEventListener("click", (event) => {
  event.stopPropagation();
});

model_container.addEventListener("click", () => {
  model_container.style.display = "none";
});

// =====GAME_RELATED_FUNSTIONS=====================================

function newGameBoard() {
  game_board = [];
  console.log("***GENERATING NEW GAME BOARD***");
  for (let i = 0; i < 3; i++) {
    let row = [];
    for (let j = 0; j < 3; j++) {
      //row
      row.push(null);
    }
    //column
    game_board.push(row);
  }
  //   console.log(game_board);
}

function checkForWinner(current_player) {
  //check for diagonals
  //topLeft to bottom right
  if (
    game_board[0][0] == current_player &&
    game_board[1][1] == current_player &&
    game_board[2][2] == current_player
  ) {
    console.log("right here");
    box[0].style.backgroundColor = "rgb(1, 18, 4)";
    box[4].style.backgroundColor = "rgb(1, 18, 4)";
    box[8].style.backgroundColor = "rgb(1, 18, 4)";
    return true;
  }

  //topRight to BottomLeft
  if (
    game_board[2][0] == current_player &&
    game_board[1][1] == current_player &&
    game_board[0][2] == current_player
  ) {
    box[2].style.backgroundColor = "rgb(1, 18, 4)";
    box[4].style.backgroundColor = "rgb(1, 18, 4)";
    box[6].style.backgroundColor = "rgb(1, 18, 4)";
    return true;
  }

  for (let i = 0; i < 3; i++) {
    //checking rows
    if (
      game_board[i][0] == current_player &&
      game_board[i][1] == current_player &&
      game_board[i][2] == current_player
    ) {
      if (i == 0) {
        box[0].style.backgroundColor = "rgb(1, 18, 4)";
        box[1].style.backgroundColor = "rgb(1, 18, 4)";
        box[2].style.backgroundColor = "rgb(1, 18, 4)";
      } else if (i == 1) {
        box[3].style.backgroundColor = "rgb(1, 18, 4)";
        box[4].style.backgroundColor = "rgb(1, 18, 4)";
        box[5].style.backgroundColor = "rgb(1, 18, 4)";
      } else {
        box[6].style.backgroundColor = "rgb(1, 18, 4)";
        box[7].style.backgroundColor = "rgb(1, 18, 4)";
        box[8].style.backgroundColor = "rgb(1, 18, 4)";
      }
      return true;
    }
    //checking cols
    if (
      game_board[0][i] == current_player &&
      game_board[1][i] == current_player &&
      game_board[2][i] == current_player
    ) {
      if (i == 0) {
        box[0].style.backgroundColor = "rgb(1, 18, 4)";
        box[3].style.backgroundColor = "rgb(1, 18, 4)";
        box[6].style.backgroundColor = "rgb(1, 18, 4)";
      } else if (i == 1) {
        box[1].style.backgroundColor = "rgb(1, 18, 4)";
        box[4].style.backgroundColor = "rgb(1, 18, 4)";
        box[7].style.backgroundColor = "rgb(1, 18, 4)";
      } else {
        box[2].style.backgroundColor = "rgb(1, 18, 4)";
        box[5].style.backgroundColor = "rgb(1, 18, 4)";
        box[8].style.backgroundColor = "rgb(1, 18, 4)";
      }
      return true;
    }
  }

  return false;
}

function resetGameBoard() {
  playResetSound();
  //clean the board
  for (let i = 0; i < box.length; i++) {
    console.log(i);
    box[i].textContent = "";
    box[i].style.backgroundColor = "transparent";
  }
  //removing player step marking
  newGameBoard();

  has_won = false;
}

function displayGB() {
  for (let i = 0; i < 3; i++) {
    // for (let j = 0; j < 3; j++) {
    console.log(game_board[i]);
    // }
    console.log("\n");
  }
}

// =====STARTING_GAME_FUNCTION=====================================
function startGame() {
  console.log("***STARTING NEW GAME***");
  //initialize new game board
  newGameBoard();
  // map the board boxes in array
  for (let i = 1; i < 10; i++) {
    let boxName = "box" + i;
    box.push(document.getElementById(boxName));
  }
  // add event listener to the board boxes
  for (let i = 0; i < 9; i++) {
    box[i].addEventListener("click", (event) => {
      playClickSound();
      if (!has_won) {
        let current_player = is_x_turn ? "X" : "O";
        //   console.log("clicked on box " + event.target.classList.contains("box1"));
        event.target.textContent = current_player;
        event.target.style.color = is_x_turn ? "white" : "red";
        //getting clicked box index
        let box_number = box.indexOf(event.target);
        console.log(current_player + " CLICKED ON BOX -> " + (box_number + 1));

        //mapping user step in game board array
        if (box_number < 3) {
          game_board[0][box_number] = current_player;
        } else if (box_number < 6) {
          game_board[1][box_number - 3] = current_player;
        } else if (box_number < 9) {
          game_board[2][box_number - 6] = current_player;
        }
        displayGB(); //on console

        //checking for winner after every step
        console.log(
          checkForWinner(current_player)
            ? current_player + " WON"
            : "***NO WINNER YET***"
        );
        if (checkForWinner(current_player)) {
          has_won = true;
          playWinSound();
          //increamenting player's score
          is_x_turn
            ? (x_score_el.textContent = parseInt(x_score_el.textContent) + 1)
            : (o_score_el.textContent = parseInt(o_score_el.textContent) + 1);
        }

        //if no winner change player
        is_x_turn = !is_x_turn;
        whose_turn_el.textContent = is_x_turn ? "X" : "O";
      }
    });
  }
}

startGame();
