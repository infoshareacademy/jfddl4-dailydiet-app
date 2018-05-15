import React from 'react'
// Firebase
import { db } from '../firebase'
// Material-ui
import RaisedButton from 'material-ui/RaisedButton'
import Container from '../UI/Container'
// Add product views
import AddProductPart from './AddProductPart'

const style = {
  wrapper: {
    diplay: 'flex',
    flexGrow: 1,
    maxWidth: '500px'
  }
}

class AddProduct extends React.Component {
  state = {
    products: this.props.products,
    name: '',
    category: 'other',
    isFavorite: true,
    picture: '',
    calories: '',
    proteins: '',
    carbohydrates: '',
    fat: ''
  }

  addToDatabase = () => {
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
          kcal: this.state.calories,
          proteins: this.state.proteins,
          carbohydrates: this.state.carbohydrates,
          fat: this.state.fat
        }).then(this.clearState)
  }

  clearState = (callback) =>
    this.setState({
      category: 'other',
      isFavorite: true,
      picture: '',
      calories: 0,
      proteins: 0,
      carbohydrates: 0,
      fat: 0
    }, callback())

  nameHandler = (name) => (this.setState({ name }))

  dropDownCategoryHandler = (event, index, value) => {
    this.setState({ category: value });
  }

  dropDownFavoriteHandler = (event, index, value) => {
    this.setState({ isFavorite: value });
  }

  pictureHandler = (picture) => (this.setState({ picture }))

  caloriesHandler = (calories) => {
    if (calories % 1 === 0) {
      this.setState({ calories })
    } else {
      alert('An integer is required in this field')
    }
  }

  proteinsHandler = (proteins) => {
    if (proteins % 1 === 0) {
      this.setState({ proteins })
    } else {
      alert('An integer is required in this field')
    }
  }

  carbohydratesHandler = (carbohydrates) => {
    if (carbohydrates % 1 === 0) {
      this.setState({ carbohydrates })
    } else {
      alert('An integer is required in this field')
    }
  }

  fatHandler = (fat) => {
    if (fat % 1 === 0) {
      this.setState({ fat })
    } else {
      alert('An integer is required in this field')
    }
  }

  render() {
    return (
      <div>
        <Container>
          <h1>Add new product</h1>
        </Container>
        <Container>
          <div style={style.wrapper}>
            <h2>Complete all this fields to add new product:</h2>
            <AddProductPart
              nameHandler={this.nameHandler}
              categoryState={this.state.category}
              categoryHandler={this.dropDownCategoryHandler}
              favoriteState={this.state.isFavorite}
              favoriteHandler={this.dropDownFavoriteHandler}
              pictureState={this.state.picture}
              pictureHandler={this.pictureHandler}
              caloriesHandler={this.caloriesHandler}
              caloriesState={this.state.calories}
              proteinsHandler={this.proteinsHandler}
              proteinsState={this.state.proteins}
              carbohydratesHandler={this.carbohydratesHandler}
              carbohydratesState={this.state.carbohydrates}
              fatHandler={this.fatHandler}
              fatState={this.state.fat}
            />
          </div>
        </Container>
        <Container>
          <RaisedButton
            label={<b>Add!</b>}
            onClick={this.addToDatabase}
            primary={true}
            fullWidth={true}
          />
        </Container>
      </div>
    )
  }
}

export default AddProduct