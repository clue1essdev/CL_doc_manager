import "./disk-manager.scss";
import { observer } from "mobx-react-lite" ;
import states from "../../stores/states";

const Popup = observer(() => {
    const { popupShowing, moveOptionSelected, popupX, popupY, currentFile, currentPath, rootFolder, updatingInterface, allFoldersMeta, defaultPath, toggleMoveOptionSelected, togglePopupShowing, toggleRootFolder, deleteFile, toggleUpdatingInterface, moveFile, resetPopup } = states;
    const moveToRootBtn = rootFolder
    ? <></>
    : (<div className="clickable popup-button" onDoubleClick={() => {
        moveFile(defaultPath);
        if (!updatingInterface) toggleUpdatingInterface();
        if (!rootFolder) toggleRootFolder();
        if (popupShowing) togglePopupShowing();
        resetPopup()
    }}>
        <img className="move-delete-btn-img" src="folder-svgrepo-com.svg"></img>
        <p className="btn-name">{defaultPath} (root)</p>
    </div>) 
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
                                   
                                    deleteFile(`${currentPath}/${currentFile}`);
                                    if (!updatingInterface) toggleUpdatingInterface();
                                    if (!rootFolder) toggleRootFolder();
                                    if (popupShowing) togglePopupShowing();
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
                        {moveToRootBtn}
                        {allFoldersMeta.filter((item) => item.path.replace("disk:/", "") !== currentPath).map((item, index) => {
                            return (
                                <div key={index} className="clickable popup-button" onDoubleClick={() => {
                                    moveFile(item.name);
                                    if (!updatingInterface) toggleUpdatingInterface();
                                    if (!rootFolder) toggleRootFolder();
                                    if (popupShowing) togglePopupShowing();
                                    resetPopup();
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