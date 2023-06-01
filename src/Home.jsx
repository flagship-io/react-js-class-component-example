import React from "react";
import {
  useFsFlag,
  Flagship,
  HitType,
  EventCategory,
} from "@flagship.io/react-sdk";
import "./App.css";

// the static method `getVisitor` can be called anywhere even outside of components if FlagshipProvider has already started
function anyFunction() {
  const flag = Flagship.getVisitor().getFlag("my-other-flag", "defaultValue");
  console.log("my-other-flag", flag.getValue());
}

class Home extends React.Component {
  clickButton() {
    // You can get visitor instance anytime via the static method `getVisitor` of Flagship class
    const flag = Flagship.getVisitor().getFlag("my_flag", "defaultValue");
    console.log("my-flag-value:", flag.getValue());
  }
  sendHit() {
    // Send a hit
    Flagship.getVisitor().sendHit({
      type: HitType.EVENT,
      action: "click",
      category: EventCategory.ACTION_TRACKING,
    });
  }
  render() {
    return (
      <>
        {/* Use the value of my_flag   */}
        <div> My flag value: {this.props.myFlagValue} </div>
        <br />
        <button onClick={this.clickButton}>Click button</button>
        <br />
        <br />
        <button onClick={this.sendHit}>Send hit</button>
      </>
    );
  }
}

// use a HOC to get flags through hooks
function withFsHooksHOC(Component) {
  function Func(props) {
    const myFlag = useFsFlag("my_flag", "defaultValue"); // Get my_flag flag
    // const myOtherFlag = useFsFlag('my_other_flag', 'defaultValue');
    return <Component myFlagValue={myFlag.getValue()} {...props} />; // Inject the value of my_flag via myFlagValue props
  }
  return Func;
}

export default withFsHooksHOC(Home);
