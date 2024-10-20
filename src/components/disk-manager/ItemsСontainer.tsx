import { observer } from "mobx-react-lite";
import states from "../../stores/states";
import "./disk-manager.scss";
import { useEffect } from "react";
import Items from "./Items";



const ItemsContainer = observer(() => {
  const { setCurrentPath, currentPath, toggleRootFolder, rootFolder, popupShowing, allFoldersMeta, resetPopup } = states;
  useEffect(() => {
    if (rootFolder) setCurrentPath("");
  }, [rootFolder, setCurrentPath]
  );
  const removeCurrentFolderFromPath = (path : string) => {
    const temp : string[] = path.split("/");
    temp.pop();
    const result = temp.join("/");
    if (result === "") toggleRootFolder();
    return result;
  }

  const backBtn = rootFolder? (<></>) 
  : (<div className="back-btn clickable"
      onClick={() => {
        resetPopup();
        setCurrentPath(removeCurrentFolderFromPath(currentPath));
      }}
      >
      <img src="./left-arrow-svgrepo-com.svg" alt="back-btn" className="back-btn-img"></img>
    </div>)
  if (allFoldersMeta) {
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
              <h1 className="path-name">disk / {currentPath.split("/").join(" / ")}</h1>
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
