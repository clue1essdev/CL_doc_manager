import { observer } from "mobx-react-lite";
import states from "../../stores/states";
import "./disk-manager.scss";
const AppHeader = observer(() => {
  const { resetPopup } = states;
  return (
    <>
      <header className="header" onClick={() => {resetPopup()}}>
        <section className="title-credits">
          <h1 className="page-title">CaseLabDocuments manager</h1>
          <p className="credits">API: API Яндекс.Диска (Яндекс.Диск Полигон)</p>
        </section>
      </header>
    </>
  );
});

export default AppHeader;
