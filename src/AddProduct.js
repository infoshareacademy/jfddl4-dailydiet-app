import React from 'react'
// Firebase
import { db } from './firebase'
// Material-ui
import { MenuItem } from 'material-ui'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import DropDownMenu from 'material-ui/DropDownMenu'
// Components
import DialogFavorites from './favorites/DialogFavorites'

const style = {
  wrapper: {
    diplay: 'flex',
    flexGrow: 1,
    maxWidth: '500px'
  }
}

class AddProduct extends React.Component {
  state = {
    name: '',
    category: 'other',
    isFavorite: true,
    picture: '',
    kcal: 0,
    proteins: 0,
    carbohydrates: 0,
    fat: 0
  }

  addToDatabase = () => {
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
      }).then(() => this.setState({
        name: '',
        category: 'other',
        isFavorite: true,
        picture: '',
        kcal: 0,
        proteins: 0,
        carbohydrates: 0,
        fat: 0
      }))
  }

  dropDownCategoryHandler = (event, index, value) => {
    this.setState({ category: value });
  }

  dropDownFavoriteHandler = (event, index, value) => {
    this.setState({ isFavorite: value });
  }

  nameHandler = (name) => (this.setState({ name }))

  categoryHandler = (category) => (this.setState({ category }))

  isFavoriteHandler = (isFavorite) => (this.setState({ isFavorite }))

  pictureHandler = (picture) => (this.setState({ picture }))

  kcalHandler = (kcal) => {
    if (kcal % 1 === 0) {
      this.setState({ kcal })
    } else {
      alert('A number is required in this field')
      this.setState({ kcal: 0 })
    }
  }

  proteinsHandler = (proteins) => { this.setState({ proteins }) }

  carbohydratesHandler = (carbohydrates) => { this.setState({ carbohydrates }) }

  fatHandler = (fat) => { this.setState({ fat }) }

  render() {
    return (
      <div>
        <div style={style.wrapper}>
          <h1>Add new product</h1>
          <h2>Complete all this fields to add new product:</h2>
          <span>Type name: </span>
          <TextField
            name={'new-product-name'}
            hintText={'e.g. avokado'}
            fullWidth={false}
            onChange={(event, value) => this.nameHandler(value)}
          />
          <br />
          <span> Choose category: </span>
          <DropDownMenu
            value={this.state.category}
            onChange={this.dropDownCategoryHandler}
            openImmediately={false}
          >
            <MenuItem value={'other'} primaryText="Other" />
            <MenuItem value={'dairy'} primaryText="Dairy" />
            <MenuItem value={'sweets'} primaryText="Sweets" />
            <MenuItem value={'drinks'} primaryText="Drinks" />
            <MenuItem value={'fruit'} primaryText="Fruit" />
            <MenuItem value={'vegetable'} primaryText="Vegetable" />
            <MenuItem value={'meat'} primaryText="Meat" />
          </DropDownMenu>
          <br />
          <span>Mark as favorite: </span>
          <DropDownMenu
            value={this.state.isFavorite}
            onChange={this.dropDownFavoriteHandler}
            openImmediately={false}
          >
            <MenuItem value={true} primaryText={'Yes'} />
            <MenuItem value={false} primaryText={'No'} />
          </DropDownMenu>
          <br />
          <span>Paste image link: </span>
          <TextField
            name={'new-product-picture'}
            floatingLabelText="Required .jpg or .png formats"
            floatingLabelFixed={true}
            hintText={'e.g https://freepik.com/...jpg'}
            fullWidth={false}
            onChange={(event, value) => this.pictureHandler(value)}
          />
          <br />
          <span>Calories: </span>
          <TextField
            floatingLabelText="Number is required"
            floatingLabelFixed={true}
            name={'new-product-kcal'}
            hintText={'Type calories per 100g'}
            fullWidth={false}
            onChange={(event, value) => { this.kcalHandler(value) }}
            value={this.state.kcal}
          />
          <br />
          <span>Proteins: </span>
          <TextField
            floatingLabelText="Number is required"
            floatingLabelFixed={true}
            name={'new-product-kcal'}
            hintText={'Type proteins per 100g'}
            fullWidth={false}
            onChange={(event, value) => { this.proteinsHandler(value) }}
            value={this.state.proteins}
          />
          <br />
          <span>Carbohydrates: </span>
          <TextField
            floatingLabelText="Number is required"
            floatingLabelFixed={true}
            name={'new-product-kcal'}
            hintText={'Type carbohydrates per 100g'}
            fullWidth={false}
            onChange={(event, value) => { this.carbohydratesHandler(value) }}
            value={this.state.carbohydrates}
          />
          <br />
          <span>Fat: </span>
          <TextField
            floatingLabelText="Number is required"
            floatingLabelFixed={true}
            name={'new-product-kcal'}
            hintText={'Type fat per 100g'}
            fullWidth={false}
            onChange={(event, value) => { this.fatHandler(value) }}
            value={this.state.fat}
          />
        </div>
        <div style={style.wrapper}>
          <RaisedButton
            label={<b>Add!</b>}
            onClick={this.addToDatabase}
            primary={true}
            fullWidth={true}
          />
        </div>
      </div>
    )
  }
}

export default AddProduct