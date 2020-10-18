import React, { useEffect, Fragment } from "react";
import "./App.css";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import Nav from "./Nav";
import QuestionPage from "./QuestionPage";
import NewQuestion from "./NewQuestion";
import Login from "./Login";
import LeaderBoard from './LeaderBoard';

function App(props) {
  useEffect(() => {
    props.dispatch(handleInitialData());
  });

  const { loading, authedUser } = props;

  return (
    <Router>
      <Fragment>
        <div>
          <Nav />
          {/* {loading === true ? null : ( */}
          <div>
            {(authedUser === null) ? (
              <div>
                <Route path="/" component={Login} />
              </div>
            ) : (
              <div>
                <Route path="/" exact component={Dashboard} />
                <Route path="/new" component={NewQuestion} />
                <Route path="/question/:id" component={QuestionPage} />
                <Route path="/leaderboard" component={LeaderBoard} />
              </div>
            )}
          </div>
          {/* )} */}
        </div>
      </Fragment>
    </Router>
  );
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
    authedUser,
  };
}

export default connect(mapStateToProps)(App);
