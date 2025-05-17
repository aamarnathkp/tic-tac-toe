import GameStatusBar from "./GameStatusBar";
import type { PlayerSymbol, Scoreboard } from "../../constants/types";
import { resetSessionStorageAndReload } from "../../utils/utils";

import "./style.css";

interface GameProps {
    gameboard: string[][];
    currentPlayer: PlayerSymbol;
    gameClick: (row: number, col: number) => void;
    resetGameboard: () => void;
    scoreboard: Scoreboard;
    isGameOver: boolean;
}

const Game = ({
    gameboard,
    currentPlayer,
    gameClick,
    resetGameboard,
    scoreboard,
    isGameOver,
}: GameProps) => {
    const resetGame = () => {
        resetSessionStorageAndReload();
        resetGameboard();
    };

    return (
        <section className='game-board'>
            <GameStatusBar
                currentPlayer={currentPlayer}
                scoreboard={scoreboard}
            />
            <div className='game'>
                {/* {isGameOver && <p className="game-over"></p>} */}
                {gameboard.map((row, rowIndex) => (
                    <div key={rowIndex} className='game-row'>
                        {row.map((cell, cellIndex) => {
                            const player =
                                cell === "X"
                                    ? "game-cell-player1-active"
                                    : cell === "O"
                                    ? "game-cell-player2-active"
                                    : "";

                            return (
                                <button
                                    aria-label='game-cell'
                                    key={cellIndex}
                                    className={`game-cell ${player}`}
                                    style={{
                                        backgroundColor: isGameOver
                                            ? "gray"
                                            : "",
                                    }}
                                    onClick={() =>
                                        gameClick(rowIndex, cellIndex)
                                    }
                                    disabled={cell !== "" || isGameOver}>
                                    {cell}
                                </button>
                            );
                        })}
                    </div>
                ))}
            </div>
            <div className='game-controls'>
                <button
                    style={{
                        width: "180px",
                        fontSize: "14px",
                        fontFamily: '"Press Start 2P", cursive',
                    }}
                    onClick={resetGame}>
                    Reset Game
                </button>
            </div>
        </section>
    );
};

export default Game;
