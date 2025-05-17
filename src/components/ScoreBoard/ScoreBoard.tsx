import { useState } from "react";
import "./style.css";
import type { Scoreboard } from "../../constants/types";

interface ScoreboardProps {
    ignoreButton?: boolean;
    scoreboard: Scoreboard;
}

const ScoreBoard = ({ scoreboard, ignoreButton = false }: ScoreboardProps) => {
    const [showScoreBoard, setShowScoreBoard] = useState(false);

    const players = {
        playerOne: {
            name: sessionStorage.getItem("player1") || "Player 1",
            symbol: sessionStorage.getItem("player1Symbol") || "X",
            color: sessionStorage.getItem("player1Color") || "transparent",
            won: scoreboard["X"].won || 0,
            loss: scoreboard["X"].loss || 0,
        },
        playerTwo: {
            name: sessionStorage.getItem("player2") || "Player 2",
            symbol: sessionStorage.getItem("player2Symbol") || "O",
            color: sessionStorage.getItem("player2Color") || "transparent",
            won: scoreboard["O"].won || 0,
            loss: scoreboard["O"].loss || 0,
        },
    };

    const scorebaordToggle = () => {
        if (ignoreButton) return;
        setShowScoreBoard((prev) => !prev);
    };

    const renderPlayerRow = (player: {
        name: string;
        symbol: string;
        color: string;
        won: number;
        loss: number;
    }) => (
        <tr>
            <td>
                <span>
                    <span
                        className='player-color-indicator'
                        style={{ backgroundColor: player.color }}></span>
                    {` ${player.name} (${player.symbol})`}
                </span>
            </td>
            <td>{player.won}</td>
            <td>{player.loss}</td>
        </tr>
    );

    const showButton = ignoreButton ? true : showScoreBoard;

    return (
        <section className='score-board-container'>
            {!showButton && (
                <button className='score-board' onClick={scorebaordToggle}>
                    Scoreboard
                </button>
            )}
            {showButton && (
                <table>
                    <thead onClick={scorebaordToggle}>
                        <tr>
                            <td>Players</td>
                            <td>Won</td>
                            <td>Loss</td>
                        </tr>
                    </thead>
                    <tbody>
                        {renderPlayerRow(players.playerOne)}
                        {renderPlayerRow(players.playerTwo)}
                    </tbody>
                </table>
            )}
        </section>
    );
};

export default ScoreBoard;
