import {LocationData} from "@types";
import LocationMap from "./locationMap";
import "./locationField.css";
import io from "socket.io-client";
import {useEffect, useState} from "react";

const socket = io("http://localhost:8001");

function LocationField({location}: {location: LocationData}) {

    const [locationState, setLocationState] = useState<LocationData>(location);

    useEffect(() => {
        socket.on("update-encounter", (location: LocationData) => {
            setLocationState(location);
        });
    }, []);

    return (
        <div className={"location-field"}>
            <LocationMap map={locationState.map} />
            <h2>{locationState.name}</h2>
            <p>{locationState.description}</p>
        </div>
    );

}

export default LocationField;