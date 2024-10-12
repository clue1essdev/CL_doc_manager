import { observer } from "mobx-react-lite";
import states from "../../../stores/states";
import "./side-bar.scss";
import "../disk-manager.scss";
import type { Item } from "../../../stores/types";
import type { Size } from "../../../stores/types";
const AllFiles = observer(() => {
  const { showAllFiles, allFilesMeta, setCurrentImgName, setCurrentImgUrl, toggleModalShowing } = states;
  const findUrl = (item : Item) => {
    let urlOrigin: string = "";
    const indexOrigin: number = item.sizes
      ? item.sizes.findIndex((el: Size) => el.name === "ORIGINAL")
      : -1;
    if (indexOrigin !== -1)
      urlOrigin = item.sizes ? item.sizes[indexOrigin].url : "";
    return urlOrigin;
  }
  if (showAllFiles) {
    return (
      <>
        {allFilesMeta.items.filter((item : Item) => item.media_type === "image").map((item : Item, index : number) => {
          return (
            <div key={index} className="file clickable" 
            onDoubleClick={() => {
                      setCurrentImgName(item.name);
                      setCurrentImgUrl(findUrl(item));
                      toggleModalShowing();
                    }}
            >
              <div className="file-preview">file</div>
              <p className="folder-name">{item.name}</p>
            </div>
          );
        })}
      </>
    );
  } else {
    return <></>;
  }
});

export default AllFiles;
