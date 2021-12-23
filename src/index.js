import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Info } from './Info.js';
import { Footer } from './Footer.js';
import { Board } from './Board.js';
import { ScoreBoard } from './Score.js';
import { GameMenu } from './GameMenu.js';
import { GameHistory } from './GameHistory.js';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.width = 10;
        this.height = 5;
        this.state = this.initState();
    }

    nextPlayer() {
        let player = (this.state.player === 'O') ? 'X' : 'O';
        this.setState({ player: player })
    }

    initState() {
        const squareCount = this.width * this.height;
        // Array.fill(..) will cause all contents to be refs to the 
        // same object, so we do map.
        let board = Array(squareCount).fill(0).map(
            (_) => 
            ({
                player: null,
                match: false,
            })
        );
        return {
            player: 'X',
            winner: null,
            finished: false,
            history: [],
            board: board,
            score: {
                x: 0,
                o: 0,
            }
        }
    }

    isFinished() {
        return this.state.board.every((e) => e !== null);
    }

    addHistory(squareIndex, player) {
        let history = this.state.history.slice();
        let board = this.state.board.map(
            (play) => Object.assign({}, play));
        history.push({
            board: board,
            square: squareIndex,
            player: player,
            score: this.state.score,
        });
        this.setState({ history: history });
        
    }

    undo() {
        console.log(this.state.history)
        if (this.state.history.length === 1) {
            this.reset();
        } else if (this.state.history.length > 1) {
            let history = this.state.history.slice();
            history.pop();
            let new_state = history[history.length-1];
            this.setState({
                history: history,
                board: new_state.board,
                score: new_state.score,
            });
            this.nextPlayer();
        }
    }

    getRelativeIndex(originI, offsetX, offsetY) {
        let originX = originI % this.width;
        let originY = Math.floor(originI / this.width);
        let x = originX + offsetX;
        let y = originY + offsetY;
        return this.getIndex(x, y);
    }

    getIndex(x, y) {
        let in_bounds = 
            (x < this.width) 
            && (y < this.height)
            && (x >= 0)
            && (y >= 0);

        if (in_bounds) {
            let i = y * this.width + x;
            return i;
        } else {
            return null;
        }
    }

    findMatch(i, player) {
        let offsets = [
            // rows
            [[-2, 0], [-1, 0]],
            [[-1, 0], [+1, 0]],
            [[+1, 0], [+2, 0]],
            // columns
            [[0, -2], [0, -1]],
            [[0, -1], [0, +1]],
            [[0, +1], [0, +2]],
            // diagonals [\]
            [[-2, -2], [-1, -1]],
            [[-1, -1], [+1, +1]],
            [[+1, +1], [+2, +2]],
            // diagonals [/]
            [[+2, -2], [+1, -1]],
            [[+1, -1], [-1, +1]],
            [[-1, +1], [-2, +2]],
        ]
        for (let offset of offsets) {
            let indexes = offset.map(
                (pos) => {
                    return this.getRelativeIndex(i, pos[0], pos[1]);
                });
           // console.log("Indexes:", indexes);
            let all_match = indexes.every((j) => {
                if (j == null) return false;
                let play = this.state.board[j];
                //console.log(play, j);
                return (play.player === player);
            });
            //console.log(all_match, indexes, player);
            if (all_match) {
                return indexes;
            }
        }
        return null;
    }

    clicked(i) {
        var player = this.state.player;
        if (this.state.board[i].player === null) {
            let board = this.state.board.slice();
            this.nextPlayer();
            board[i].player = player;
            let match = this.findMatch(i, player);
            console.log(match);
            if (match != null) {
                let score = this.state.score;
                score[player.toLowerCase()]++
                this.setState({score: score});
                board[i].match = true;
                for (let j of match) {
                    board[j].match = true;
                }
            }
            this.setState({ board: board });
            this.addHistory(i, player);
        }
    }

    reset() {
        this.setState(this.initState())
    }

    render() {
        return (
            <div className="game">
                <ScoreBoard
                    score={this.state.score}
                    currentPlayer={this.state.player} />
                <Board
                    width={this.width}
                    height={this.height}
                    squares={this.state.board}
                    onClick={(i) => this.clicked(i)} />
                <GameMenu 
                    reset={this.reset.bind(this)}
                    undo={this.undo.bind(this)} />
                <GameHistory
                    history={this.state.history}
                    entries="10" />
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <main>
        <Info />
        <Game />
        <Footer />
    </main>,
    document.getElementById('root')
);

