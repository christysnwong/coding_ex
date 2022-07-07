import React, { useEffect, useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=5, ncols=5, chanceLightStartsOn=0.5 }) { 
  const [board, setBoard] = useState(createValidBoard);

  
  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];

    // TODO: create array-of-arrays of true/false values
    for (let y = 0; y < ncols; y++) {
      initialBoard.push(
        Array.from({ length: nrows }, (v) =>
          Math.random() < chanceLightStartsOn ? true : false
        )
      );
    }

    console.log("init", initialBoard);
    
    return initialBoard;

  }

  // create a valid 5x5 board that has solution available
  // ignores other sizes of board
  function createValidBoard() {
    let validBoard = createBoard();

    if (validBoard.length === 5) {
      while (isSolveable(validBoard) === false) {
        validBoard = createBoard();
      }
    }
    
    return validBoard;
  }
  
  // set winning condition
  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return board.every(subArr => subArr.indexOf(true) === -1 );
    
  }

  // flip and set boards
  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      return flipCells(y, x, oldBoard);
    });
  }

  // flip cells
  function flipCells(y, x, oldBoard) {
    const flipCell = (y, x, boardCopy) => {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        boardCopy[y][x] = !boardCopy[y][x];
      }
    };

    // TODO: Make a (deep) copy of the oldBoard

    let boardCopy = oldBoard.map((subArr) => [...subArr]);

    // TODO: in the copy, flip this cell and the cells around it

    flipCell(y + 1, x, boardCopy);
    flipCell(y - 1, x, boardCopy);
    flipCell(y, x + 1, boardCopy);
    flipCell(y, x - 1, boardCopy);
    flipCell(y, x, boardCopy);

    // TODO: return the copy
    return boardCopy;
  }


  // if the game is won, just show a winning msg & render nothing else
  // TODO

  if (hasWon()) {
    return <div>Congrats! You won!</div>
  }

  // Determine solveability of 5x5 board
  
  function isSolveable(initialBoard) {
    
    // can only be one of the 8 possible patterns for the bottom row after initial light chase down
    let solveableBtmRows = [
      [true, true, true, false, false],
      [true, true, false, true, true],
      [true, false, true, true, false],
      [true, false, false, false, true],
      [false, true, true, false, true],
      [false, true, false, true, false],
      [false, false, true, true, true],
      [false, false, false, false, false],
    ];

    let boardCopy = initialBoard.map((subArr) => [...subArr]);

    // chase down the lights from the top until the bottom row is left to be solved
    for (let y = 0; y < nrows - 1; y++) {
      for (let x = 0; x < ncols; x++) {
        if (boardCopy[y][x]) {
          boardCopy = flipCells(y + 1, x, boardCopy);
        }
      }
    }

    console.log("btm row after chase down", boardCopy[nrows - 1]);

    // compare bottom row with one of the solveable bottom row configurations
    // if matches, it returns true, otherwise false
    for (let row of solveableBtmRows) {
      if (row.every((val, idx) => val === boardCopy[nrows - 1][idx])) {
        console.log("solveable");
        return true;
      }
    }

    console.log("no solution - recreate board");
    return false;
  }
  

  // make table board
  // TODO

  let tableBoard = [];

  for (let y = 0; y < nrows; y++) {
    let subArr = [];
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`;
      subArr.push(<Cell key={coord} isLit={board[y][x]} flipCellsAroundMe={() => flipCellsAround(coord)}/>);
    }
    tableBoard.push(<tr key={y}>{subArr}</tr>);
  }

  return (
    <table className="Board">
      <tbody>{tableBoard}</tbody>
    </table>
  );

}

export default Board;
