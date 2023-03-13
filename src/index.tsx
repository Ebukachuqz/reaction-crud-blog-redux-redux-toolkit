import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { fetchUsers } from "features/users/usersSlice";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { extendedApiSlice } from "features/post/postSlice";

store.dispatch(fetchUsers());
// @ts-expect-error TS(2554): Expected 1-2 arguments, but got 0.
store.dispatch(extendedApiSlice.endpoints.getAllPosts.initiate());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          // @ts-expect-error TS(2786): 'App' cannot be used as a JSX component.
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
