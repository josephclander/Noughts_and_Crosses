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
let gameOver = false;

// add an eventlistener for a click to all square elements
allSquares.forEach((square) =>
  // anon function that adds x or o alternately
  square.addEventListener("click", (event) => {
    // select square innerText = x or o
    let label;
    xTurn ? (label = "X") : (label = "O");
    // if square empty & game hasn't already been won
    if (square.innerText == "" && !gameOver) {
      // add the label
      square.innerText = label;
      // add label to correct spot of currentBoard record
      let position = parseInt(event.target.id);
      currentBoard[position] = label;
      // move counter of turns
      xTurn = !xTurn;
      // alternate message to next turn
      let newMessage;
      xTurn ? (newMessage = "It's X's Turn!") : (newMessage = "It's O's Turn!");
      msg.innerText = newMessage;
    }
    // stop counting turns as will always check for winners now so not necessary
    if (numberOfTurns < 5) {
      numberOfTurns++;
    }
    // restrict check until 5 turns
    if (numberOfTurns > 4 && !gameOver) {
      checkIfWon();
    }
  })
);

function checkIfWon() {
  // counter added to dev to check efficiency
  let totalChecks = 0;
  let combo = 0;
  let winnerFound = false;
  do {
    let comboElement = 0;
    let xCount = 0;
    let oCount = 0;
    // is the square being checked still blank?
    let blank = false;
    do {
      let value = currentBoard[WINNING_COMBOS[combo][comboElement]];
      switch (value) {
        case undefined:
          blank = true;
          break;
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
        let newMessage;
        xTurn
          ? (newMessage = "O is the winner")
          : (newMessage = "X is the winner");
        msg.innerText = newMessage;
        // local winner variable
        winnerFound = true;
        // global winner variable
        gameOver = true;
      }
      totalChecks++;
      comboElement++;
    } while (
      // 3 elements or fewer and none are blank (undefined)
      comboElement < 3 &&
      !blank
    );
    combo++;
  } while (
    // check the list while the winner has NOT been found
    combo < WINNING_COMBOS.length &&
    !winnerFound
  );
  console.log("Number of Checks: " + totalChecks);
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
// the brute force count stops if a cell is empty DONE
// only need to start checking after 5 turns DONE
// game stops after the winner has been announced DONE
