import React, { useState } from 'react';
import GameBoard from './GameBoard';

const initialGameState = {
  activePlayer: 1,
  gameBoard: [0, 0, 0, 0, 0, 0, 0, 0, 0],
};

function TicTacToe() {
  const victoryAchievedInLine = (gameBoard) => {
    for (let i = 0; i <= 6; i += 3) {
      if (
        gameBoard[i] === gameBoard[i + 1] &&
        gameBoard[i + 1] === gameBoard[i + 2] &&
        gameBoard[i] !== 0
      )
        return gameBoard[i];
    }
    return false;
  };

  const victoryAchievedInColumn = (gameBoard) => {
    for (let i = 0; i <= 2; i += 1) {
      if (
        gameBoard[i] === gameBoard[i + 3] &&
        gameBoard[i + 3] === gameBoard[i + 6] &&
        gameBoard[i] !== 0
      )
        return gameBoard[i];
    }
    return false;
  };

  const victoryAchievedInDiagonals = (gameBoard) => {
    if (gameBoard[4] === 0) return false;
    if (gameBoard[0] === gameBoard[4] && gameBoard[4] === gameBoard[8]) {
      return gameBoard[0];
    }
    if (gameBoard[2] === gameBoard[4] && gameBoard[4] === gameBoard[6]) {
      return gameBoard[2];
    }
    return false;
  };

  const [gameState, setGameState] = useState(initialGameState);

  const resetGame = () => {
    setGameState(initialGameState);
  };

  const toggleActivePlayer = () => {
    const { activePlayer } = gameState;
    if (activePlayer === 1) return 2;
    return 1;
  };

  const updateState = (cellClicked) => {
    setGameState((state) => {
      const newState = [...state.gameBoard];
      let newActivePlayer = state.activePlayer;

      if (state.gameBoard[cellClicked] === 0) {
        newState[cellClicked] = state.activePlayer;
        newActivePlayer = toggleActivePlayer();
      } else newState[cellClicked] = state.gameBoard[cellClicked];

      return {
        activePlayer: newActivePlayer,
        gameBoard: newState,
      };
    });
  };

  const victoryAchieved = () => {
    const { gameBoard } = gameState;

    return (
      victoryAchievedInLine(gameBoard) ||
      victoryAchievedInColumn(gameBoard) ||
      victoryAchievedInDiagonals(gameBoard)
    );
  };

  const renderButton = () => {
    return (
      <button type="button" onClick={resetGame} data-testid="restart-button">
        Recomeçar Jogo
      </button>
    );
  };

  const { gameBoard } = gameState;

  const win = victoryAchieved();

  if (!gameBoard.includes(0) && !win) {
    return (
      <>
        {renderButton()}
        <h1>Empate</h1>
      </>
    );
  }

  return (
    <>
      {renderButton()}
      {!win ? (
        <GameBoard gameState={gameBoard} updateGame={updateState} />
      ) : (
        <h1>{`Player ${win === 2 ? 'O' : 'X'} Ganhou`}</h1>
      )}
    </>
  );
}

export default TicTacToe;
