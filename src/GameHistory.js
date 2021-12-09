export function GameHistory(props) {
    let entries = parseInt(props.entries);
    let history = props.history.slice();
    history.reverse();
    let cropped_history = history.slice(0, entries);
    let history_list = cropped_history.map((play, index) => {
        let text = `${play.player} played square ${play.square}`;
        let className = (index === 0) ? "latest" : "";
        return <li key={play.square} className={className}>{text}</li>
    });
    let more_indicator = (history.length > entries) ? "..." : "";
    return (
        <div className="history">
            <h2>History</h2>
            <ol reversed start={history.length}>
                { history_list }
            </ol>
            { more_indicator }
        </div>
    );
}