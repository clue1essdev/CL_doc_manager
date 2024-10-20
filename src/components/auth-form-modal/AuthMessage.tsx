import "./auth.scss";
import { observer } from "mobx-react-lite";
import states from "../../stores/states";

const AuthMessage = observer(() => {
  const {  authorized, authorisationFailed } = states;
  if (authorized) {
    return (
      <div className="warning">
        <strong>
          <p>Success!</p>
        </strong>
        <p>Authentication was succesfull.</p>
        <p>You can now manage your Disk.</p>
      </div>
    );
  }
  else if (authorisationFailed) {
    return (
      <div className="warning">
        <strong>
          <p>Error:</p>
        </strong>
        <p>Unfortunately, something went wrong during authorisation.</p>
        <p>Please provide a valid existing auth-token</p>
      </div>
    );
  }
  else if (!authorized) {
    return (
      <div className="warning">
        <p>To get access to your Yandex Disk, enter an auth-token.</p>
        <p>
          You can get your auth-token <a className="polygon-anchor" target="_blank" href="https://yandex.ru/dev/disk/poligon/">here.</a>
        </p>
      </div>
    );
  }
});

export default AuthMessage;
