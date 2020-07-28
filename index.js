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

// Counters
let xTurn = true;
let numberOfTurns = 0;
let gameOver = false;

// add an eventlistener for a click to all square elements
allSquares.forEach((square) =>
  // anon function that adds x or o alternately
  square.addEventListener("click", (event) => {
    if (!gameOver) {
      labelSquare(event.target);
      // move counter of turns
      xTurn = !xTurn;
      messageTurnHandler();
      // stop counting turns as will always check for winners now so not necessary
      if (numberOfTurns < 5) {
        numberOfTurns++;
      }
      // restrict check until 5 turns
      if (numberOfTurns > 4) {
        // check for winning lines
        let { winnerFound, winner, combo } = checkIfWon();
        if (winnerFound) {
          gameOver = true;
          messageWinnerHandler(winner);
          styleWinningLine(combo);
        }
      }
    }
  })
);

function labelSquare(square) {
  // select square innerText = x or o
  let label;
  xTurn ? (label = "X") : (label = "O");
  // if square empty & game hasn't already been won
  if (square.innerText == "") {
    // add the label
    square.innerText = label;
    // add label to correct spot of currentBoard record
    let position = parseInt(event.target.id);
    currentBoard[position] = label;
  }
}

function messageTurnHandler() {
  // alternate message to next turn
  let newMessage;
  xTurn ? (newMessage = "It's X's Turn!") : (newMessage = "It's O's Turn!");
  msg.innerText = newMessage;
}

function checkIfWon() {
  // counter added for dev to check efficiency
  let totalChecks = 0;
  let combo = 0;
  let winnerFound = false;
  let winner;
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
      // if someone has won
      if (xCount == 3 || oCount == 3) {
        winnerFound = true;
      }
      if (xCount == 3) winner = "X";
      if (oCount == 3) winner = "O";
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
  return { winnerFound: winnerFound, winner: winner, combo: combo - 1 };
}

function styleWinningLine(combo) {
  // console.log(combo); e.g. returns 7 which is [2,4,6]
  WINNING_COMBOS[combo].forEach((index) => {
    // changes the squares background
    allSquares[index].classList.add("winner");
  });
}

function messageWinnerHandler(winner) {
  let newMessage = winner + " is the winner";
  msg.innerText = newMessage;
}

// FUTURE FEATURES
// restart game
// add points to players scores
// highlight winning line
// change who starts
// enter names
// message states who wins DONE

// POTENTIAL REFACTORS
// can you make the currentboard added to after each turn? DONE
// the brute force count stops if a cell is empty DONE
// only need to start checking after 5 turns DONE
// game stops after the winner has been announced DONE
// if no blanks on a winning combo but not a win, can it be ignored from future win checks?
// Edge case of more than one winning line
