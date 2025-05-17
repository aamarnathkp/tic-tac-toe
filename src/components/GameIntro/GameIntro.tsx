import "./style.css";

interface GameIntroProps {
    onStart: () => void;
}

const GameIntro = ({ onStart }: GameIntroProps) => {
    return (
        <section className='welcome-container'>
            <h1 className='game-heading'>Tic Tac Toe</h1>
            <p className='welcome-message'>Welcome to the Game</p>
            <button className='start-button' onClick={onStart}>
                Start
            </button>
        </section>
    );
};

export default GameIntro;
