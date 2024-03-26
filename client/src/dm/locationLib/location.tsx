import {LocationData} from "@types";

function Location({data}: {data: LocationData}) {

    const imageSource = "data:image/png;base64," + data.image;

    return (
        <div className={"location"}>
            <h1>{data.name}</h1>
            <img src={imageSource} alt={data.name}/>
            <button>Set as map</button>
        </div>
    );
}

export default Location;