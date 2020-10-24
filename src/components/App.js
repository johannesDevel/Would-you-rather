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
import LeaderBoard from "./LeaderBoard";
import LoadingBar from "react-redux-loading";

function App(props) {
  useEffect(() => {
    props.dispatch(handleInitialData());
  });

  const { authedUser } = props;

  return (
    <Router>
      <Fragment>
        <div>
          <Nav />
          <LoadingBar />
          <div className="app-content">
            {authedUser === null ? (
              <div>
                <Route path="/" component={Login} />
              </div>
            ) : (
              <div>
                <Route path="/" exact component={Dashboard} />
                <Route path="/add" component={NewQuestion} />
                <Route path="/question/:id" component={QuestionPage} />
                <Route path="/leaderboard" component={LeaderBoard} />
              </div>
            )}
          </div>
        </div>
      </Fragment>
    </Router>
  );
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(App);
