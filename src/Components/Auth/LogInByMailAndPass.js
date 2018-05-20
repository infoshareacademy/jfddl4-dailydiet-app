import React from 'react'
import { TextField, RaisedButton } from 'material-ui'

const style = {
  wrapped: {
    maxWidth: '500px'
  }
}

export default (props) => (
  <div
    style={style.wrapped}
  >
    <TextField
      onChange={props.textHandler}
      value={props.emailValue}
      name={'email'}
      type={'email'}
      hintText={'Type your email adress here'}
      fullWidth={true}
    />
    <TextField
      onChange={props.passwordHandler}
      value={props.passwordValue}
      name={'password'}
      type={'password'}
      hintText={'Type your password here'}
      fullWidth={true}
    />
    <RaisedButton
      onClick={props.onLogInClick}
      label={'Log in!'}
      secondary={true}
    />
  </div>
)