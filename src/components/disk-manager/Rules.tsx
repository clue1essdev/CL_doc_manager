import { observer } from "mobx-react-lite";
import states from "../../stores/states";
const Rules = observer(() => {
    const { hideRules, toggleHideRules } = states;
    const rules = (
    <section className="rules">
    <p className="rules-title">Here's what you can do here:</p>
    <ol className="rules-list">
      <li className="rule">Double click on the file or folder to open it</li>
      <li className="rule">You also can do so with the side bar (on the left)</li>
      <li className="rule">Right-click on the file to see options</li>
      <li className="rule">Double click on delete option to delete the file</li>
      <li className="rule">Click on move option to move file. You'll see a list of options (folders) that you can move file to</li>
      <li className="rule">Double click on the folder option to move file in that folder</li>
    </ol>
    <div className="hide-rules" onClick={() => {
        if (!hideRules) toggleHideRules();}}>
      <img src="./arrow.svg" alt="show-hide-rules-btn" className="show-hide-rules-btn"></img>
    </div> 
  </section>);
  if (!hideRules) return rules;
  else {
    return (
      <div className="show-rules" onClick={() => {
        if (hideRules) toggleHideRules();}}>
        <img src="./arrow.svg" alt="show-hide-rules-btn" className="show-hide-rules-btn"></img>
      </div> 
    )
  }
  })

export default Rules;