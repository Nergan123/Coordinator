import "./storage.css";
import Item from "./item";
import {ItemData} from "@types";

function Storage({items}: {items: {[key: string]: ItemData}}) {

  return (
      <div className={"storage"}>
          <div className={"storage-row"}>
              <Item item={items[1]}/>
              <Item item={items[2]}/>
              <Item item={items[3]}/>
          </div>
          <div className={"storage-row"}>
              <Item item={items[4]}/>
              <Item item={items[5]}/>
              <Item item={items[6]}/>
          </div>
          <div className={"storage-row"}>
              <Item item={items[7]}/>
              <Item item={items[8]}/>
              <Item item={items[9]}/>
          </div>
      </div>
  );
}

export default Storage;