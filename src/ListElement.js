import React from 'react'
// Material-ui
import { ListItem, IconButton } from 'material-ui'
import Avatar from 'material-ui/Avatar'
import Favorite from 'material-ui/svg-icons/action/favorite'
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border'
import { Link } from 'react-router-dom'

const styles = {
	textDecoration: 'none',
	width: '100%',
	display: 'inline-block'
}

const ListElement = (props) => (
	<ListItem
		key={props.productKey}
		containerElement={props.containerElement}
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
		<Link style={styles} to={`/product/${props.productKey}`}>{props.productName}</Link>
	</ListItem>
)

export default ListElement