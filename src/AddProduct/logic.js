// Firebase
import { db } from '../firebase'

export const addToDatabase = () => {
  this.state.products.filter(el =>
    el.name === this.state.name
  ).length ?
    this.clearState(alert(`${this.state.name} is already in base!`))
    :
    db.ref(`/products`)
      .push({
        name: this.state.name,
        category: this.state.category,
        isFavorite: this.state.isFavorite,
        picture: this.state.picture,
        kcal: this.state.kcal,
        proteins: this.state.proteins,
        carbohydrates: this.state.carbohydrates,
        fat: this.state.fat
      }).then(this.clearState)
}

export const clearState = (callback) =>
  this.setState({
    category: 'other',
    isFavorite: true,
    picture: '',
    kcal: 0,
    proteins: 0,
    carbohydrates: 0,
    fat: 0
  }, callback())

export const dropDownCategoryHandler = (event, index, value) => {
  this.setState({ category: value });
}

export const dropDownFavoriteHandler = (event, index, value) => {
  this.setState({ isFavorite: value });
}

export const nameHandler = (name) => (this.setState({ name }))

export const categoryHandler = (category) => (this.setState({ category }))

export const isFavoriteHandler = (isFavorite) => (this.setState({ isFavorite }))

export const pictureHandler = (picture) => (this.setState({ picture }))

export const kcalHandler = (kcal) => {
  if (kcal % 1 === 0) {
    this.setState({ kcal })
  } else {
    alert('An integer is required in this field')
  }
}

export const proteinsHandler = (proteins) => {
  if (proteins % 1 === 0) {
    this.setState({ proteins })
  } else {
    alert('An integer is required in this field')
  }
}

export const carbohydratesHandler = (carbohydrates) => {
  if (carbohydrates % 1 === 0) {
    this.setState({ carbohydrates })
  } else {
    alert('An integer is required in this field')
  }
}

export const fatHandler = (fat) => {
  if (fat % 1 === 0) {
    this.setState({ fat })
  } else {
    alert('An integer is required in this field')
  }
}
