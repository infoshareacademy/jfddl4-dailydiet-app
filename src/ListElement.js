import React from 'react'
// Material-ui
import { ListItem, IconButton } from 'material-ui'
import Avatar from 'material-ui/Avatar'
import Favorite from 'material-ui/svg-icons/action/favorite'
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border'

const ListElement = (props) => (
  <ListItem
    key={props.productKey}
    primaryText={props.productName}
    insetChildren={true}
    leftAvatar={<Avatar src={props.productPicture} />}
    rightAvatar={
      < IconButton
        onClick={() => props.onFavoriteRequest(props.productName, props.productKey, props.isProductFavorite)}
      >
        {
          props.isProductFavorite ?
            <Favorite color={'#F44336'} />
            :
            <FavoriteBorder color={'#F44336'} />
        }
      </IconButton>
    }
  >

  </ListItem>
)

export default ListElement