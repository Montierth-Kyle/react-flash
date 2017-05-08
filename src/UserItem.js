import React from 'react';

const styles = {
  link: {
    cursor: 'pointer'
  }
}

const UserItem = ({ first_name, id, show }) => (
  <li onClick={() => show(id)} style={styles.link}>{first_name}</li>
)

export default UserItem;
