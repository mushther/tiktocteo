import './TicTacToe.css'
import React, { useState } from 'react';

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [player, setPlayer] = useState('X');
    const [winner, setWinner] = useState(null);

    const checkWinner = (board) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    };

    const handleClick = (index) => {
        if (board[index] || winner) {
            return;
        }
        const newBoard = [...board];
        newBoard[index] = player;
        setBoard(newBoard);
        const newWinner = checkWinner(newBoard);
        if (newWinner) {
            setWinner(newWinner);
        } else {
            setPlayer(player === 'X' ? 'O' : 'X');
        }
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setPlayer('X');
        setWinner(null);
    };

    const renderSquare = (index) => {
        return (
            <button className="square" onClick={() => handleClick(index)}>
                {board[index]}
            </button>
        );
    };

    const renderStatus = () => {
        if (winner) {
            return `Winner: ${winner}`;
        } else if (board.every((square) => square)) {
            return 'Tie!';
        } else {
            return `Your Symbol: ${player}`;
        }
    };

    const renderComputerButton = () => {
        if (!winner && !board.every((square) => square)) {
            return (
                <button onClick={() => handleComputerPlay()}>
                    Computer Play ({player === 'X' ? 'O' : 'X'})
                </button>
            );
        }
    };

    const handleComputerPlay = () => {
        const availableSquares = board.reduce(
            (available, square, index) => (square === null ? [...available, index] : available),
            []
        );
        const randomIndex = Math.floor(Math.random() * availableSquares.length);
        handleClick(availableSquares[randomIndex]);
    };

    return (
        <div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
            <div className="status">{renderStatus()}</div>
            <button onClick={() => resetGame()}>Reset Game</button>
            {renderComputerButton()}
        </div>
    )
}

export default TicTacToe;