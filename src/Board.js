import React from 'react';
import {Square} from './Square.js';



export class Board extends React.Component {
    renderSquare(i) {
        let play = this.props.squares[i];
        return <Square
                    key={i} 
                    value={play.player}
                    match={play.match}
                    onClick={
                        () => this.props.onClick(i)
                    } />;
    }

    renderRow(start, end) {
        let row = [];
        for (let x=start; x<=end; x++) {
            row.push(this.renderSquare(x));
        } 
        return row;
    }

    render() {
        const width = this.props.width;
        const height = this.props.height;
        let rows = [];
        for (let y=0; y < height; y++) {
            rows.push(
                <div key={y} className="board-row">
                    {this.renderRow(y*width, (y*width)+width-1)}
                </div>
            );
        } 
        return (
            <div className="game-board">
                {rows}
            </div>
        );
    }
}