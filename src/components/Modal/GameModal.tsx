import { forwardRef, useImperativeHandle, useState } from "react";
import "./style.css";
import ScoreBoard from "../ScoreBoard/ScoreBoard";
import type { Scoreboard } from "../../constants/types";

interface GameModalProps {
    playerName?: string;
    isWon?: boolean | string;
    isDraw?: boolean;
    gameOver?: boolean;
    resetGame: () => void;
    scoreboard: Scoreboard;
}

const GameModal = forwardRef(
    (
        { isWon, isDraw, gameOver, resetGame, scoreboard }: GameModalProps,
        ref
    ) => {
        const [isVisible, setIsVisible] = useState(false);

        const closeModal = () => {
            setIsVisible(false);
            resetGame();
        };

        useImperativeHandle(ref, () => ({
            open: () => {
                setIsVisible(true);
            },
            close: () => {
                setIsVisible(false);
            },
        }));

        if (!isVisible) return null;

        return (
            <dialog className='dialog-container'>
                <h2 className='heading'>Game Over</h2>
                <p className='modal-description'>
                    {isWon && isWon}
                    {isDraw && "Game Draw, Try Again!"}
                </p>
                {gameOver && (
                    <ScoreBoard scoreboard={scoreboard} ignoreButton={true} />
                )}
                <button onClick={closeModal}>
                    {gameOver ? "Close" : "Rematch"}
                </button>
            </dialog>
        );
    }
);

export default GameModal;
