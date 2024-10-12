import { observer } from "mobx-react-lite";
import states from "../../stores/states";
import "./disk-manager.scss";
import type { Item } from "../../stores/types";
import { constructItem } from "./helpers";

const ItemsContainer = observer(() => {
  const { folderMeta, setCurrentPath, fetchFolderData, currentPath, toggleRootFolder, rootFolder } = states;

  if ("_embedded" in folderMeta) {
    return (
      <>
        <div className="items">
          <div className="path">
              <div className="back-btn"
                onClick={() => {
                if (!rootFolder) {
                  setCurrentPath("");
                  fetchFolderData("");
                  toggleRootFolder();
                }
              }}
              >
                <img src="./left-arrow-svgrepo-com.svg" alt="back-btn" className="back-btn-img"></img>
              </div>
              <h1 className="path-name">{currentPath.split("/").join(" / ")}</h1>
            </div>
            <div className="items-container">
              {folderMeta._embedded.items.map((item: Item, index: number) => {
                return (
                  <div className="item-container" key={index}>
                    {constructItem(item.type, item)}
                  </div>
                );
              })}
            </div>
          </div>
      </>
    );
  } else {
    return <></>;
  }
});
export default ItemsContainer;
