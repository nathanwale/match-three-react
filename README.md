# Match 3 in React

This project is an extension of React's Tic Tac Toe tutorial.

It's now on a 10 * 5 board by default.

Includes history and undo.

## State
### `player`
The current player as either `'X'` or `'O'`. (This character is printed directly on the board).

### `winner`
The winner when the game is over as either `X` of `O`. Otherwise is `null`.

### `finished`
`true` if game is finished, otherwise `false`.

### `board`
An array representing each square of the board as `{player, match}`. `board.player` is the player who played on that square, `board.match` is `true` if the play resulted in a 3-in-a-row match.

### `score`: `{x, y}`
The current score of each player.

### `history`
An array that's appended to after each turn with 

```
{
    board: // the state of the board at the time
    square: // index of square that was played
    player: // the player that made the turn
    score: // the score at the time
}
```

## Elements

### `<Board>`

```
<Board
    width=10
    height=5
    squares=[...]
    onClick={(i) => ...} />
```
**The board of play.**

`width` is the width of the board in number of squares.

`height` is the height of the board in number of squares.

`squares` is the current `state.board` (see definition above).

`onClick` is a closure to handle squares being clicked. The index of the square is passed to it.

### `<ScoreBoard>`

```
<ScoreBoard
    score={this.state.score}
    currentPlayer={this.state.player} />
```

**The scoreboard**

`score` is the score of each player as defined in **State**.

`currentPlayer` is the current player as defined in **State**. This is used to visually indicate which player has their turn next.

### `<GameMenu>`
```
<GameMenu 
    reset={()}
    undo={()} />
``` 

**Displays a list of actions related to the game**

`reset` is a closure to reset the game to a blank state. Takes no parameters.

`undo` is a closure to undo the last action of the game. Takes no parameters.

### `<GameHistory>`
```
<GameHistory
    history=[...]
    entries="10" />
```
**Displays an abbreviated history of the game**

`history` is the history of the game as defined in **State**.

`entries` is the number of entries to show. Eg. `entries=10` will show the last ten plays of the game.