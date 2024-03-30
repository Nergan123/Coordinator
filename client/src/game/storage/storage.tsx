import "./storage.css";
import Item from "./item";

function Storage() {

  return (
      <div className={"storage"}>
          <div className={"storage-row"}>
              <Item text={"item 1"}/>
              <Item text={"item 2"}/>
              <Item text={"item 3"}/>
          </div>
          <div className={"storage-row"}>
              <Item text={"item 4"}/>
              <Item text={"item 5"}/>
              <Item text={"item 6"}/>
          </div>
          <div className={"storage-row"}>
              <Item text={"item 7"}/>
              <Item text={"item 8"}/>
              <Item text={"item 9"}/>
          </div>
      </div>
  );
}

export default Storage;