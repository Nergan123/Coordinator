import {LocationData} from "@types";
import './gameField.css';

function GameField({location}: {location: LocationData}) {

    const sourceImage = `data:image/jpeg;base64,${location.image}`;

    return (
        <div className="game-field">
            <img src={sourceImage} alt={location.name} className="gameImage"/>
        </div>
    );
}

export default GameField;