import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { handleSetAuthedUser } from "../actions/authedUser";

function Nav(props) {
  const { authedUser, dispatch } = props;

  function logout() {
    dispatch(handleSetAuthedUser(null));
  }

  return (
    <nav className="nav">
      {authedUser != null ? (
        <ul className='nav-list'>
          <li>
            <NavLink to="/" exact activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/add" activeClassName="active">
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to="/leaderboard" activeClassName="active">
              Leader Board
            </NavLink>
          </li>
          <li className="nav-list-user">
            <span>{`Hello ${authedUser}`}</span>
          </li>
          <li className="nav-list-logout">
            <NavLink
              to="/"
              exact
              activeClassName="active"
              onClick={() => logout()}
            >
              Logout
            </NavLink>
          </li>
        </ul>
      ) : (
        <div>login</div>
      )}
    </nav>
  );
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(Nav);
