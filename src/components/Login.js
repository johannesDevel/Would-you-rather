import React, { Component } from 'react';
import { connect } from 'react-redux';

class Login extends Component {

  render() {
    console.log(this.props);
    return (
      <div>
        <ul>{this.props.userIds.map(id => (
          <li key={id}>User id: {id}</li>
        ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ users }) {
  return {
    userIds: Object.keys(users)
  }
}

export default connect(mapStateToProps)(Login);