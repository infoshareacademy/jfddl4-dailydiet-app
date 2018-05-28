import React from 'react'
// UI
import style from '../../UI/style'
import { RaisedButton } from 'material-ui'

export default (props) => (
  <div>
    <RaisedButton
      onClick={props.onLogInClick}
      label={'Log in by Google!'}
      secondary={true}
      style={style.buttonMargins}
    />
  </div>
)