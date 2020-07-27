const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Variables

// Message Board
const msg = document.querySelector("#message");

// Scoreboard References
const scoreBoardX = document.querySelector("#scoreX");
const scoreBoardO = document.querySelector("#scoreO");

// Squares on the Board
const allSquares = document.querySelectorAll(".square");

// Current Board [initialized as an array with index of 9]
let currentBoard = new Array(9);

// counter for turns and player
let xTurn = true;
let numberOfTurns = 0;

// add an eventlistener for a click to all square elements
allSquares.forEach((square) =>
  // anon function that adds x or o alternately
  square.addEventListener("click", (event) => {
    // select square innerText = x or o
    let label;
    xTurn ? (label = "X") : (label = "O");
    // if square empty
    if (square.innerText == "") {
      // add the label
      square.innerText = label;
      // add label to correct spot of currentBoard
      let position = parseInt(event.target.id);
      currentBoard[position] = label;
    }
    // move counter of turns
    xTurn = !xTurn;
    if(numberOfTurns < 5) {
      numberOfTurns ++;
    }
    // alternate message to next turn
    let newMessage;
    xTurn ? (newMessage = "It's X's Turn!") : (newMessage = "It's O's Turn!");
    msg.innerText = newMessage;

    // restrict check until 5 turns
    if (numberOfTurns > 4) {
      checkIfWon();
    }
  })
);

// check to see if that player has won
function checkIfWon() {
  // brute force - check each line against a solution list [8 lines at top of page]
  // access array of winning combos
  for (let combo = 0; combo < WINNING_COMBOS.length; combo++) {
    // initialize counts
    let xCount = 0;
    let oCount = 0;
    // run through the 3 winning squares
    for (let comboElement = 0; comboElement < 3; comboElement++) {
      // find the value on the board in the same postion as this instance of a winning combo
      let value = currentBoard[WINNING_COMBOS[combo][comboElement]];
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
// can you make the currentboard added to after each turn? DONE
// the brute force count stops if a cell is empty
// only need to start checking after 5 turns DONE
// game stops after the winner has been announced
