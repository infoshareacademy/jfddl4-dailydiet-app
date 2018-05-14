import React from 'react'
// Material-ui
import { ListItem, IconButton } from 'material-ui'
import Avatar from 'material-ui/Avatar'
import Star from 'material-ui/svg-icons/toggle/star'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'


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
            <Star />
            :
            <StarBorder />
        }
      </IconButton>
    }
  >

  </ListItem>
)

export default ListElement