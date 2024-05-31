import {useEffect, useState} from "react";
import Location from "./location";
import {LocationData} from "@types";
import "./locationsLib.css";

function LocationsLib({encounter, setEncounter}: {encounter: any, setEncounter: any}) {
    const [locations, setLocations] = useState<LocationData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/locations',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            const data = await response.json();
            setLocations(data);
        };
        fetchData().then(r => console.log('Locations fetched ' + r));
    }, []);

    return (
        <div className={"locations-lib"}>
            <ul>
                {locations.map((location, index) => (
                    <li key={index}><Location data={location} encounter={encounter} setEncounter={setEncounter}/></li>
                ))}
            </ul>
        </div>
    );
}

export default LocationsLib;