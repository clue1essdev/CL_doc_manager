import { observer } from "mobx-react-lite";
import states from "../../../stores/states";
import "./side-bar.scss";
import "../disk-manager.scss";
import Categories from "./Categories";
import AllFiles from "./AllFiles";
const AppSideBar = observer(() => {
  const {
    toggleShowCategories,
    showAllFiles,
    toggleshowAllFiles,
    showCategories,
  } = states;
  return (
    <>
      <aside className="nav-bar">
        <section className="folders">
          <div className="categories-header">
            <h1 className="title">Categories</h1>
            <button className="show-btn" onClick={toggleShowCategories}>
              <img
                className="show-btn-img"
                src="./arrow.svg"
                alt="show-categories-btn"
                style={
                  showCategories
                    ? { transform: "rotate(90deg)" }
                    : { transform: "rotate(180deg)" }
                }
              />
            </button>
          </div>
          <Categories />
        </section>
        <section className="all-files">
          <div className="categories-header">
            <h1 className="title">All documents</h1>
            <button className="show-btn" onClick={toggleshowAllFiles}>
              <img
                className="show-btn-img"
                src="./arrow.svg"
                alt="show-categories-btn"
                style={
                  showAllFiles
                    ? { transform: "rotate(90deg)" }
                    : { transform: "rotate(180deg)" }
                }
              />
            </button>
          </div>
          <AllFiles />
        </section>
      </aside>
    </>
  );
});

export default AppSideBar;
