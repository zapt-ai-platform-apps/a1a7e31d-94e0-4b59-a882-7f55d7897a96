import React from 'react';
import MazeGame from './components/MazeGame';
import { useEffect } from 'react';

export default function App() {
    // Handle keyboard events globally to prevent page scrolling with arrow keys
    useEffect(() => {
        const preventArrowScroll = (e) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
            }
        };
        
        window.addEventListener('keydown', preventArrowScroll);
        
        return () => {
            window.removeEventListener('keydown', preventArrowScroll);
        };
    }, []);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-100 to-gray-200 text-gray-800 p-4">
            <MazeGame />
            <div className="mt-4 text-xs text-gray-500">
                <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
                    Made on ZAPT
                </a>
            </div>
        </div>
    );
}