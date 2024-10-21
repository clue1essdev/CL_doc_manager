import "./auth.scss";
import { observer } from "mobx-react-lite";
import React, {  useRef } from "react";
import states from "../../stores/states";

const InputForm = observer(() => {
  const {
    fetchFilesData,
    fetchFolderData,
    setToken,
    toggleManageDisk,
    toggleAuthorized,
    authorize,
    togglePending,
    toggleUpdatingInterface,
    authorized,
    pending,
  } = states;
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputRef.current !== null) {
      setToken(inputRef.current["value"]);
      authorize("").then(() => {
        toggleAuthorized();
        if(!pending) togglePending();
        fetchFolderData("").then(() => {
          togglePending();
          toggleUpdatingInterface();
        });
      }).catch(er => console.log(er));
    }
  };
  if (!authorized) {
    return (
      <form className="authentication-form" onSubmit={handleSubmit}>
        <div className="input-box">
          <label>Enter your auth-token here:</label>
          <div className="input-and-input-btn-box">
            <input
              type="password"
              ref={inputRef}
              className="auth-token-input"
              required={true}
              placeholder="Token sample: x0_OhFAFAC3G2daVBDLWwOOAAETDnLIXYZhmlVUMfZO0Y_N_jr9zCKPBlBKlw"
            ></input>
            <input className="submit-btn" type="submit" value="submit" />
          </div>
        </div>
      </form>
    );
    // было !pending
  } else if (!pending)  {
    return (
      <button
        className="go-to-disk-btn"
        onClick={() => {
          toggleManageDisk();
          fetchFilesData();
        }}
      >
        Go to disk
      </button>
    );
  } else {
    return (
      <>
        <p className="pending-msg">Wait, pending...</p>
      </>
    );
  } 
});

export default InputForm;
