import { observer } from "mobx-react-lite";
import states from "../../../stores/states";
import "./side-bar.scss";
import "../disk-manager.scss";
import type { Item } from "../../../stores/types";
const Categories = observer(() => {
  const { allFoldersMeta, showCategories, rootFolder, setCurrentPath, toggleRootFolder } = states;
  if (showCategories) {
    return (
      <>
        <div  className="category clickable root"
                onDoubleClick={() => {
                  if (!rootFolder) {
                    setCurrentPath("");
                    toggleRootFolder();
                  }

                }}>
                <img
                  className="mini-svg-folder"
                  src="/folder-svgrepo-com.svg"
                ></img>
                <p className="folder-name">Back to root folder</p>
              </div>
        {
        allFoldersMeta.map((item: Item, index: number) => {
          if (item.type === "dir") {
            return (
              <div key={index} className="category clickable"
                onDoubleClick={() => {
                    setCurrentPath(item.path.replace("disk:/", ""));
                    if (rootFolder) toggleRootFolder();
                }}>
                <img
                  className="mini-svg-folder"
                  src="/folder-svgrepo-com.svg"
                ></img>
                <p className="folder-name">{item.name}</p>
              </div>
            );
          }
        })}
      </>
    );
  } else {
    return <></>;
  }
});

export default Categories;
