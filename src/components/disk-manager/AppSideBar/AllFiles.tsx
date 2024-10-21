import { observer } from "mobx-react-lite";
import states from "../../../stores/states";
import "./side-bar.scss";
import "../disk-manager.scss";
import type { Item } from "../../../stores/types";
const AllFiles = observer(() => {
  const { showAllFiles, allFilesMeta, BIG_IMG_INDEX, SMALL_IMG_INDEX, setCurrentImgName, setCurrentImgUrl, toggleModalShowing } = states;
  if (showAllFiles) {
    return (
      <>
        {allFilesMeta.items.filter((item : Item) => item.media_type === "image").sort((a, b) => {
          const textA = a.name.toLocaleUpperCase();
          const textB = b.name.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        }).map((item : Item, index : number) => {
          return (
            <div key={index} className="file clickable" 
            onDoubleClick={() => {
                      setCurrentImgName(item.name);
                      setCurrentImgUrl(item.sizes? item.sizes[BIG_IMG_INDEX].url : "");
                      toggleModalShowing();
                    }}
            >
              <p className="file-number">{index + 1}.</p>
              <div className="file-preview" style={{backgroundImage: `url(${item.sizes? item.sizes[SMALL_IMG_INDEX].url : ""})`}}></div>
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
