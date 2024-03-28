import {AbilityData} from "@types";

function Ability({ability}: {ability: AbilityData}) {
  return (
    <div className={"ability"}>
      <h4>{ability.name}</h4>
        <p>{ability.description}</p>
    </div>
  );
}

export default Ability;