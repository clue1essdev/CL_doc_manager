import Auth from "./components/auth-form-modal/Auth";
import DiskManager from "./components/disk-manager/DiskManager";
import "./App.scss";
import { observer } from "mobx-react-lite";
import states from "./stores/states";
const App = observer(() => {
  const { manageDisk } = states;
  if (!manageDisk) return <Auth />;
  else return <DiskManager />;
});

export default App;
