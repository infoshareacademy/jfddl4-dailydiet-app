import React from 'react'
// Redux & state
import { connect } from 'react-redux'
import { logOut } from '../../state/auth'
// UI
import { IconButton } from 'material-ui'
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app'


const LogOut = (props) => (
  <div>
    <IconButton><ActionExitToApp color={'white'} /></IconButton>
  </div>
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