import React from 'react'
// Redux & state
import { connect } from 'react-redux'
import { logInByGoogle } from '../../state/auth'
// Components
import LogInByGoogle from './LogInByGoogle'
// UI
import Container from '../../UI/Container'

const Auth = (props) => (
  <div>
    {
      props.isUserLoggedIn ?
        props.children
        :
        <Container centered={true}>
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