import React from 'react'
// Redux & state
import { connect } from 'react-redux'
import { createUser } from '../../state/auth'
// UI
import { TextField, RaisedButton } from 'material-ui'

const style = {
  wrapped: {
    maxWidth: '500px'
  },
  alignCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  error: {
    color: 'red'
  }
}

class LogInByMailAndPass extends React.Component {
  state = {
    email: '',
    password: '',
    passwordRetyped: ''
  }

  emailHandler = (e, email) =>
    this.setState({ email })

  passwordHandler = (e, password) =>
    this.setState({ password })

  passwordRetypedHandler = (e, passwordRetyped) =>
    this.setState({ passwordRetyped })

  render() {
    return (
      <div
        style={style.alignCenter}
      >
        <div
          style={style.wrapped}
        >
        <h3>Fill all fields below to create an account:</h3>
          <TextField
            onChange={this.emailHandler}
            name={'email'}
            type={'email'}
            hintText={'Type your email adress here'}
            fullWidth={true}
          />
          <TextField
            onChange={this.passwordHandler}
            name={'password'}
            type={'password'}
            hintText={'Type your password here'}
            fullWidth={true}
          />
          <TextField
            onChange={this.passwordRetypedHandler}
            name={'password-retyped'}
            type={'password'}
            hintText={'Retype your password here'}
            fullWidth={true}
          />
        </div>
        <RaisedButton
          onClick={() => this.props.createUser(this.state.email, this.state.password, this.state.passwordRetyped)}
          label={'Log in!'}
          secondary={true}
        />
        {
          this.props.imWithError ?
          <h4 style={style.error}>{this.props.error}</h4>
          :
          <h4>Push the button and start using Daily Diet App!</h4>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  error: state.auth.error,
  imWithError: state.auth.imWithError
})

const mapDispatchToProps = dispatch => ({
  createUser: (email, password, passwordRetyped) => dispatch(createUser(email, password, passwordRetyped))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogInByMailAndPass)