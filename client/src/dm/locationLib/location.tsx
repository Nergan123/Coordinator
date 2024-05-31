import {LocationData} from "@types";

function Location({data, encounter, setEncounter}: {data: LocationData, encounter: any, setEncounter: any}) {

    const imageSource = data.image;

    function setAsMap() {
        const newEncounter = {
            ...encounter,
            location: data,
        }
        setEncounter(newEncounter);
    }

    return (
        <div className={"location"}>
            <h1>{data.name}</h1>
            <img src={imageSource} alt={data.name}/>
            <button onClick={setAsMap}>Set as map</button>
        </div>
    );
}

export default Location;