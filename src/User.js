import React from 'react';
import BASE_URL from './url';
import UserForm from './UserForm';

class User extends React.Component {
  state = { user: {} }

  componentDidMount() {
    fetch(`${BASE_URL}/${this.props.id}`)
      .then( res => res.json() )
      .then( user => this.setState({ user }) )
  }

  render() {
    let { showFirst, removeUser, updateUser } = this.props;
    let { user: { first_name, last_name }} = this.state;

    return (
      <div>
        <button onClick={showFirst}>Show First Name</button>
        <h1>{last_name}</h1>
        <button onClick={removeUser}>Delete</button>
        <UserForm handleSubmit={updateUser} 
        defaults={{ first_name, last_name }} />
      </div>
    )
  }
}

export default User;
