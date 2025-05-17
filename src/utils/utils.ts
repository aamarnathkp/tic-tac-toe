import {
    PLAYER_ONE_NAME,
    PLAYER_TWO_NAME,
    WINNING_COMBINATIONS,
} from "../constants/constants";

export const checkForWinner = (
    board: string[][],
    playerSymbol: string
): boolean => {
    let isWinner = false;
    for (const combination of WINNING_COMBINATIONS) {
        const [a, b, c] = combination;
        if (
            board[a.row][a.col] === playerSymbol &&
            board[b.row][b.col] === playerSymbol &&
            board[c.row][c.col] === playerSymbol
        ) {
            isWinner = true;
            break;
        }
    }

    return isWinner;
};

export const checkForDraw = (board: string[][]): boolean => {
    return board.every((row) => row.every((cell) => cell !== ""));
};

export const checkGameOver = (
    scoreboard: Record<string, { life: number }>
): boolean => {
    return scoreboard["X"].life <= 0 || scoreboard["O"].life <= 0;
};

export const getPlayerName = (symbol: string): string => {
    return symbol === "X"
        ? sessionStorage.getItem("player1") || PLAYER_ONE_NAME
        : sessionStorage.getItem("player2") || PLAYER_TWO_NAME;
};

export const resetSessionStorage = () => {
    sessionStorage.setItem("currentPage-ttt", "GameIntro");
    sessionStorage.removeItem("player1");
    sessionStorage.removeItem("player1Color");
    sessionStorage.removeItem("player1Symbol");
    sessionStorage.removeItem("player2");
    sessionStorage.removeItem("player2color");
    sessionStorage.removeItem("player2Symbol");
    window.location.reload();
};

export const resetSessionStorageAndReload = () => {
    resetSessionStorage();
    window.location.reload();
};
