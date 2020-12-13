document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = { cells: [] }
let size = 5
let difficulty = 0.3

function createBoard() {
  document.querySelector(".board").innerHTML = " "
  for (i = 0; i < size; i++) {
    for (j = 0; j < size; j++) {
      board.cells.push({
        row: i,
        col: j,
        hidden: true,
        isMine: Math.random() < difficulty
      })
    }
  }
}

function resetBoard() {
  document.querySelector(".board").innerHTML = " ";
  board = { cells: [] }
  startGame()
}

function startGame() {
  createBoard();
  lib.initBoard()
  for (i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }
  document.addEventListener('click', checkForWin)
  document.addEventListener('contextmenu', checkForWin)
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?

function checkForWin() {
  var isTheWinner = true
  for (var i = 0; i < board.cells.length; i++) {
    var cell = board.cells[i]
    if (cell.isMine && cell.isMarked == false) {
      isTheWinner = false
    }
    if (cell.isMine == false && cell.hidden) {
      isTheWinner = false
    }
  }
  if (isTheWinner) {
    lib.displayMessage('You win!')
  }
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.

function countSurroundingMines(cell) {
  var surroundingCells = lib.getSurroundingCells(cell.row, cell.col)
  let mineCount = 0
  surroundingCells.forEach(surCell => {
    if (surCell.isMine === true) {
      mineCount++;
    }
  })
  return mineCount
}