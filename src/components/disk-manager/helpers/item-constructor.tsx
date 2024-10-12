import { createItemName } from "./create-item-name";
import type { Item } from "../../../stores/types";
import type { Size } from "../../../stores/types";
import states from "../../../stores/states";

export function constructItem(type: string, item: Item) {
  const { toggleModalShowing, setCurrentImgName, setCurrentImgUrl, fetchFolderData, setCurrentPath, toggleRootFolder } = states;
  if (type === "dir") {
    return (
      <div className="item clickable"
        onDoubleClick={() => {
          setCurrentPath(item.path.replace("disk:/", ""));
          fetchFolderData("up");
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
}
