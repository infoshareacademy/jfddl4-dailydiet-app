import React from 'react'
// Redux & state
import { connect } from 'react-redux'
// Material-ui
import { List } from 'material-ui/List'
// Components
import DialogFavorites from './DialogFavorites'
import ListElement from '../Components/ListElement'
import ShareButtonFacebook from '../ShareButtonFacebook'
import Container from '../UI/Container'
class FavoriteProducts extends React.Component {
  state = {
    products: this.props.products
  }

  render() {
    return (
      <div>
        <Container>
        <h1>Favorite products</h1>
        </Container>
        <Container>
        {
          !this.state.products ?
            'Loading...'
            :
            <List>
              {
                this.props.favoritesKeys.length ?
                this.state.products
                  .filter(el => {
                    if (this.props.favoritesKeys.filter(
                      favoriteKey => el.key === favoriteKey)
                      .length) {
                        return true
                    } else return false
                  }
                  )
                  .map(
                    el => (
                      <ListElement
                        product={el}
                      />
                    )
                  )
                :
                'Not sure if loading or you have no favorites yet'
              }
              <DialogFavorites/>
            </List>
        }
        </Container>
        <ShareButtonFacebook/>
      </div>
    )
  }
}

export default connect(
  state => ({
    favoritesKeys: state.favorites.keys,
    isDialogOpen: state.favorites.isDialogOpen
  }),
  dispatch => ({})
)(FavoriteProducts)