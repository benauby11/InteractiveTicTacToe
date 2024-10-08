class TicTacToe {
  constructor() {
    this.board = Array(9).fill(" ");
    this.winner = null;
  }

  availableMoves() {
    return this.board
      .map((val, idx) => (val === " " ? idx : null))
      .filter((val) => val !== null);
  }

  emptySquaresAvailable() {
    return this.board.includes(" ");
  }

  makeMove(square, letter) {
    if (this.board[square] === " ") {
      this.board[square] = letter;
      if (this.checkWinner(square, letter)) {
        this.winner = letter;
      }
      return true;
    }
    return false;
  }

  checkWinner(square, letter) {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winPatterns.some((pattern) =>
      pattern.every((idx) => this.board[idx] === letter)
    );
  }

  // Helper function to switch the player
  helper(letter) {
    return letter === "O" ? "X" : "O";
  }

  // Minimax algorithm with alpha-beta pruning
  minimax(depth, alpha, beta, maximizingPlayer, aiPlayer) {
    if (depth === 0) {
      return {
        position: -1,
        score: 0,
      };
    }

    const negInf = -Infinity;
    const posInf = Infinity;

    if (maximizingPlayer) {
      let maxEval = { position: -1, score: negInf };

      for (let move of this.availableMoves()) {
        this.board[move] = aiPlayer;
        let new_eval = { position: -1, score: 0 };
        if (this.checkWinner(move, aiPlayer)) {
          new_eval = { position: -1, score: depth + 1 };
        } else {
          new_eval = this.minimax(depth - 1, alpha, beta, false, aiPlayer);
        }

        this.board[move] = " ";

        if (new_eval.score > maxEval.score) {
          maxEval = { position: move, score: new_eval.score };
        }

        alpha = Math.max(alpha, new_eval.score);
        if (beta <= alpha) {
          break;
        }
      }

      return maxEval;
    } else {
      let minEval = { position: -1, score: posInf };

      for (let move of this.availableMoves()) {
        this.board[move] = this.helper(aiPlayer);
        let new_eval = { position: -1, score: 0 };

        if (this.checkWinner(move, this.helper(aiPlayer))) {
          new_eval = { position: -1, score: -1 * (depth + 1) };
        } else {
          new_eval = this.minimax(depth - 1, alpha, beta, true, aiPlayer);
        }

        this.board[move] = " "; // Undo move

        if (new_eval.score < minEval.score) {
          minEval = { position: move, score: new_eval.score };
        }

        beta = Math.min(beta, new_eval.score);
        if (beta <= alpha) {
          break;
        }
      }

      return minEval;
    }
  }
}

export default TicTacToe;
