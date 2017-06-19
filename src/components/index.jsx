import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl-redux";
import { ConnectedRouter } from "react-router-redux";
import { Route, Switch } from "react-router";
import CountPage from "./CountPage";
import TodoPage from "./TodoPage";
import Navigation from "./Navigation";

export function createRouter(store, history) {
  render(
    <Provider store={store}>
      <IntlProvider>
        <div>
          <header>
            <Navigation />
          </header>
          <article className="container">
            <ConnectedRouter history={history}>
              <Switch>
                <Route exact path="/" component={CountPage} />
                <Route path="/todos" component={TodoPage} />
              </Switch>
            </ConnectedRouter>
          </article>
          <footer className="container">
            <p className="text-muted">Copyright &copy; Jiri Vysoky, 2016</p>
          </footer>
        </div>
      </IntlProvider>
    </Provider>,
    document.getElementById("root")
  );
}
