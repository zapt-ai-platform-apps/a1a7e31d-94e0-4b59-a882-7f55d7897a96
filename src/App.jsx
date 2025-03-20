import React from 'react';
import MazeGame from './components/MazeGame';

export default function App() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-800">
            <MazeGame />
            <div className="mt-4 text-xs text-gray-500">
                <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer">
                    Made on ZAPT
                </a>
            </div>
        </div>
    );
}