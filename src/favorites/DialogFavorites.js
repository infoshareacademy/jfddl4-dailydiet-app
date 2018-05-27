import React from 'react'
// Redux & state
import { connect } from 'react-redux'
import { addFavorite, removeFavorite, closeDialog } from '../state/favorites'
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
        onClick={props.closeDialog}
      />,
      <FlatButton
        label="Confirm"
        primary={true}
        keyboardFocused={true}
        onClick={
          !props.favoritesKeys.filter(key => key === props.requestedKey).length ?
            () => props.addFavorite(props.requestedKey)
            :
            () => props.removeFavorite(props.requestedKey)
        }
      />
    ]}
    modal={true}
    open={props.isDialogOpen}
    onRequestClose={props.closeDialog}
  >
    {
      !props.favoritesKeys.filter(key => key === props.requestedKey).length ?
        `Add ${props.requestedName} to favorites?`
        :
        `Remove ${props.requestedName} from favorites?`
    }
  </Dialog>
)

export default connect(
  state => ({
    favoritesKeys: state.favorites.keys,
    requestedKey: state.favorites.requestedKey,
    requestedName: state.favorites.requestedName,
    isDialogOpen: state.favorites.isDialogOpen
  }),
  dispatch => ({
    addFavorite: () => dispatch(addFavorite()),
    removeFavorite: () => dispatch(removeFavorite()),
    closeDialog: () => dispatch(closeDialog())
  })
)(DialogFavorites)