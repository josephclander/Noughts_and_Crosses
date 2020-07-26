const WINNING_COMBOS = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

// Variables

// Message Board
const msg = document.querySelector("#message");

// Scoreboard References
const scoreBoardX = document.querySelector("#scoreX");
const scoreBoardO = document.querySelector("#scoreO");

// Squares on the Board
const square1 = document.querySelector("#square1");
const square2 = document.querySelector("#square2");
const square3 = document.querySelector("#square3");
const square4 = document.querySelector("#square4");
const square5 = document.querySelector("#square5");
const square6 = document.querySelector("#square6");
const square7 = document.querySelector("#square7");
const square8 = document.querySelector("#square8");
const square9 = document.querySelector("#square9");

const allSquares = document.querySelectorAll(".square");

// counter for whose turn
let xTurn = true;
// add an eventlistener for a click to all square elements
allSquares.forEach((square) =>
  // anon function that adds x or o alternately
  square.addEventListener("click", () => {
    // select square innerText = x or o
    let label;
    xTurn ? (label = "X") : (label = "O");
    // if square empty
    if (square.innerText == "") {
      square.innerText = label;
    }
    // move counter of turn
    xTurn = !xTurn;
    // alternate message to next turn
    let newMessage;
    xTurn ? (newMessage = "It's X's Turn!") : (newMessage = "It's O's Turn!");
    msg.innerText = newMessage;

    checkIfWon();
  })
);

// check to see if that player has won
function checkIfWon() {
  let currentBoard = [];
  allSquares.forEach((square) => currentBoard.push(square.innerText));

  for (let i = 0; i < WINNING_COMBOS.length; i++) {
    let xCount = 0;
    let oCount = 0;
    for (let j = 0; j < 3; j++) {
      let value = currentBoard[WINNING_COMBOS[i][j] - 1];
      switch (value) {
        case "X":
          xCount++;
          break;
        case "O":
          oCount++;
          break;
        default:
          break;
      }
      if (xCount == 3 || oCount == 3) {
        msg.innerText = "Winner";
      }
    }
  }
}
// brute force - check each line against a solution list [think there are 8 lines]
// if won
// get message tag and innerText = "x/o won"

// console.log(WINNING_COMBOS[0][0]);

// Future Features
// Restart game
// add points to players scores
// highlight winning line
// change who starts
// enter names

// refactors
// can you make the currentboard added to after each turn?
