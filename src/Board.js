import React, { useState } from "react";
import TicTacToe from "./TicTacToe";
import Square from "./Square";

export default function Board() {
  const [game, setGame] = useState(new TicTacToe());
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (index) => {
    const letter = xIsNext ? "X" : "O";
    const newGame = new TicTacToe();
    Object.assign(newGame, game);

    if (newGame.winner || newGame.board[index] !== " ") {
      return;
    }

    newGame.makeMove(index, letter);
    setGame(newGame);

    if (!newGame.winner && newGame.emptySquaresAvailable()) {
      const aiLetter = "O";
      const aiMove = newGame.minimax(
        newGame.availableMoves().length,
        -Infinity,
        Infinity,
        true,
        aiLetter
      ).position;
      newGame.makeMove(aiMove, aiLetter);
      setGame(newGame);
    } else {
      setXIsNext(!xIsNext);
    }
  };

  const renderSquare = (index) => {
    return (
      <Square value={game.board[index]} onClick={() => handleClick(index)} />
    );
  };

  const status = game.winner
    ? `Winner: ${game.winner}`
    : !game.availableMoves().length
    ? "Draw!"
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </>
  );
}
