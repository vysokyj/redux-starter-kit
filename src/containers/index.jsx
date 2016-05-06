import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router, Route, IndexRoute } from "react-router"
import App from "./App";
import CountPage from "./CountPage";
import TodoPage from "./TodoPage";

export function createRouter(store, history) {
  render(
      <Provider store={store}>
          <Router history={history}>
              <Route path="/" component={App}>
                  <IndexRoute component={CountPage} />
                  <Route path="todos" component={TodoPage}/>
              </Route>
          </Router>
      </Provider>,
      document.getElementById("root")
  );
}
