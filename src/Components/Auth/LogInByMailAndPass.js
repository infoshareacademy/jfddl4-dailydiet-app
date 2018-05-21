import React from 'react'
// Redux & state
import { connect } from 'react-redux'
import { logInByMailAndPass, onEmailChange, onPasswordChange } from '../../state/logInForms'
// Firebase
import { auth } from '../../firebase'
// UI
import { TextField, RaisedButton } from 'material-ui'

const style = {
  wrapped: {
    maxWidth: '500px'
  }
}

class LogInByMailAndPass extends React.Component {
  state = {
    email: '',
    password: ''
  }

  emailHandler = (e, email) =>
    this.setState({ email })

  passwordHandler = (e, password) =>
    this.setState({ password })

  onLogInClick = () => (dispatch, getState) => {
    auth.signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => this.props.logInByMailAndPass(user))
  }

  render() {
    return (
      <div
        style={style.wrapped}
      >
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
        <RaisedButton
          onClick={this.onLogInClick}
          label={'Log in!'}
          secondary={true}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  logInByMailAndPass: (user) => dispatch(logInByMailAndPass(user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogInByMailAndPass)