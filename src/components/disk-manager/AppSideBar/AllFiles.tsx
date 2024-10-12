import { observer } from "mobx-react-lite";
import states from "../../../stores/states";
import "./side-bar.scss";
import "../disk-manager.scss";
import type { Item } from "../../../stores/types";
const AllFiles = observer(() => {
  const { showAllFiles, allFilesMeta } = states;
  if (showAllFiles) {
    return (
      <>
        {allFilesMeta.items.map((item : Item, index : number) => {
          return (
            <div key={index} className="file">
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
