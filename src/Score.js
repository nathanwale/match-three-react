export function ScoreBoard(props) {
    let labelClass = (player) => {
        let isCurrent = (player === props.currentPlayer) ? " current" : "";
        return `label-${player.toLowerCase()} ${isCurrent}`;
    }
    return (
        <div className="scores">
            <strong className={labelClass("X")}>X</strong> 
            <span className='score-x'>{props.score.x}</span>
            <span className='score-o'>{props.score.o}</span>
            <strong className={labelClass("O")}>O</strong>
        </div>
    )
}
