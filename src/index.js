import React from "react";
import ReactDOM from "react-dom/client";
import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import App from "./App";
import "./index.css";
import thunk from "redux-thunk";
import { loadCourses, loadLastUser } from "./actions";
import Modal from "react-modal";
import { saveAuthToken } from "./middleware";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, saveAuthToken));
const store = createStore(reducer, enhancer);
store.dispatch(loadCourses());
store.dispatch(loadLastUser());

Modal.setAppElement("#root");
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
