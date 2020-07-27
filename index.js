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
  // create an instance of the board to check against
  allSquares.forEach((square) => currentBoard.push(square.innerText));
  
  // brute force - check each line against a solution list [8 lines at top of page]
  for (let i = 0; i < WINNING_COMBOS.length; i++) {
    let xCount = 0;
    let oCount = 0;
    for (let j = 0; j < 3; j++) {
      // find the value on the board in the same postion as this instance of a winning combo
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
      // if won
      if (xCount == 3 || oCount == 3) {
        // get message tag and innerText = "x/o won"
        msg.innerText = "Winner";
      }
    }
  }
}

// FUTURE FEATURES
// restart game
// add points to players scores
// highlight winning line
// change who starts
// enter names
// message states who wins

// POTENTIAL REFACTORS
// can you make the currentboard added to after each turn?
// the brute force count stops if a cell is empty
// game stops after the winner has been announced
