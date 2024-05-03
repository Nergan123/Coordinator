import {LocationData} from "@types";
import LocationMap from "./locationMap";
import "./locationField.css";
import {useContext, useEffect, useState} from "react";
import {SocketContext} from "../../utils/socketContext";

function LocationField({location}: {location: LocationData}) {

    const [locationState, setLocationState] = useState<LocationData>(location);
    const socket = useContext(SocketContext);

    useEffect(() => {
        socket.on("update-encounter", (location: LocationData) => {
            setLocationState(location);
        });

        return () => {
            socket.off("update-encounter");
        };
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