import React from 'react'
// Redux & state
import { connect } from 'react-redux'
import { logInByGoogle } from '../../state/auth'
// Components
import LogInByGoogle from './LogInByGoogle'
import LogInByMailAndPass from './LogInByMailAndPass'
import CreateUser from './CreateUser'
// UI
import style from '../../UI/style'
import Container from '../../UI/Container'
import { AppBar, IconButton, FlatButton, Snackbar } from 'material-ui'
import NavigationExpandLess from 'material-ui/svg-icons/navigation/expand-less'
import { orange500 } from 'material-ui/styles/colors'
import RestorePassword from './RestorePassword'

class Auth extends React.Component {
  state = {
    isSingUpOpen: false,
    isRestorePasswordOpen: false
  }

  toggleSignUpSection = () =>
    this.setState({ isSingUpOpen: !this.state.isSingUpOpen })

  toggleRestorePassSection = () =>
    this.setState({ isRestorePasswordOpen: !this.state.isRestorePasswordOpen })

  render() {
    return (
      <div>
        {
          this.props.isUserLoggedIn ?
            this.props.children
            :
            <div>
              <AppBar
                title='Daily Diet App'
                showMenuIconButton={false}
                iconElementRight={
                  this.state.isSingUpOpen ?
                    <IconButton><NavigationExpandLess /></IconButton>
                    :
                    <FlatButton><b>SIGN UP</b></FlatButton>
                }
                onRightIconButtonClick={this.toggleSignUpSection}
                style={{
                  backgroundColor: orange500,
                }}
              />
              <Container centered>
                <div
                  style={style.alignCenter}
                >
                  <h2 style={style.welcomeHeader}>
                    Welcome to Daily Diet App!
                </h2>
                  <div
                    style={style.wrapped}
                  >
                    <LogInByMailAndPass
                      toggleRestorePassSection={this.toggleRestorePassSection}
                    />
                    <span>
                      or
                    </span>
                    <LogInByGoogle
                      onLogInClick={this.props.logInByGoogle}
                    />
                  </div>
                </div>
              </Container>
              {
                this.state.isSingUpOpen ?
                  <Container centered>
                    <CreateUser />
                  </Container>
                  :
                  <div></div>
              }
              {
                this.state.isRestorePasswordOpen ?
                  <Container centered>
                    <RestorePassword />
                  </Container>
                  :
                  <div></div>
              }
              <Snackbar
                open={this.props.imWithAlert}
                message={this.props.alert}
              />
            </div>
        }
      </div>
    )
  }
}

export default connect(
  state => ({
    isUserLoggedIn: state.auth.isUserLoggedIn,
    imWithAlert: state.alerts.imWithAlert,
    alert: state.alerts.alert
  }),
  dispatch => ({
    logInByGoogle: () => dispatch(logInByGoogle())
  })
)(Auth)