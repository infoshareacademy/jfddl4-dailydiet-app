import React from 'react'

const PRODUCTS_RESOURCE_PATH = `https://dailydiet-app.firebaseio.com/products`

const Favorites = (props) => {
  const url = `${PRODUCTS_RESOURCE_PATH}/${props.key}/favorite/.json`

  const isFavorite = fetch(url)
    .then(r => r.json())
    .then(data => {
      this.setState({
        isFavorite: data
      })
    })
  

}

export default Favorites