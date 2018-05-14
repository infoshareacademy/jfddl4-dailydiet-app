import React from 'react'
// Material-ui
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

const DialogFavorites = (props) => (
  <Dialog
    title="Confirm"
    actions={[
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={props.openToggler}
      />,
      <FlatButton
        label="Confirm"
        primary={true}
        keyboardFocused={true}
        onClick={() => {
          props.openToggler()
          props.favoriteToggler()
        }}
      />,
    ]}
    modal={false}
    open={props.isOpen}
    onRequestClose={props.openToggler}
  >
    {
      !props.productIsFavorite ?
        `Add ${props.productName} to favorites?`
        :
        `Remove ${props.productName} from favorites?`
    }
  </Dialog>
)

export default DialogFavorites