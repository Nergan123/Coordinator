import {LocationData} from "@types";
import LocationMap from "./locationMap";
import "./locationField.css";

function LocationField({location}: {location: LocationData}) {

    return (
        <div className={"location-field"}>
            <LocationMap map={location.map} />
            <h2>{location.name}</h2>
            <p>{location.description}</p>
        </div>
    );

}

export default LocationField;