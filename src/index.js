import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

//aws stuff
import awsMobile from "./aws-exports";
import Amplify from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
Amplify.configure(awsMobile);
const AppWithAuth = withAuthenticator(App);
//aws stuff
ReactDOM.render(<AppWithAuth />, document.getElementById("root")); //this replaces v
//ReactDOM.render(<App />, document.getElementById('root')); //this is replaced by ^

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
