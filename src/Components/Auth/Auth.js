import React from 'react'
// Redux & state
import { connect } from 'react-redux'
import { logInByGoogle } from '../../state/auth'
// Components
import LogInByGoogle from './LogInByGoogle'
// UI
import Container from '../../UI/Container'
import LogInByMailAndPass from './LogInByMailAndPass';

const style = {
  header: {
    color: '#f1edef',
    boxSizing: 'border-box',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    WebkitTextStroke: '2px #005a1f',
    textStroke: '2px #005a1f'
  }
}

const Auth = (props) => (
  <div>
    {
      props.isUserLoggedIn ?
        props.children
        :
        <Container centered>
          <h2 style={style.header}>
            Welcome to Daily Diet App!
          </h2>
          <LogInByMailAndPass
            onLogInClick={props.logInByMailAndPass}
          />
          <LogInByGoogle
            onLogInClick={props.logInByGoogle}
          />
        </Container>
    }
  </div>
)

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