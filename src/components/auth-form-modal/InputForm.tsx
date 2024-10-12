import "./auth.scss";
import { observer } from "mobx-react-lite";
import { useRef } from "react";
import states from "../../stores/states";

const InputForm = observer(() => {
  const {
    fetchFilesData,
    fetchFolderData,
    setToken,
    toggleManageDisk,
    authorized,
  } = states;
  const inputRef = useRef();
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (inputRef.current !== undefined) {
      setToken(inputRef.current["value"]);
      fetchFolderData("");
    }
  };
  if (!authorized) {
    return (
      <form className="authentication-form" onSubmit={handleSubmit}>
        <div className="input-box">
          <label>Enter your auth-token here:</label>
          <div className="input-and-input-btn-box">
            <input
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
  } else {
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
  }
});

export default InputForm;
