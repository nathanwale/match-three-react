import React from 'react';

export function Square(props) {
    let className = `square player-${props.value}${props.match ? " match-"+props.value : ""}`
    return (
        <button 
            className={className}
            onClick={ 
                () => props.onClick()
            }>
            { props.value }
        </button>
    );
}