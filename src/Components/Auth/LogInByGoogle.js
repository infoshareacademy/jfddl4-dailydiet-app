import React from 'react'
import { RaisedButton } from 'material-ui'

export default (props) => (
  <div>
    <RaisedButton
      onClick={props.onLogInClick}
      label={'Log in by Google!'}
      secondary={true}
    />
  </div>
)