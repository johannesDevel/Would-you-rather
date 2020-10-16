import React, { useEffect, Fragment } from "react";
import "./App.css";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import Nav from "./Nav";
import QuestionPage from "./QuestionPage";
import NewQuestion from "./NewQuestion";

function App(props) {
  useEffect(() => {
    props.dispatch(handleInitialData());
  });

  return (
    <Router>
      <Fragment>
        <div>
          <Nav />
          {props.loading === true ? null : (
            <div>
              <Route path="/new" component={NewQuestion} />
              <Route path="/" exact component={Dashboard} />
              <Route path="/question/:id" component={QuestionPage} />
            </div>
          )}
        </div>
      </Fragment>
    </Router>
  );
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
  };
}

export default connect(mapStateToProps)(App);
