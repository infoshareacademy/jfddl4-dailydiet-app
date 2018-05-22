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
import { AppBar, IconButton, FlatButton } from 'material-ui'
import NavigationExpandLess from 'material-ui/svg-icons/navigation/expand-less'
import { orange500 } from 'material-ui/styles/colors'

const style = {
  header: {
    color: '#f1edef',
    boxSizing: 'border-box',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    WebkitTextStroke: '2px #005a1f',
    textStroke: '2px #005a1f'
  },
  wrapped: {
    maxWidth: '500px'
  },
  alignCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  textMargins: {
    display: 'block',
    margin: '0.5rem 0'
  }
}

class Auth extends React.Component {
  state = {
    isSingUpOpen: false
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

const mapStateToProps = state => ({
  isUserLoggedIn: state.auth.isUserLoggedIn
})

const mapDispatchToProps = dispatch => ({
  logInByGoogle: () => dispatch(logInByGoogle())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth)