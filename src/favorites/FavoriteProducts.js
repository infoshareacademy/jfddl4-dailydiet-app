import React from 'react'
// Firebase
import { db } from './../firebase'
// Material-ui
import { List } from 'material-ui/List'

import DialogFavorites from './DialogFavorites'
import ListElement from './../ListElement'

const PRODUCTS_RESOURCE_PATH = `https://dailydiet-app.firebaseio.com`

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
        <h1>Favorite products</h1>
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
      </div>
    )
  }

}

export default FavoriteProducts