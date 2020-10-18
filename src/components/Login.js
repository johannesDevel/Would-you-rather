import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { handleSetAuthedUser } from "../actions/authedUser";

function Login(props) {
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    if (userNames.length > 0 && Object.entries(selectedUser).length === 0) {
      setSelectedUser(userNames[0].id);
    }
  });

  const { userNames, dispatch } = props;

  function submit(e) {
    e.preventDefault();
    dispatch(handleSetAuthedUser(selectedUser));
  }

  return (
    <div>
      {userNames.length > 0 && (
        <form onSubmit={submit}>
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
            <button disabled={selectedUser === ""} type="submit">
              Sign in
            </button>
          </div>
        </form>
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
