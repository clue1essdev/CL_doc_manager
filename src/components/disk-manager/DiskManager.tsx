import AppHeader from "../disk-manager/AppHeader";
import AppSideBar from "../disk-manager/AppSideBar/AppSideBar";
import ItemsContainer from "./ItemsСontainer";
import Modal from "../disk-manager/Modal";
import { observer } from "mobx-react-lite";
import "./disk-manager.scss";
import states from "../../stores/states";
import Popup from "./Popup";
import PendingMessage from "./PendingMessage";
import Rules from "./Rules";
const DiskManager = observer(() => {
  const {modalShowing, someErrorThatBrokeEverythingOccurred } = states;
  if (someErrorThatBrokeEverythingOccurred) {
    return <div className="error-page">
      <h1 className="fatal-error-msg">Oops! Something is broken. And I mean completely. I'm shocked too. Maybe, server died. Maybe, humanity did too. 
        Anyway, please reload the page!</h1>
    </div>
  }
  else if (modalShowing) {
    return <Modal />; }
  else {
    return (
      <>
        <div className="manager-page">
          <AppHeader />
          <AppSideBar />
          <ItemsContainer />
          <Popup />
          <PendingMessage />
          <Rules />
        </div>
      </>
    );
  }
  
});
export default DiskManager;
