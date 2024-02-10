# Getting Started

This example implements Flagship React-native SDK with class components.

[Flagship React doc](https://docs.developers.flagship.io/docs/react)

## Install packages

```bash
 yarn install
```


Start the app

```bash
yarn dev
```

## Implementation

In `App.jsx`, we use [`FlagshipProvider`](https://docs.developers.flagship.io/docs/react) to wrap our app. The provider must wrap all components where Flagship will be used.

```jsx
//src/App.jsx

import React from "react";
import { FlagshipProvider } from "@flagship.io/react-sdk";
import "./App.css";
import Home from "./Home";

class App extends React.Component {
  render() {
    return (
      // Use FlagshipProvider in a suitable place to wrap your application
      <FlagshipProvider
        envId="your_env_id"
        apiKey="your_api_key"
        visitorData={{
          id: "visitor-id",
          context: {
            key: "value"
          },
        }}
      >
        <Home />
      </FlagshipProvider>
    );
  }
}

export default App;
```

In `Home.jsx`, we use `withFsHooksHOC` which is a `HOC`(Higher-Order Components) to wrap our class component `Home` and inside it, we
call the hook `useFsFlag` to get flags then inject those flags via props to our `Home` class component.

The `Flagship` class has the static method `getVisitor()` which returns the instance of current [visitor](https://docs.developers.flagship.io/docs/js-v3-1#visitor-class), it can be called anywhere once the `FlagshipProvider` has started the SDK.

Here we use it to `send hit` or `get Flag`.

<br/>

[Learn more about visitor instance](https://docs.developers.flagship.io/docs/js-v3-1#visitor-class)

```jsx
//src/Home.jsx

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

```
