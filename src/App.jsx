// App.js
import React from "react";
import { GameProvider } from "../src/context/GameContext";
import GameBoard from "../src/components/GameBoard";

function App() {
    return (
        <GameProvider>
            <div>
                <h1>Juego de Triqui (Tic-Tac-Toe)</h1>
                <GameBoard />
            </div>
        </GameProvider>
    );
}

export default App;
