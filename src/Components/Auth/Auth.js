import React from 'react'
// Redux & state
import { connect } from 'react-redux'
import { logInByGoogle } from '../../state/auth'
// Components
import LogInByGoogle from './LogInByGoogle'
import LogInByMailAndPass from './LogInByMailAndPass'
import CreateUser from './CreateUser'
// UI
import Container from '../../UI/Container'
import { AppBar, IconButton, FlatButton, Snackbar } from 'material-ui'
import NavigationExpandLess from 'material-ui/svg-icons/navigation/expand-less'
import style from '../../UI/style'
import { orange500 } from 'material-ui/styles/colors'

class Auth extends React.Component {
  state = {
    isSingUpOpen: false,
    isSnackbarOpen: false
  }

  toggleSignUpSection = () =>
    this.setState({ isSingUpOpen: !this.state.isSingUpOpen })

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
              <Snackbar
                open={this.props.imWithError}
                message={this.props.error}
              />
              <Container centered>
                <div
                  style={style.alignCenter}
                >
                  <h2 style={style.header}>
                    Welcome to Daily Diet App!
                </h2>
                  <div
                    style={style.wrapped}
                  >
                    <LogInByMailAndPass />
                    <span
                      style={style.textMargins}
                    >
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
            </div>
        }
      </div>
    )
  }
}

export default connect(
  state => ({
    isUserLoggedIn: state.auth.isUserLoggedIn,
    imWithError: state.auth.imWithError,
    error: state.auth.error
  }),
  dispatch => ({
    logInByGoogle: () => dispatch(logInByGoogle())
  })
)(Auth)