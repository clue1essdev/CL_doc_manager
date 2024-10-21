import { observer } from "mobx-react-lite";
import states from "../../stores/states";
import "./disk-manager.scss";

const PendingMessage = observer(() => {
    const {updatingInterface, fileExistsError} = states;
    if (updatingInterface && !fileExistsError) {
        return (<>
        <div className="do-nothing">
            <div className="updating-msg-container">
                <h1 className="updating-msg">Wait, updating data...</h1>
            </div>
        </div></>);
    } else if (fileExistsError) {
        return (
        <div className="do-nothing">
            <div className="updating-msg-container">
                <h1 className="updating-msg">
                    Oops, seems like the file with the same name already exists in the folder.
                    Delete one of the files with matching names to move one of them to the desired folder.
                </h1>
            </div>
        </div>);
    } else return (<></>);
})

export default PendingMessage