import React from 'react'
// Redux & state
import { connect } from 'react-redux'
import { logInByMailAndPass } from '../../state/auth'
// UI
import style from '../../UI/style'
import { TextField, RaisedButton } from 'material-ui'

class LogInByMailAndPass extends React.Component {
  state = {
    email: '',
    password: ''
  }

  emailHandler = (e, email) =>
    this.setState({ email })

  passwordHandler = (e, password) =>
    this.setState({ password })

  render() {
    return (
      <div>
        <TextField
          onChange={this.emailHandler}
          onKeyPress={(ev) => {
            if ((ev.key === 'Enter') {
              this.props.logInByMailAndPass(this.state.email, this.state.password)
            }
          }
          name={'email'}
          type={'email'}
          hintText={'Type your email adress here'}
          fullWidth={true}
        />
        <TextField
          onChange={this.passwordHandler}
          onKeyPress={(ev) => {
            if ((ev.key === 'Enter') {
              this.props.logInByMailAndPass(this.state.email, this.state.password)
            }
          }
          name={'password'}
          type={'password'}
          hintText={'Type your password here'}
          fullWidth={true}
        />
        <span
          onClick={this.props.toggleRestorePassSection}
          style={style.forgotPassLabel}
        >
          Forgot password?
        </span>
        <br />
        <RaisedButton
          onClick={() => this.props.logInByMailAndPass(this.state.email, this.state.password)}
          label={'Log in!'}
          secondary={true}
          style={style.buttonMargins}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  error: state.auth.error,
  imWithError: state.auth.imWithError
})

const mapDispatchToProps = dispatch => ({
  logInByMailAndPass: (email, password) => dispatch(logInByMailAndPass(email, password))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogInByMailAndPass)
