import { observer } from "mobx-react-lite";
import states from "../../stores/states";
import "./disk-manager.scss";
import type { Item } from "../../stores/types";
import ItemConstructor from "./ItemConstructor";

const Items = observer(() => {
    const {rootFolder, allFoldersMeta, folderMeta, currentPath} = states;
    if (rootFolder && "_embedded" in folderMeta) {
        return (
            <>
                {
                folderMeta._embedded.items.map((item: Item, index: number) => {
                    return (
                    <div className="item-container" key={index}>
                        <ItemConstructor 
                        type = {item.type} 
                        item = {item} />
                    </div>
                    );
                })}        
            </>)
    } else if (!rootFolder) {
        return (
            <>
                {allFoldersMeta.find(el => el.name === currentPath.replace("CaseLabDocuments/", ""))._embedded.items.map((item: Item, index: number) => {
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
    }



    

});

export default Items;