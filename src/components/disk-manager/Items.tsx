import { observer } from "mobx-react-lite";
import states from "../../stores/states";
import "./disk-manager.scss";
import type { Item } from "../../stores/types";
import ItemConstructor from "./ItemConstructor";

const Items = observer(() => {
    const { allFoldersMeta, currentPath } = states;
    const folders = allFoldersMeta.find(el => el.path.replace("disk:/", "") === currentPath);
    if (folders && folders._embedded) {
        return (
            <>
                {folders._embedded.items.map((item: Item, index: number) => {
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