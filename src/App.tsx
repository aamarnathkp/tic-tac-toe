import GameIntro from "./components/GameIntro/GameIntro";
import { useState } from "react";
import { PAGES } from "./constants/constants";

import "./App.css";
import type { GamePages } from "./constants/types";
import PlayerInfo from "./components/PlayerInfo/PlayerInfo";
import GameBoard from "./components/GameBoard/GameBoard";

const currentPage = sessionStorage.getItem("currentPage-ttt") as GamePages;
const initialPage = currentPage ? currentPage : PAGES[0];

function App() {
    const [currentPage, setCurrentPage] = useState<GamePages>(initialPage);

    const handlePageChange = (page: GamePages) => {
        sessionStorage.setItem("currentPage-ttt", page);
        setCurrentPage(page);
    };

    return (
        <div className='main-screen'>
            {currentPage === "GameIntro" && (
                <GameIntro onStart={() => handlePageChange("PlayerInfo")} />
            )}
            {currentPage === "PlayerInfo" && (
                <PlayerInfo onStart={() => handlePageChange("GameBoard")} />
            )}
            {currentPage === "GameBoard" && <GameBoard />}
        </div>
    );
}

export default App;
