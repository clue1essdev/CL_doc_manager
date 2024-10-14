import { observer } from "mobx-react-lite";
import states from "../../stores/states";

const Modal = observer(() => {
  const {
    modalShowing,
    toggleModalShowing,
    currentImgUrl,
    currentImgName,
    setCurrentImgName,
    setCurrentImgUrl,
  } = states;
  if (modalShowing) {
    return (
      <>
        <div className="modal">
          <div
            className="close-modal-btn"
            onClick={() => {
              toggleModalShowing();
              setCurrentImgName("");
              setCurrentImgUrl("");
            }}
          >
            <img src="./cross-svgrepo-com.svg" className="close-btn-img"></img>
          </div>
          <img className="modal-img" alt={currentImgName} src={currentImgUrl} />
        </div>
      </>
    );
  } else {
    return <></>;
  }
});
export default Modal;
