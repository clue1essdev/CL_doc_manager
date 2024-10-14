import { observer } from "mobx-react-lite";
import states from "../../stores/states";
import "../disk-manager/disk-manager.scss";
const Pending = observer(() => {
    const {updatingInterface} = states;
    if (updatingInterface) {
        return (<>
        <div className="do-nothing">
        </div>
        </>);
    } else {
        return (<></>);
    }
    
})

export default Pending;