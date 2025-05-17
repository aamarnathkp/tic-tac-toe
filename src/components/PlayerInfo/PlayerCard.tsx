import { useState, useCallback, useRef, useEffect } from "react";

interface PlayerCardProps {
    color?: string;
    playerCount: 1 | 2;
    name: string;
    symbol: string;
}

const PlayerCard = ({ color, playerCount, name, symbol }: PlayerCardProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(name);

    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleClick = useCallback(
        (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const action = (
                event.currentTarget.querySelector("button") as HTMLButtonElement
            ).innerText;
            if (action === "Edit") {
                setIsEditing(true);
            } else if (action === "Save") {
                setIsEditing(false);
                const playerKey = playerCount === 1 ? "player1" : "player2";
                sessionStorage.setItem(`${playerKey}`, playerName);
                sessionStorage.setItem(`${playerKey}Symbol`, symbol);
                sessionStorage.setItem(`${playerKey}Color`, color ?? "");
            }
        },
        [playerCount, playerName, symbol, color]
    );

    return (
        <form className='player-card' onSubmit={handleClick}>
            <div
                className='player-image-container'
                style={{ backgroundColor: color ?? "" }}></div>
            {isEditing ? (
                <input
                    ref={inputRef}
                    type='text'
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    maxLength={15}
                />
            ) : (
                <p style={{ textAlign: "center" }}>
                    {playerName} ({symbol})
                </p>
            )}
            <button type='submit'>{isEditing ? "Save" : "Edit"}</button>
        </form>
    );
};

export default PlayerCard;
