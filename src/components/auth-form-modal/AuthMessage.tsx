import "./auth.scss";
import { observer } from "mobx-react-lite";
import states from "../../stores/states";

const AuthMessage = observer(() => {
  const { noSuchFolder, authorized, authorisationFailed } = states;
  if (authorized) {
    return (
      <div className="warning">
        <strong>
          <p>Success!</p>
        </strong>
        <p>Authentication was succesfull.</p>
        <p>You can now manage your CaseLabDocuments folder.</p>
      </div>
    );
  }
  if (authorisationFailed) {
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
  if (noSuchFolder && !authorized) {
    return (
      <div className="warning">
        <strong>
          <p>Error:</p>
        </strong>
        <p>
          Unfortunately, your Yandex disk has no "/CaseLabDocuments" folder.
        </p>
        <p>Create "/CaseLabDocuments" folder on root level and try again.</p>
      </div>
    );
  }
  if (!noSuchFolder && !authorized) {
    return (
      <div className="warning">
        <p>To get access to your Yandex Disk, enter an auth-token.</p>
        <p>
          Keep in mind that your Yandex Disk should have a CaseLabDocuments
          folder.
        </p>
        <p>If it doesn't, create one.</p>
      </div>
    );
  }
});

export default AuthMessage;
