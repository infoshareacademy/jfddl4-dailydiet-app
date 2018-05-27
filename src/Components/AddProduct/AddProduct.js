import React from 'react'
// Redux & state
import { connect } from 'react-redux'
import { addNewToDatabase } from '../../state/addNew'
import { handleInternalError, clearError } from '../../state/alerts'
// Components
import AddProductForm from './AddProductForm'
// Logic
import * as logic from './logic'
// Utils
import { lower } from '../../utils'
// UI
import style from '../../UI/style'
import { RaisedButton, Snackbar } from 'material-ui'
import Container from '../../UI/Container'

class AddProduct extends React.Component {
  state = {
    products: this.props.products,
    name: '',
    category: 'other',
    picture: '',
    calories: '',
    proteins: '',
    carbohydrates: '',
    fat: '',
    isFavorite: true
  }

  newProductValidation = () => {
    console.log('validation')
    if (this.props.products.filter(el =>
      el.name === lower(this.state.name)
    ).length) {
      this.props.handleInternalError(`${this.state.name} is already in base.`)
    } else if (this.state.name.length) {
      if (this.state.calories * 1 > 0) {
        if (!this.state.proteins || !isNaN(this.state.proteins * 1)) {
          if (!this.state.carbohydrates || !isNaN(this.state.carbohydrates * 1)) {
            if (!this.state.fat || !isNaN(this.state.fat * 1)) {
                this.props.addNewToDatabase(
                  lower(this.state.name),
                  this.state.category,
                  this.state.picture,
                  this.state.calories,
                  this.state.proteins,
                  this.state.carbohydrates,
                  this.state.fat,
                  this.state.isFavorite
                )
                logic.clearState(this)
            } else {
              this.props.handleInternalError(`The fat value must be an integer.`)
            }
          } else {
            this.props.handleInternalError(`The carbohydrates value must be an integer.`)
          }
        } else {
          this.props.handleInternalError(`The proteins value must be an integer.`)
        }
      } else {
        this.props.handleInternalError(`The calories value must be an integer.`)
      }
    } else {
      this.props.handleInternalError(`You have to type a name.`)
    }
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
          <div style={style.wrapped}>
            <h2>Complete all this fields to add new product:</h2>
            <AddProductForm
              nameHandler={(val) => { logic.nameHandler(this, 'name', val); this.props.clearError() }}
              categoryState={this.state.category}
              categoryHandler={this.dropDownCategoryHandler}
              favoriteState={this.state.isFavorite}
              favoriteHandler={this.dropDownFavoriteHandler}
              pictureState={this.state.picture}
              pictureHandler={(val) => { logic.pictureHandler(this, 'picture', val); this.props.clearError() }}
              caloriesHandler={(val) => { logic.nutrientsHandler(this, 'calories', val); this.props.clearError() }}
              caloriesState={this.state.calories}
              proteinsHandler={(val) => { logic.nutrientsHandler(this, 'proteins', val); this.props.clearError() }}
              proteinsState={this.state.proteins}
              carbohydratesHandler={(val) => { logic.nutrientsHandler(this, 'carbohydrates', val); this.props.clearError() }}
              carbohydratesState={this.state.carbohydrates}
              fatHandler={(val) => { logic.nutrientsHandler(this, 'fat', val); this.props.clearError() }}
              fatState={this.state.fat}
            />
          </div>
        </Container>
        <Container>
          <RaisedButton
            label={<b>Add!</b>}
            onClick={this.newProductValidation}
            secondary={true}
            fullWidth={true}
          />
        </Container>
        <Snackbar
          autoHideDuration={4000}
          open={this.props.imWithAlert}
          message={this.props.alert}
          bodyStyle={{ backgroundColor: "#E65100", textAlign: 'center' }}
          onRequestClose={this.props.clearError}
        />
      </div>
    )
  }
}

export default connect(
  state => ({
    imWithAlert: state.alerts.imWithAlert,
    alert: state.alerts.alert
  }),
  dispatch => ({
    addNewToDatabase: (
      name,
      category,
      picture,
      calories,
      proteins,
      carbohydrates,
      fat,
      isFavorite
    ) => dispatch(addNewToDatabase(
      name,
      category,
      picture,
      calories,
      proteins,
      carbohydrates,
      fat,
      isFavorite
    )),
    handleInternalError: (error) => dispatch(handleInternalError(error)),
    clearError: () => dispatch(clearError())
  })
)(AddProduct)