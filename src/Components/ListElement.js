import React from 'react'
import { Link } from 'react-router-dom'
// Redux & state
import { connect } from 'react-redux'
import { favoriteRequest } from '../state/favorites'
// Utils
import {upper} from '../utils'
// Material-ui
import style from '../UI/style'
import { ListItem, IconButton } from 'material-ui'
import Avatar from 'material-ui/Avatar'
import Favorite from 'material-ui/svg-icons/action/favorite'
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border'

const ListElement = (props) => (
	<ListItem
		containerElement={props.containerElement}
		insetChildren={true}
		leftAvatar={<Avatar src={props.product.picture} />}
		rightAvatar={
			< IconButton
				onClick={() => props.favoriteRequest(props.product.key, props.product.name)}
			>
				{
					props.favoritesKeys.length ?
						props.favoritesKeys.filter(key => key === props.product.key).length ?
							<Favorite color={'#F44336'} />
							:
							<FavoriteBorder color={'#F44336'} />
						:
						<FavoriteBorder color={'#F44336'} />
				}
			</IconButton >
		}
	>
		<Link style={style.listElement} to={`/product/${props.product.key}`}>{upper(props.product.name)}</Link>
	</ListItem >
)

export default connect(
	state => ({
		favoritesKeys: state.favorites.keys
	}),
	dispatch => ({
		favoriteRequest: (key, name) => dispatch(favoriteRequest(key, name))
	})
)(ListElement)