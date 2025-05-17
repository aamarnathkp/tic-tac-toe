import type { GameState } from "./types";

export const PAGES = [
    "GameIntro",
    "PlayerInfo",
    "GameBoard",
    "ScoreBoard",
    "GamePlay",
] as const;

export const PLAYER_ONE_COLOR = "rgba(4, 161, 140, 0.64)";
export const PLAYER_TWO_COLOR = "rgba(4, 109, 161, 0.64)";
export const PLAYER_ONE_SYMBOL = "X";
export const PLAYER_TWO_SYMBOL = "O";
export const PLAYER_ONE_NAME = "Player One";
export const PLAYER_TWO_NAME = "Player Two";

export const INITIAL_GAME_STATE = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
];

export const WINNING_COMBINATIONS = [
    [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: 2 },
    ],
    [
        { row: 1, col: 0 },
        { row: 1, col: 1 },
        { row: 1, col: 2 },
    ],

    [
        { row: 2, col: 0 },
        { row: 2, col: 1 },
        { row: 2, col: 2 },
    ],

    [
        { row: 0, col: 0 },
        { row: 1, col: 0 },
        { row: 2, col: 0 },
    ],
    [
        { row: 0, col: 1 },
        { row: 1, col: 1 },
        { row: 2, col: 1 },
    ],
    [
        { row: 0, col: 2 },
        { row: 1, col: 2 },
        { row: 2, col: 2 },
    ],

    [
        { row: 0, col: 0 },
        { row: 1, col: 1 },
        { row: 2, col: 2 },
    ],
    [
        { row: 0, col: 2 },
        { row: 1, col: 1 },
        { row: 2, col: 0 },
    ],
];

export const defaultGameState: GameState = {
    currentPlayer: null,
    scoreboard: [],
    gameboard: INITIAL_GAME_STATE,
};
