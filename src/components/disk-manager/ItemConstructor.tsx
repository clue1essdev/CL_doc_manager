import { createItemName } from "./helpers/create-item-name";
import type { Size } from "../../stores/types";
import states from "../../stores/states";
import { observer } from "mobx-react-lite";

const ItemConstructor = observer (({ type, item }) => {
  const {
    toggleModalShowing,
    setCurrentImgName,
    setCurrentImgUrl,
    setCurrentPath,
    toggleRootFolder,
    togglePopupShowing,
    setPopupX,
    setPopupY,
    setCurrentFile,
    popupShowing,
    currentFile
    
  } = states;
  if (type === "dir") {
    return (
      <div
        className="item clickable"
        onDoubleClick={() => {
          setCurrentPath(item.path.replace("disk:/", ""));
          toggleRootFolder();
        }}
      >
        <div className="img-container">
          <img className="svg-folder" src="/folder-svgrepo-com.svg"></img>
        </div>
        <p className="item-name">{createItemName(item.name)}</p>
      </div>
    );
  } else if (type === "file") {
    if (item.media_type === "image") {
      let url: string = "";
      let urlOrigin: string = "";
      const indexS: number = item.sizes
        ? item.sizes.findIndex((el: Size) => el.name === "S")
        : -1;
      if (indexS !== -1) url = item.sizes ? item.sizes[indexS].url : "";
      const indexOrigin: number = item.sizes
        ? item.sizes.findIndex((el: Size) => el.name === "ORIGINAL")
        : -1;
      if (indexOrigin !== -1)
        urlOrigin = item.sizes ? item.sizes[indexOrigin].url : "";
      return (
        <div
          className="item clickable"
          onDoubleClick={() => {
            setCurrentImgName(item.name);
            setCurrentImgUrl(urlOrigin);
            toggleModalShowing();
          }}
          onContextMenu={(event : Event) => {
            event.preventDefault();
            setCurrentFile(item.name);
            if (window.innerWidth - 180 < event.clientX) {
              setPopupX(event.clientX - 180);
            } else {
              setPopupX(event.clientX);
            }
            if (window.innerHeight - 100 < event.clientY) {
              setPopupY(event.clientY - 100);
            } else {
              setPopupY(event.clientY);
            }
            if (popupShowing) {
              togglePopupShowing();
              togglePopupShowing();
            } else {
              togglePopupShowing();
            }

          }
          }
        >
          <div
            className="img-container"
            style={{
              backgroundImage: `url(${url})`,
            }}
          ></div>
          <p className="item-name">{createItemName(item.name)}</p>
        </div>
      );
    } else {
      return (
        <div className="item">
          <div className="img-container">
            <div className="unknown-extension">
              <p className="description">Unknown file extension</p>
            </div>
          </div>
          <p className="item-name">{createItemName(item.name)}</p>
        </div>
      );
    }
  } else {
    return (
      <>
        <p>Unkown data type</p>
        <p>{item.name}</p>
      </>
    );
  }
});


export default ItemConstructor