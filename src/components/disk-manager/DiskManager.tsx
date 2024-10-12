import AppHeader from "../disk-manager/AppHeader";
import AppSideBar from "../disk-manager/AppSideBar/AppSideBar";
import ItemsContainer from "../disk-manager/Items-container";
import Modal from "../disk-manager/Modal";
import { observer } from "mobx-react-lite";
import "./disk-manager.scss";
const DiskManager = observer(() => {
  return (
    <>
      <Modal />
      <div className="manager-page">
        <AppHeader />
        <AppSideBar />
        <ItemsContainer />
      </div>
    </>
  );
});
export default DiskManager;
