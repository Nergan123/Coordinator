import "./item.css"

function Item({text}: {text: string}) {
    return (
        <div className={"item"}>
            <p>{text}</p>
        </div>
    );
}

export default Item;