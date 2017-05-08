import React from 'react';

class UserForm extends React.Component {
  userDefaults = { first_name: '', last_name: '' }
  state = { user: this.userDefaults, loaded: false }

  componentDidUpdate() {
    let { defaults } = this.props;
    if (defaults && !this.state.loaded) 
      this.setState({ user: defaults, loaded: true })
  }

  handleChange = (e) => {
    let el = e.target;
    let { user } = this.state;
    this.setState({
      user: {
        ...user,
        [el.id]: el.value
      }
    })
  }

  submit = (e) => {
    e.preventDefault()
    let { user } = this.state;
    let { handleSubmit } = this.props;
    handleSubmit(user);
    if (!this.props.defaults)
      this.setState({ user: this.userDefaults })
  }

  render() {
    let { user } = this.state;
    let { defaults } = this.props;
    return (
      <form onSubmit={this.submit}>
        <input
          id="first_name"
          required
          placeholder="First Name"
          onChange={this.handleChange}
          value={user.first_name}
        />
        <input
          id="last_name"
          required
          placeholder="Last Name"
          onChange={this.handleChange}
          value={user.last_name}
        />
        <button>{ defaults ? 'Update' : 'Add' }</button>
      </form>
    )
  }

}

export default UserForm;
