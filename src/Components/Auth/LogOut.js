import React from 'react'
// Redux & state
import { connect } from 'react-redux'
import { logOut } from '../../state/auth'
// UI
import { FlatButton } from 'material-ui'

const style = {
  logOutButton: {
    color: 'white',
    marginTop: '6px'
  },
  logOutLabel: {
    fontSize: '1rem',
    fontWeight: 'bold'
  }
}

const LogOut = (props) => (
  <FlatButton
    label="Log out"
    labelPosition="before"
    labelStyle={style.logOutLabel}
    onClick={() => props.onLogOutClick()}
    style={style.logOutButton}
  />
)

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  onLogOutClick: () => dispatch(logOut())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogOut)