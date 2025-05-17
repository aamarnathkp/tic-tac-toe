import { useState } from "react";
import PlayerCard from "./PlayerCard";
import "./style.css";
import {
    PLAYER_ONE_COLOR,
    PLAYER_ONE_NAME,
    PLAYER_ONE_SYMBOL,
    PLAYER_TWO_COLOR,
    PLAYER_TWO_NAME,
    PLAYER_TWO_SYMBOL,
} from "../../constants/constants";

interface PlayerInfoProps {
    onStart: () => void;
}

const PlayerInfo = ({ onStart }: PlayerInfoProps) => {
    const [showInstructions, setShowInstructions] = useState<boolean>(false);

    const onGameStart = () => {
        setShowInstructions(false);

        const playerOne = sessionStorage.getItem("player1");
        const playerTwo = sessionStorage.getItem("player2");

        if (!playerOne) {
            sessionStorage.setItem("player1", PLAYER_ONE_NAME);
            sessionStorage.setItem("player1Symbol", PLAYER_ONE_SYMBOL);
            sessionStorage.setItem("player1Color", PLAYER_ONE_COLOR);
        }

        if (!playerTwo) {
            sessionStorage.setItem("player2", PLAYER_TWO_NAME);
            sessionStorage.setItem("player2Symbol", PLAYER_TWO_SYMBOL);
            sessionStorage.setItem("player2Color", PLAYER_TWO_COLOR);
        }

        onStart();
    };

    return (
        <section className='player-container'>
            <h3>Players Info</h3>
            <div className='player-info '>
                <div className='player-info-container'>
                    <PlayerCard
                        name={PLAYER_ONE_NAME}
                        color={PLAYER_ONE_COLOR}
                        symbol={PLAYER_ONE_SYMBOL}
                        playerCount={1}
                    />
                    <PlayerCard
                        name={PLAYER_TWO_NAME}
                        color={PLAYER_TWO_COLOR}
                        symbol={PLAYER_TWO_SYMBOL}
                        playerCount={2}
                    />
                </div>
                <button onClick={onGameStart}>Start Game</button>
                {!showInstructions && (
                    <p
                        className='game-instruction'
                        onClick={() =>
                            setShowInstructions((prev: boolean) => !prev)
                        }>
                        Show Instructions
                    </p>
                )}
                {showInstructions && (
                    <p
                        className='game-instruction'
                        onClick={() =>
                            setShowInstructions((prev: boolean) => !prev)
                        }>
                        <span
                            style={{ fontWeight: "bold", fontSize: "0.8rem" }}>
                            Instructions: <br />
                        </span>
                        1. Players take turns placing their marks (
                        <span style={{ color: "white" }}>X</span> or{" "}
                        <span style={{ color: "white" }}>O</span>) on the grid.{" "}
                        <br />
                        2. The first player to get three marks in a row
                        (horizontally, vertically, or diagonally) wins.🥇 <br />
                        3. If all nine squares are filled and no player has
                        three in a row, the game is a draw. <br />
                        4. Have fun and good luck! 🎉
                        <br />
                    </p>
                )}
            </div>
        </section>
    );
};

export default PlayerInfo;
