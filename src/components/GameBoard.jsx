// GameBoard.js
import React from "react";
import { useGame } from "../context/GameContext";
import Square from "./Square";


const GameBoard = () => {
    const { state, dispatch } = useGame();
    
    const handleSquareClick = (index) => {
        dispatch({ type: "MAKE_MOVE", index });
    };

    return (
        <div>
            <h2>Turno del jugador: {state.currentPlayer}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 100px)", gap: "5px" }}>
                {state.board.map((value, index) => (
                    <Square
                        key={index} 
                        value={value} 
                        onClick={() => handleSquareClick(index)} 
                    />
                ))}
            </div>
            {state.winner && <h2>¡{state.winner} gana el juego!</h2>}
            <button onClick={() => dispatch({ type: "RESET" })}>Reiniciar Juego</button>
        </div>
    );
};

export default GameBoard;
