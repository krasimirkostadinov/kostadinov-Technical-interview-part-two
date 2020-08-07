import { createStore, compose, applyMiddleware } from "redux";

import reducers from "./reducers";
const _reduxToolsPresent = () =>
  typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === "function";
const _isDevelopment = () => process.env.NODE_ENV === "development";

// Enable use of Redux devtools in development
const composeEnhancer =
  _isDevelopment() && _reduxToolsPresent()
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const store = createStore(reducers, composeEnhancer(applyMiddleware()));

export default store;
