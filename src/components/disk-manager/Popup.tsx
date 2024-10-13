import "./disk-manager.scss";
import { observer } from "mobx-react-lite" ;
import states from "../../stores/states";

const Popup = observer(() => {
    const { popupShowing, moveOptionSelected, popupX, popupY } = states;
    if (popupShowing && ! moveOptionSelected) {
        return (
            <>
                <div className="popup" style={{top: popupY, left: popupX}}>
                    <div className="popup-buttons">
                        <div className="move-btn clickable popup-button">
                            <img className="move-delete-btn-img" src="move-to-folder-svgrepo-com.svg"></img>
                            <p className="btn-name">Move</p>
                        </div>
                        <div className="delete-btn clickable popup-button">
                            <img className="move-delete-btn-img" src="delete-2-svgrepo-com.svg"></img>
                            <p className="btn-name">Delete</p>
                        </div>
                    </div>
                </div>
            </>
        )
    } else if (popupShowing && moveOptionSelected ) {
        return (
            <>
            </>
        );
    } else return (<></>);
    
})

export default Popup;