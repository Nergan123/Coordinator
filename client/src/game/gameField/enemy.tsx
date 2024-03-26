type Props = {
    image: string
}

function Enemy({image}: Props) {
    return (
        <div className="enemy">
            <img src={`data:image/png;base64,${image}`} alt="Game"/>
        </div>
    );
}

export default Enemy;