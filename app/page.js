"use client";

import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { Header } from "./components/Header";

export default function LandingPage() {
  const [game, setGame] = useState(new Chess());
  const [boardWidth, setBoardWidth] = useState();
  const [san, setSan] = useState([]);

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

  function onDrop(sourceSquare, targetSquare, piece) {
    const gameCopy = new Chess(game.fen());
    try {
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
      });
      setSan([...san, move.san]);
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
  console.log(san);
  if (boardWidth) {
    return (
      <div className="flex justify-center items-center w-[100vw] h-[100vh] gap-[40px] bg-[var(--color-base-200)]">
        <Header />
        <div>
          <Chessboard
            customDarkSquareStyle={{ backgroundColor: "var(--color-base-300)" }}
            customLightSquareStyle={{
              backgroundColor: "var(--color-base-100)",
            }}
            customBoardStyle={{ borderRadius: "10px" }}
            boardWidth={boardWidth}
            className="board"
            position={game.fen()}
            onPieceDrop={onDrop}
          />
        </div>
        <div
          className={
            "w-[20%] gap-[15px] flex flex-col bg-[var(--color-base-300)] h-[67%] overflow-scroll overflow-x-hidden rounded-[10px] p-[20px]"
          }
        >
          <p className="text-[25px]">game note</p>
          <div className="flex">
            <p className="w-[50%]">white</p> <p className="w-[50%]">black</p>
          </div>
          <div className="w-[100%] flex flex-row flex-wrap">
            {san.map((e, id) => {
              return (
                <div key={id} className="w-[50%]">
                  {e}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
