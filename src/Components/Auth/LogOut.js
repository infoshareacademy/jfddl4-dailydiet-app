import React from 'react'
import { Link } from 'react-router-dom'
// Redux & state
import { connect } from 'react-redux'
import { logOut } from '../../state/auth'
// UI
import style from '../../UI/style'
import { FlatButton } from 'material-ui'

const LogOut = (props) => (
  <Link
    to={'/'}
    style={style.link}
  >
    <FlatButton
      label="Log out"
      labelPosition="before"
      labelStyle={style.logOutLabel}
      onClick={props.onLogOutClick}
      style={style.logOutButton}
    />
  </Link>
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