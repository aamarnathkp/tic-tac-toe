import type { Scoreboard } from "../../constants/types";

import "./style.css";

interface GameStatusBarProps {
    currentPlayer: string;
    scoreboard: Scoreboard;
}

const GameStatusBar = ({ currentPlayer, scoreboard }: GameStatusBarProps) => {
    const playerOneName = sessionStorage.getItem(`player1`) || "Player 1";
    const playerTwoName = sessionStorage.getItem(`player2`) || "Player 2";

    const isPlayerOneActive = currentPlayer === "X" ? "player1-active" : "";
    const isPlayerTwoActive = currentPlayer === "O" ? "player2-active" : "";

    return (
        <div className='player-status'>
            <div className={`player-details ${isPlayerOneActive}`}>
                <p>
                    {playerOneName}
                    <span className='player-details-status'>
                        <span>❤️</span> {scoreboard["X"].life}
                    </span>
                </p>
            </div>
            <div className='game-status'>
                <div>
                    <span>❤️</span> {scoreboard["X"].life}
                </div>

                <div>
                    <span>❤️</span> {scoreboard["O"].life}
                </div>
            </div>
            <div className={`player-details ${isPlayerTwoActive}`}>
                <p>
                    {playerTwoName}
                    <span className='player-details-status'>
                        <span>❤️</span> {scoreboard["O"].life}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default GameStatusBar;
