import React from 'react'
import { Link } from 'react-router-dom'
// Redux & state
import { connect } from 'react-redux'
import { addFavorite, removeFavorite } from './state/favorites'
// Material-ui
import style from '../../UI/style'
import { ListItem, IconButton } from 'material-ui'
import Avatar from 'material-ui/Avatar'
import Favorite from 'material-ui/svg-icons/action/favorite'
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border'

const ListElement = (props) => (
	<ListItem
		key={props.productKey}
		containerElement={props.containerElement}
		insetChildren={true}
		leftAvatar={<Avatar src={props.productPicture} />}
		rightAvatar={
			!props.favorites.filter(el => el === productKey).length ?
				< IconButton
					onClick={() => props.addFavorite(props.productKey)}
				>
					<Favorite color={'#F44336'} />
				</IconButton>
				:
				< IconButton
					onClick={() => props.removeFavorite(props.productKey)}
				>
					<FavoriteBorder color={'#F44336'} />
				</IconButton >
		}
	>
		<Link style={style.listElement} to={`/product/${props.productKey}`}>{props.productName}</Link>
	</ListItem >
)

export default connect(
	state => ({
		favorites: state.favorites.favorites
	}),
	dispatch => ({
		addFavorite: () => dispatch(addFavorite()),
		removeFavorite: () => dispatch(removeFavorite())
	})
)(ListElement)