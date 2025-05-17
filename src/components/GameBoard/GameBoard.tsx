import { useEffect, useMemo, useRef, useState } from "react";

import ScoreBoard from "../ScoreBoard/ScoreBoard";
import Game from "./Game";
import type { PlayerSymbol } from "../../constants/types";
import {
    PLAYER_ONE_SYMBOL,
    PLAYER_TWO_SYMBOL,
    INITIAL_GAME_STATE,
} from "../../constants/constants";

import {
    checkForDraw,
    checkForWinner,
    checkGameOver,
    getPlayerName,
} from "../../utils/utils";
import GameModal from "../Modal/GameModal";

import "./style.css";

const GameBoard = () => {
    const [gameBoard, setGameBoard] = useState(INITIAL_GAME_STATE);
    const [currentPlayer, setCurrentPlayer] =
        useState<PlayerSymbol>(PLAYER_ONE_SYMBOL);
    const [scoreboard, setScoreboard] = useState({
        [PLAYER_ONE_SYMBOL]: { won: 0, loss: 0, life: 3 },
        [PLAYER_TWO_SYMBOL]: { won: 0, loss: 0, life: 3 },
    });
    const [isGameOver, setIsGameOver] = useState(false);

    const modalRef = useRef<
        | (HTMLDialogElement & {
              isWon?: boolean | string;
              isDraw?: boolean;
              gameOver?: boolean;
              open: () => void;
          })
        | null
    >(null);

    useEffect(() => {
        if (!isGameOver && checkGameOver(scoreboard)) {
            setIsGameOver(true);
        }
    }, [scoreboard, isGameOver]);

    const handleCellClick = (row: number, col: number) => {
        if (gameBoard[row][col] !== "") return;
        const newGameBoard = [...gameBoard.map((r) => [...r])];
        newGameBoard[row][col] = currentPlayer;
        setGameBoard(newGameBoard);
        setCurrentPlayer((prev) =>
            prev === PLAYER_ONE_SYMBOL ? PLAYER_TWO_SYMBOL : PLAYER_ONE_SYMBOL
        );

        if (checkForWinner(newGameBoard, currentPlayer)) {
            const losedPlayer =
                currentPlayer === PLAYER_ONE_SYMBOL
                    ? PLAYER_TWO_SYMBOL
                    : PLAYER_ONE_SYMBOL;

            setScoreboard((prev) => ({
                ...prev,
                [currentPlayer]: {
                    ...prev[currentPlayer],
                    won: prev[currentPlayer].won + 1,
                },
                [losedPlayer]: {
                    ...prev[losedPlayer],
                    loss: prev[losedPlayer].loss + 1,
                    life: prev[losedPlayer].life - 1,
                },
            }));

            if (scoreboard[losedPlayer].life <= 1) {
                if (modalRef.current) {
                    modalRef.current.isWon = `Congrats ${getPlayerName(
                        currentPlayer
                    )} you are the champion 🎖️`;
                    modalRef.current.gameOver = true;
                    modalRef.current?.open();
                }
            } else {
                if (modalRef.current) {
                    modalRef.current.isWon = `${getPlayerName(
                        currentPlayer
                    )} Won the Match 🏆. ${getPlayerName(
                        losedPlayer
                    )}, you can catch up`;
                    modalRef.current?.open();
                }
            }
        }

        if (checkForDraw(newGameBoard)) {
            setScoreboard((prev) => ({
                ...prev,
                [PLAYER_ONE_SYMBOL]: {
                    ...prev[PLAYER_ONE_SYMBOL],
                    life: prev[PLAYER_ONE_SYMBOL].life - 1,
                },
                [PLAYER_TWO_SYMBOL]: {
                    ...prev[PLAYER_TWO_SYMBOL],
                    life: prev[PLAYER_TWO_SYMBOL].life - 1,
                },
            }));

            if (modalRef.current) {
                modalRef.current.isDraw = true;
                modalRef.current?.open();
            }
        }
    };

    const handleResetGame = () => {
        setGameBoard(INITIAL_GAME_STATE);
        setCurrentPlayer(PLAYER_ONE_SYMBOL);
        if (modalRef.current) {
            modalRef.current.isWon = false;
            modalRef.current.isDraw = false;
            modalRef.current.close();
        }
    };

    const memoizedScoreboard = useMemo(() => scoreboard, [scoreboard]);

    return (
        <div className='game-board-container'>
            <Game
                gameboard={gameBoard}
                currentPlayer={currentPlayer}
                gameClick={handleCellClick}
                resetGameboard={handleResetGame}
                scoreboard={memoizedScoreboard}
                isGameOver={isGameOver}
            />
            <ScoreBoard scoreboard={memoizedScoreboard} />
            <GameModal
                ref={modalRef}
                playerName={currentPlayer}
                resetGame={handleResetGame}
                isWon={modalRef.current?.isWon}
                isDraw={modalRef.current?.isDraw}
                gameOver={isGameOver}
                scoreboard={memoizedScoreboard}
            />
        </div>
    );
};

export default GameBoard;
