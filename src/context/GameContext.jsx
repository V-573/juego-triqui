// GameContext.js
import React, { createContext, useContext, useReducer } from "react";

// 1. Crear el contexto
const GameContext = createContext();

const initialState = {
    board: Array(9).fill(null),
    currentPlayer: Math.random() < 0.5 ? 'X' : 'O', // Iniciar con un jugador aleatorio
    winner: null,
};

// 2. Crear las acciones del juego
const gameReducer = (state, action) => {
    switch (action.type) {
        case 'MAKE_MOVE':
            if (state.winner || state.board[action.index]) return state; // aca se verifica si hay ganador o si state.board[ existe X o O], eso indica que el espacio seleccionado ya tiene un valor, si existe algo entonces retorna  state y no hace mas 
          // si lo anterior no ocurre entonces:
            const newBoard = state.board.slice();
            newBoard[action.index] = state.currentPlayer;
            return {
                ...state,
                board: newBoard,
                currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X',
                winner: calculateWinner(newBoard),
            };


        case 'RESET':
            return initialState;

            
        default:
            return state;
    }
};

const calculateWinner = (board) => {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontales
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticales
        [0, 4, 8], [2, 4, 6]             // Diagonales
    ];
    for (let [a, b, c] of winningCombinations) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
};

// 3. Proveedor del contexto del juego
export const GameProvider = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
};

// 4. Hook para acceder al contexto
export const useGame = () => useContext(GameContext);
