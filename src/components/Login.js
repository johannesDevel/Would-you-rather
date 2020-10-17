import React, { useState } from "react";
import { connect } from "react-redux";
import { handleSetAuthedUser } from '../actions/authedUser';

function Login(props) {
  const [selectedUser, setSelectedUser] = useState("");

  const { userNames, dispatch } = props;

  function submit(e) {
    e.preventDefault();
    dispatch(handleSetAuthedUser(selectedUser));
  }

  return (
    <div>
      <form onSubmit={submit}>
        <select
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
