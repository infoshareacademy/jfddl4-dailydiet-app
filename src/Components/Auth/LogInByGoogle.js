import React from 'react'
import { RaisedButton } from 'material-ui'

const style = {
  buttonMargins: {
    margin: '0.5rem 0'
  }
}

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