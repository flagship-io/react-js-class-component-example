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
          id: "visitor-2",
          context: {
            key: "value",
            testing_tracking_manager: true,
          },
        }}
      >
        <Home />
      </FlagshipProvider>
    );
  }
}

export default App;
