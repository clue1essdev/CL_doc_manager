import { observer } from "mobx-react-lite";
import states from "../../stores/states";
import "./disk-manager.scss";

const PendingMessage = observer(() => {
    const {pending, updatingInterface} = states;
    if (pending || updatingInterface) {
        return (<>
        <div className="do-nothing">
            <h1 className="updating-msg">Wait, updating data...</h1>
        </div></>);
    } else {
        return (<></>);
    }
})

export default PendingMessage