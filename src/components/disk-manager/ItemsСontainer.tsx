import { observer } from "mobx-react-lite";
import states from "../../stores/states";
import "./disk-manager.scss";
import { useEffect } from "react";
import Items from "./Items";



const ItemsContainer = observer(() => {
  const { folderMeta, setCurrentPath, currentPath, toggleRootFolder, rootFolder, popupShowing, resetPopup } = states;
  useEffect(() => {
    if (rootFolder) setCurrentPath("CaseLabDocuments");
  }, [rootFolder, setCurrentPath]
  );
  const backBtn = rootFolder? (<></>) 
  : (<div className="back-btn clickable"
      onClick={() => {
        resetPopup();
        toggleRootFolder();
      }}
      >
      <img src="./left-arrow-svgrepo-com.svg" alt="back-btn" className="back-btn-img"></img>
    </div>)
  if ("_embedded" in folderMeta) {
    return (
      <>
        <div className="items">
          <div className="area-to-click" onClick={() => {
            if (popupShowing) {
              resetPopup();
            }
          }}></div>
          <div className="path">
              {backBtn}
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
