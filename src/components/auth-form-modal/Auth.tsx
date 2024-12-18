import "./auth.scss";
import { observer } from "mobx-react-lite";
import AuthMessage from "./AuthMessage";
import InputForm from "./InputForm";
import Pending from "./Pending";

const Auth = observer(() => {
  return (
    <div className="auth-modal">
      <div className="auth-card">
        <h1 className="auth-header">
          Welcome to CaseLabDocuments manager application
        </h1>
        <AuthMessage />
        <InputForm />
        <Pending/>
      </div>
    </div>
  );
});
export default Auth;
