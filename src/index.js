import React from "react";
import ReactDOMClient from "react-dom/client";
import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";

const App = () => "Hello";

const root = ReactDOMClient.createRoot(document.getElementById("root"));
root.render(<App />);
