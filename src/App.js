import React, { useState } from "react";
import "./TicTacToe.css";
import win from "./winner.gif";

const TicTacToe = () => {
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  const handleClick = (row, col) => {
    if (board[row][col] !== "" || winner) return;

    const newBoard = [...board];
    newBoard[row][col] = player;
    setBoard(newBoard);

    if (checkWinner(newBoard)) {
      setWinner(player);
    } else {
      setPlayer(player === "X" ? "O" : "X");
    }
  };

  const checkWinner = (board) => {
    // check rows
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2] &&
        board[i][0] !== ""
      ) {
        return true;
      }
    }

    // check columns
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] === board[1][i] &&
        board[1][i] === board[2][i] &&
        board[0][i] !== ""
      ) {
        return true;
      }
    }

    // check diagonals
    if (
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2] &&
      board[0][0] !== ""
    ) {
      return true;
    }
    if (
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0] &&
      board[0][2] !== ""
    ) {
      return true;
    }

    return false;
  };

  const resetGame = () => {
    setBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setPlayer("X");
    setWinner(null);
  };

  return (
    <div className='tic-tac-toe-container'>
      {winner ? (
        <div className='winner-container'>
          <h2 className='winner-text'>Player {winner} wins!</h2>
          <img src={win} alt='Winning Gif' />
          <button className='reset-button' onClick={resetGame}>
            Reset Game
          </button>
        </div>
      ) : (
        <div>
          <table className='board-table'>
            <tbody>
              {board.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className={col}
                      onClick={() => handleClick(rowIndex, colIndex)}
                    >
                      {col}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <h2 className='turn-text'>Player {player}'s turn</h2>
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
