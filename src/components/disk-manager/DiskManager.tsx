import AppHeader from "../disk-manager/AppHeader";
import AppSideBar from "../disk-manager/AppSideBar/AppSideBar";
import ItemsContainer from "./ItemsСontainer";
import Modal from "../disk-manager/Modal";
import { observer } from "mobx-react-lite";
import "./disk-manager.scss";
import states from "../../stores/states";
const DiskManager = observer(() => {
  const {modalShowing} = states;
  if (modalShowing) {
    return <Modal />;
  } else {
    return (
      <>
        <div className="manager-page">
          <AppHeader />
          <AppSideBar />
          <ItemsContainer />
        </div>
      </>
    );
  }
  
});
export default DiskManager;
