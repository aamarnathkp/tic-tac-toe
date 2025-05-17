import type { PLAYER_ONE_SYMBOL, PLAYER_TWO_SYMBOL } from "./constants";

export type GamePages =
    | "GameIntro"
    | "PlayerInfo"
    | "GameBoard"
    | "ScoreBoard"
    | "GamePlay";

export type PlayerSymbol = typeof PLAYER_ONE_SYMBOL | typeof PLAYER_TWO_SYMBOL;

export type Scoreboard = {
    [key: string]: {
        won: number;
        loss: number;
        life: number;
    };
};

export interface GameState {
    currentPlayer: string | null;
    scoreboard: Array<{ player: string; score: number }>;
    gameboard: string[][];
}
