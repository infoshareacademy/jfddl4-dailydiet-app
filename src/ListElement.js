import React from 'react'
// Material-ui
import {ListItem, IconButton} from 'material-ui'
import Avatar from 'material-ui/Avatar'
import Star from 'material-ui/svg-icons/toggle/star'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'
import {Link} from 'react-router-dom'

const styles = {
    textDecoration: 'none',
    width: '100%',
    display: 'inline-block'
}

const ListElement = (props) => (
    <ListItem
        containerElement={props.containerElement}
        key={props.productKey}
        insetChildren={true}
        leftAvatar={<Avatar src={props.productPicture}/>}
        rightAvatar={
            < IconButton
                onClick={() => props.onFavoriteRequest(props.productName, props.productKey, props.isProductFavorite)}
            >
                {
                    props.isProductFavorite ?
                        <Star/>
                        :
                        <StarBorder/>
                }
            </IconButton>
        }
    >
        <Link style={styles} to={`product/${props.productKey}`}>{props.productName}</Link>
    </ListItem>
)

export default ListElement