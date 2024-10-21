import { observer } from "mobx-react-lite";
import states from "../../stores/states";
import "./disk-manager.scss";
import type { Item } from "../../stores/types";
import ItemConstructor from "./ItemConstructor";

const Items = observer(() => {
    const { allFoldersMeta, currentPath } = states;
    const folders = allFoldersMeta.find(el => el.path.replace("disk:/", "") === currentPath);
    const sortingPattern = (a : Item, b : Item) => {
        if (a.type === "dir" && b.type === "dir") {
            if (a.name > b.name) return 2;
            else if (a.name < b.name) return -1;
            else return 0;
        } else {
            if (a.type === "dir" && b.type !== "dir") return -1;
            else if (a.type !== "dir" && b.type === "dir") return 1;
            else {
                return a.name.localeCompare(b.name);
            }
        } 
    }
    if (folders && folders._embedded) {
        return (
            <>
                {folders._embedded.items.slice().sort(sortingPattern).map((item: Item, index: number) => {
                    return (
                    <div className="item-container" key={index}>
                        <ItemConstructor 
                        type = {item.type} 
                        item = {item} />
                    </div>
                    );
                })} 
            </>
        )
    } else {
        return <></>
    }



    

});

export default Items;