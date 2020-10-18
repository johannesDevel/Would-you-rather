import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { handleSetAuthedUser } from "../actions/authedUser";
import logo from "../logo.jpg";
import "./App.css";

function Login(props) {
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    if (userNames.length > 0 && !userNamesAvailable()) {
      setSelectedUser(userNames[0].id);
    }
  });

  const { userNames, dispatch } = props;

  function userNamesAvailable() {
    return Object.entries(selectedUser).length > 0;
  }

  function submit(e) {
    e.preventDefault();
    dispatch(handleSetAuthedUser(selectedUser));
  }

  return (
    <div>
      {userNames.length > 0 && (
        <div className="login-wrapper">
          <div className="login-header">
            <h3>Welcome to the Would You Rather App!</h3>
            <p>Please sign in to continue</p>
            {/* <img src={logo} className="App-logo" alt="logo" /> */}

          </div>
          <div id='logo'></div>
          <div className="login-select-form">
            <form onSubmit={submit}>
            <h2>Sign in</h2>
              <select
                placeholder="Select User"
                value={selectedUser}
                onChange={(event) => setSelectedUser(event.target.value)}
              >
                {userNames.map((userName) => (
                  <option key={userName.id} value={userName.id}>
                    {userName.name}
                  </option>
                ))}
              </select>
              <div>
                <button type="submit">Sign in</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function mapStateToProps({ users }) {
  const userNames = Object.keys(users).map((userId) => ({
    id: userId,
    name: users[userId].name,
  }));

  return {
    userNames,
  };
}

export default connect(mapStateToProps)(Login);
