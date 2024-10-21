import "./disk-manager.scss";
import { observer } from "mobx-react-lite" ;
import states from "../../stores/states";

const Popup = observer(() => {
    const { popupShowing, moveOptionSelected, popupX, popupY, currentFile, currentPath, allFoldersMeta, allFilesMeta, toggleMoveOptionSelected, togglePopupShowing, deleteFile, toggleUpdatingInterface, moveFile, resetPopup, updateFoldersDataAfterMoveOrDelete } = states;
    const moveOrDelete : {
        move: string;
        delete: string
    } = {
        move: "move",
        delete: "delete"
    }
    if (popupShowing && ! moveOptionSelected) {
        return (
            <>
                <div className="popup" style={{top: popupY, left: popupX}}>
                    <div className="popup-buttons">
                        <div className="move-btn clickable popup-button" onClick={() => {
                            toggleMoveOptionSelected();

                        }}>
                            <img className="move-delete-btn-img" src="move-to-folder-svgrepo-com.svg"></img>
                            <p className="btn-name">Move</p>
                        </div>
                        <div className="delete-btn clickable popup-button" onDoubleClick={
                                () => {
                                    if (popupShowing) togglePopupShowing();
                                    toggleUpdatingInterface();
                                    resetPopup();
                                    deleteFile(`${currentPath}/${currentFile}`).then(() => {
                                        updateFoldersDataAfterMoveOrDelete(allFilesMeta, allFoldersMeta, "", moveOrDelete.delete);
                                        toggleUpdatingInterface();
                                    });
                                }
                            }>
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
                <div className="popup" style={{top: popupY, left: popupX}}>
                    <div className="popup-buttons">
                        {allFoldersMeta.filter((item) => item.path.replace("disk:/", "") !== currentPath).map((item, index) => {
                            return (
                                <div key={index} className="clickable popup-button" onDoubleClick={() => {
                                    if (popupShowing) togglePopupShowing();
                                    resetPopup();
                                    moveFile(item.path.replace("disk:", "")).then(() => {
                                        updateFoldersDataAfterMoveOrDelete(allFilesMeta, allFoldersMeta, item.path.replace("disk:", ""), moveOrDelete.move);
                                        toggleUpdatingInterface();
                                    }
                                    )
                                }}>
                                    <img className="move-delete-btn-img" src="folder-svgrepo-com.svg"></img>
                                    <p className="btn-name">{item.name}</p>
                                </div> 
                            )
                        })} 
                    </div>
                </div>
            </>
        );
    } else return (<></>);
    
})

export default Popup;