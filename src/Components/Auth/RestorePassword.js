import React from 'react'
// Redux & state
import { connect } from 'react-redux'
import { restorePassword } from '../../state/auth'
// UI
import style from '../../UI/style'
import { TextField, RaisedButton } from 'material-ui'

class RestorePassword extends React.Component {
  state = {
    email: ''
  }

  emailHandler = (e, email) =>
    this.setState({ email })

  render() {
    return (
      <div
        style={style.alignCenter}
      >
        <div
          style={style.wrapped}
        >
          <h3 style={style.formsHeader}>Type your email addres below to restore password:</h3>
          <TextField
            onChange={this.emailHandler}
            name={'email'}
            type={'email'}
            hintText={'Type your email adress here'}
            fullWidth={true}
          />
        </div>
        <RaisedButton
          onClick={() => this.props.restorePassword(this.state.email)}
          label={'Log in!'}
          secondary={true}
          style={style.buttonMargins}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  alert: state.auth.alert,
  imWithError: state.auth.imWithError
})

const mapDispatchToProps = dispatch => ({
  restorePassword: (email) => dispatch(restorePassword(email))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestorePassword)