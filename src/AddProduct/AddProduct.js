import React from 'react'
// Firebase
import { db } from '../firebase'
// Material-ui
import RaisedButton from 'material-ui/RaisedButton'
import Container from '../UI/Container'
// Add product views
import AddProductPart from './AddProductPart'
import * as logic from './addProductLogic'

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

  dropDownCategoryHandler = (event, index, value) => {
    this.setState({ category: value })
  }

  dropDownFavoriteHandler = (event, index, value) => {
    this.setState({ isFavorite: value })
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
              nameHandler={(val) => logic.nameHandler(this, 'name', val)}
              categoryState={this.state.category}
              categoryHandler={this.dropDownCategoryHandler}
              favoriteState={this.state.isFavorite}
              favoriteHandler={this.dropDownFavoriteHandler}
              pictureState={this.state.picture}
              pictureHandler={(val) => logic.pictureHandler(this, 'picture', val)}
              caloriesHandler={(val) => logic.nutrientsHandler(this, 'calories', val)}
              caloriesState={this.state.calories}
              proteinsHandler={(val) => logic.nutrientsHandler(this, 'proteins', val)}
              proteinsState={this.state.proteins}
              carbohydratesHandler={(val) => logic.nutrientsHandler(this, 'carbohydrates', val)}
              carbohydratesState={this.state.carbohydrates}
              fatHandler={(val) => logic.nutrientsHandler(this, 'fat', val)}
              fatState={this.state.fat}
            />
          </div>
        </Container>
        <Container>
          <RaisedButton
            label={<b>Add!</b>}
            onClick={() => logic.addToDatabase(this, db)}
            primary={true}
            fullWidth={true}
          />
        </Container>
      </div>
    )
  }
}

export default AddProduct