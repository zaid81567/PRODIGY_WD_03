const box = [];
const eventListenerIdOfBoxes = [];
const whose_turn_el = document.getElementById("whose-turn");
const reset_el = document.getElementById("reset");

let is_x_turn = true;
let game_board = [];

//=====EVENT_LISTENER==============================================
reset_el.addEventListener("click", () => {
  console.log("clicked");
  resetGameBoard();
});

// =====GAME_RELATED_FUNSTIONS=====================================

function newGameBoard() {
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
  for (let i = 0; i < box.length; i++) {
    console.log(i);
    box[i].textContent = "";
    box[i].style.backgroundColor = "transparent";
  }
}

function disableOnBoxClicks() {
  for (let i = 0; i < box.length; i++) {
    box[i].removeEventListener("click", eventListenerIdOfBoxes[i]);
  }
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
    let listenerId = box[i].addEventListener("click", (event) => {
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
        disableOnBoxClicks();
      }

      //if no winner change player
      is_x_turn = !is_x_turn;
      whose_turn_el.textContent = is_x_turn ? "X" : "O";
    });

    eventListenerIdOfBoxes.push(listenerId);
  }
}

startGame();
