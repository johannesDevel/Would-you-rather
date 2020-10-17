import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { handleSetAuthedUser } from "../actions/authedUser";

function Nav(props) {
  function logout() {
    props.dispatch(handleSetAuthedUser(null));
  }

  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink to="/" exact activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/new" activeClassName="active">
            New Question
          </NavLink>
        </li>
        {props.authedUser !== null && (
          <li>
            <NavLink
              to="/"
              exact
              activeClassName="active"
              onClick={() => logout()}
            >
              Logout
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(Nav);
