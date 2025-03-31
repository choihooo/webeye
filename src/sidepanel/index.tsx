import * as React from "react";
import * as ReactDOM from "react-dom";
import { Sidepanel } from "./component";
import "../css/app.css";

// // // //

chrome.tabs.query({ active: true, currentWindow: true }).then(() => {
    ReactDOM.render(<Sidepanel />, document.getElementById("sidepanel"));
});
