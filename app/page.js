"use client";

import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { Header } from "./components/Header";

export default function LandingPage() {
  const [game, setGame] = useState(new Chess());
  const [boardWidth, setBoardWidth] = useState();

  function makeRandomMove() {
    const gameCopy = new Chess(game.fen());
    const possibleMoves = gameCopy.moves();
    if (
      gameCopy.isGameOver() ||
      gameCopy.isDraw() ||
      possibleMoves.length === 0
    )
      return; // exit if the game is over
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    gameCopy.move(possibleMoves[randomIndex]);
    setGame(gameCopy);
  }

  function onDrop(sourceSquare, targetSquare) {
    const gameCopy = new Chess(game.fen());
    try {
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
      });
    } catch {
      console.log("illegal move");
      return false;
    }

    setGame(gameCopy);
    return true;
  }

  useEffect(() => {
    if (window) {
      setBoardWidth(window.innerWidth / 3);
    }
  }, []);
  if (boardWidth) {
    return (
      <div className="flex justify-center items-center w-[100vw] h-[100vh] flex-col bg-[var(--color-base-200)]">
        <Header />
        <div>
          <Chessboard
            customDarkSquareStyle={{ backgroundColor: "var(--color-base-300)" }}
            customLightSquareStyle={{
              backgroundColor: "var(--color-base-100)",
            }}
            boardWidth={boardWidth}
            className="board"
            position={game.fen()}
            onPieceDrop={onDrop}
          />
        </div>
        <div></div>
      </div>
    );
  }
}
