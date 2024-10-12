import { observer } from "mobx-react-lite";
import states from "../../stores/states";
import "./disk-manager.scss";
import { useEffect } from "react";
import Items from "./Items";


const ItemsContainer = observer(() => {
  const { folderMeta, setCurrentPath, currentPath, toggleRootFolder, rootFolder } = states;
  useEffect(() => {
    if (rootFolder) setCurrentPath("CaseLabDocuments");
  }, [rootFolder, setCurrentPath]
  )
  if ("_embedded" in folderMeta) {
    return (
      <>
        <div className="items">
          <div className="path">
              <div className="back-btn"
                onClick={() => {
                if (!rootFolder) {
                  toggleRootFolder();
                }
              }}
              >
                <img src="./left-arrow-svgrepo-com.svg" alt="back-btn" className="back-btn-img"></img>
              </div>
              <h1 className="path-name">{currentPath.split("/").join(" / ")}</h1>
            </div>
            <div className="items-container">
              <Items />
            </div>
          </div>
      </>
    );
  } else {
    return <></>;
  }
});
export default ItemsContainer;
