import { observer } from "mobx-react-lite";
import states from "../../stores/states";
const Rules = observer(() => {
    const { hideRules, setHideRules } = states;
    let rules = <section className="rules">
    <p className="rules-title">Here's what you can do here:</p>
    <ol className="rules-list">
      <li className="rule">Double click on the file or folder to open it</li>
      <li className="rule">You also can do so with the side bar (on the left)</li>
      <li className="rule">Right-click on the file to see options</li>
      <li className="rule">Double click on delete option to delete the file</li>
      <li className="rule">Click on move option to move file. You'll see a list of options (folders) that you can move file to</li>
      <li className="rule">Double click on the folder option to move file in that folder</li>
    </ol>
    <p className="rule hide-rules" onClick={() => setHideRules()}>Click here to hide the information. Be careful, you won't be able to see it again unless after reloading the page</p>
  </section>
  if (hideRules) rules = <></>;
    return (<>
        {rules}
    </>)
})

export default Rules;