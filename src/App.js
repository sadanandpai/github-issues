import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { getTotalPagesAsync } from "./store/issuesSlice";

import Issues from "./pages/Issues";
import IssuesDetails from "./pages/IssuesDetails";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotalPagesAsync());
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/issues/:page/details/:id">
            <IssuesDetails />
          </Route>
          <Route path="/issues/:page">
            <Issues />
          </Route>
          <Route path="/">
            <Issues />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
