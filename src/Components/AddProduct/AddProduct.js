import React from 'react'
// Redux & state
import { connect } from 'react-redux'
import { addNewToDatabase } from '../../state/addNew'
import { handleInternalError } from '../../state/alerts'
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
    this.props.products.filter(el =>
      el.name === lower(this.state.name)
    ).length ?
      this.props.handleInternalError(`${this.state.name} is already in base.`)
      :
      !this.state.name.length ?
        this.props.handleInternalError(`You have to type a name.`)
        :
        this.state.calories !== null || typeof (this.state.calories) !== 'number' ?
          this.props.handleInternalError(`The calories value must be an integer.`)
          :
          this.state.proteins !== null || typeof (this.state.proteins) !== 'number' ?
            this.props.handleInternalError(`The proteins value must be an integer.`)
            :
            this.state.carbohydrates !== null || typeof (this.state.carbohydrates) !== 'number' ?
              this.props.handleInternalError(`The carbohydrates value must be an integer.`)
              :
              this.state.fat !== null || typeof (this.state.fat) !== 'number' ?
                this.props.handleInternalError(`The fat value must be an integer.`)
                :
                () => {
                  this.props.addNewToDatabase(
                    this.state.name,
                    this.state.category,
                    this.state.picture,
                    this.state.calories,
                    this.state.proteins,
                    this.state.carbohydrates,
                    this.state.fat,
                    this.state.isFavorite
                  )
                  logic.clearState()
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
            onClick={() => this.newProductValidation()}
            primary={true}
            fullWidth={true}
          />
        </Container>
        <Snackbar
          open={this.props.imWithAlert}
          message={this.props.alert}
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
    handleInternalError: (error) => dispatch(handleInternalError(error))
  })
)(AddProduct)