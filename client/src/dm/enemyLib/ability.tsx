import {AbilityData} from "@types";

function Ability({ ability }: { ability: AbilityData }) {
  return (
    <div>
      <h3>{ability.name}</h3>
      <p>{ability.description}</p>
    </div>
  );
}

export default Ability;