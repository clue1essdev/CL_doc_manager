import { createItemName } from "./helpers/create-item-name";
import type { Item } from "../../stores/types";
import states from "../../stores/states";
import { observer } from "mobx-react-lite";
interface Props {
  type: string;
  item: Item;
}
const ItemConstructor = observer((props: Props) => {
  const { type, item } = props;
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
    resetPopup,
    popupShowing,
    rootFolder,
    SMALL_IMG_INDEX,
    BIG_IMG_INDEX
  } = states;
  if (type === "dir") {
    return (
      <div
        className="item clickable"
        onClick={() => resetPopup()}
        onDoubleClick={() => {
          setCurrentPath(item.path.replace("disk:/", ""));
          if (rootFolder) toggleRootFolder();
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
      const url: string = item.sizes ? item.sizes[SMALL_IMG_INDEX] ? item.sizes[SMALL_IMG_INDEX].url : "" : "";
      const urlOrigin = item.sizes ? item.sizes[BIG_IMG_INDEX].url : "";
      return (
        <div
          className="item clickable"
          onClick={() => resetPopup()}
          onDoubleClick={() => {
            setCurrentImgName(item.name);
            setCurrentImgUrl(urlOrigin);
            toggleModalShowing();
          }}
          onContextMenu={(event) => {
            event.preventDefault();
            setCurrentFile(item.name);
            if (window.innerWidth - 250 < event.clientX) {
              setPopupX(event.clientX - 250);
            } else {
              setPopupX(event.clientX);
            }
            if (window.innerHeight - 250 < event.clientY) {
              setPopupY(event.clientY - 250);
            } else {
              setPopupY(event.clientY);
            }
            if (popupShowing) {
              togglePopupShowing();
              togglePopupShowing();
            } else {
              togglePopupShowing();
            }
          }}
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

export default ItemConstructor;
