import React from 'react';

export function GameMenu(props) {
    return (
        <div className='game-menu'>
            <button onClick={props.reset}>
                Reset game
            </button>
            <button onClick={() => props.undo()}>
                Undo
            </button>
        </div>
    );
}