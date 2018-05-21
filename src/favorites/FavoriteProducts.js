import React from 'react'
// Firebase
import { db } from './../firebase'
// Material-ui
import { List } from 'material-ui/List'

import DialogFavorites from './DialogFavorites'
import ListElement from './../ListElement'
import ShareButtonFacebook from '../Components/ShareButtonFacebook';
import Container from '../UI/Container';
class FavoriteProducts extends React.Component {
  state = {
    products: this.props.products,
    isDialogOpen: false,
    productName: '',
    productKey: '',
    productIsFavorite: null
  }

  onFavoriteRequest = (name, key, isFavorite) => (
    this.setState({ productName: name, productKey: key, productIsFavorite: isFavorite }, this.isDialogOpenToggler)
  )

  toggleFavorite = () => {
    db.ref(`/products/${this.state.productKey}/isFavorite`)
      .set(!this.state.productIsFavorite)
  }

  isDialogOpenToggler = () => {
    this.setState({ isDialogOpen: !this.state.isDialogOpen })
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
                this.state.products
                  .filter(el =>
                    el.isFavorite
                  )
                  .map(
                    el => (
                      <ListElement
                        key={el.key}
                        productName={el.name}
                        productKey={el.key}
                        isProductFavorite={el.isFavorite}
                        productPicture={el.picture}
                        onFavoriteRequest={this.onFavoriteRequest}
                      />
                    )
                  )
              }
              <DialogFavorites
                openToggler={this.isDialogOpenToggler}
                favoriteToggler={this.toggleFavorite}
                isOpen={this.state.isDialogOpen}
                productIsFavorite={this.state.productIsFavorite}
                productName={this.state.productName}
              />
            </List>
        }
        </Container>
        <ShareButtonFacebook/>
      </div>
    )
  }
}

export default FavoriteProducts