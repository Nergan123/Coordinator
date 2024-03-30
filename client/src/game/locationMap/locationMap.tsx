import {useState} from "react";
import "./locationMap.css";

function LocationMap({map}: {map: string}) {

    const [isMapOpen, setIsMapOpen] = useState(false);
    const sourceImage = `data:image/jpeg;base64,${map}`;

    function handleClick() {
        setIsMapOpen(!isMapOpen);
    }

    const styleNotOpen = {
        zIndex: 1
    }

    const styleOpen = {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 2,
        height: "100%"
    }

    const styleImageOpen = {
        height: "100%",
        borderRadius: "10px"
    }

    const styleImageNotOpen = {
        width: "100%",
        borderRadius: "10px"
    }

    function getStyleImage() {
        return isMapOpen ? styleImageOpen : styleImageNotOpen;
    }

    function getStyle() {
        console.log(isMapOpen);
        return isMapOpen ? styleOpen : styleNotOpen;
    }

    return(
        <div className={"location-map"} onClick={handleClick} style={getStyle()}>
            <img src={sourceImage} alt="Map" style={getStyleImage()}/>
        </div>
    );
}

export default LocationMap;