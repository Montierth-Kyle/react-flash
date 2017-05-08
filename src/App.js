import React, { Component } from 'react';
import BASE_URL from './url';
import './App.css';
import UserList from './UserList';
import UserListBack from './UserListBack';
import UserForm from './UserForm';
import User from './User';

class App extends Component {
  state = { users: [], showFirst: true, lastName: null }

  componentDidMount() {
    fetch(BASE_URL)
      .then( res => res.json() )
      .then( users => this.setState({ users }) )
      .catch( err => console.log(err) )
  }

  show = (lastName) => {
    this.setState({ showFirst: false, lastName })
  }

  showFirst = () => {
    this.setState({ showFirst: true, lastName: null })
  }

  addUser = (user) => {
    fetch(BASE_URL, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(user)
    }).then( res => res.json() )
      .then( user => {
        let { users } = this.state;
        this.setState({ users: [...users, user] }) 
      })
  }

  updateUser = (user) => {
    let { lastName } = this.state;
    fetch(`${BASE_URL}/${lastName}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(user)
    }).then( res => res.json() )
      .then( u => {
        let users = this.state.users.map( use => {
          if (use.id === lastName)
            return u
          return use
        });

        this.setState({ users, showFirst: true, lastName: null });
      })
  }

  removeUser = () => {
    let { lastName, users } = this.state;
    fetch(`${BASE_URL}/${lastName}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'DELETE'
    }).then( () => {
      this.setState({
        users: users.filter( u => u.id !== lastName ),
        showFirst: true,
        lastName: null
      });
    });

  }

  render() {
    let { users, showFirst, lastName } = this.state;
    return (
      <div className="App">
        { showFirst ?
          <div>
            <UserList users={users} show={this.show} />
            <UserForm handleSubmit={this.addUser} />
          </div>
          :
          <User 
            removeUser={this.removeUser} 
            updateUser={this.updateUser}
            showFirst={this.showFirst}
            id={lastName} 
          />
        }
      </div>
    );
  }
}

export default App;
