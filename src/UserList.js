import React from 'react';
import UserItem from './UserItem';

const UserList = ({ users, show }) => (
  <ul style={{ listStyle: 'none' }}>
    { users.map( u => <UserItem key={u.id} {...u} show={show} /> ) }
  </ul>
)

export default UserList;

