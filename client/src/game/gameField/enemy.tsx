type Props = {
    image: string
}

function Enemy({image}: Props) {
    return (
        <div className="enemy">
            <img src={image} alt="Game"/>
        </div>
    );
}

export default Enemy;