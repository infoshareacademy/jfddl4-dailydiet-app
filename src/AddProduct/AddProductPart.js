import React from 'react'
// Material-ui
import { MenuItem } from 'material-ui'
import TextField from 'material-ui/TextField'
import DropDownMenu from 'material-ui/DropDownMenu'

const style = {
  textField: {
    paddingLeft: '2rem',
    textAlign: 'right'
  }
}

const AddProductPart = (props) => (
  <div>
    <span>Type name: </span>
    <br />
    <div
      style={style.textField}
    >
      <TextField
        name={'new-product-name'}
        hintText={'e.g. avocado'}
        fullWidth={true}
        onChange={(event, value) => props.nameHandler(value)}
      />
    </div>
    <br />
    <span> Choose category: </span>
    <br />
    <div
      style={style.textField}
    >
      <DropDownMenu
        value={props.categoryState}
        onChange={props.categoryHandler}
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
    </div>
    <br />
    <span>Mark as favorite: </span>
    <br />
    <div
      style={style.textField}
    >
      <DropDownMenu
        value={props.favoriteState}
        onChange={props.favoriteHandler}
        openImmediately={false}
      >
        <MenuItem value={true} primaryText={'Yes'} />
        <MenuItem value={false} primaryText={'No'} />
      </DropDownMenu>
    </div>
    <br />
    <span>Paste image link: </span>
    <br />
    <div
      style={style.textField}
    >
      <TextField
        name={'new-product-picture'}
        hintText={'e.g https://freepik.com/...jpg'}
        floatingLabelText="Required .jpg or .png formats"
        floatingLabelFixed={true}
        fullWidth={true}
        onChange={(event, value) => props.pictureHandler(value)}
        value={props.pictureState}
      />
    </div>
    <br />
    <span>Calories: </span>
    <br />
    <div
      style={style.textField}
    >
      <TextField
        name={'new-product-kcal'}
        hintText={'Type calories per 100g'}
        floatingLabelText="Number is required"
        floatingLabelFixed={true}
        fullWidth={true}
        onChange={(event, value) => { props.caloriesHandler(value) }}
        value={props.caloriesState}
      />
    </div>
    <br />
    <span>Proteins: </span>
    <br />
    <div
      style={style.textField}
    >
      <TextField
        name={'new-product-kcal'}
        hintText={'Type proteins per 100g'}
        floatingLabelText="Number is required"
        floatingLabelFixed={true}
        fullWidth={true}
        onChange={(event, value) => { props.proteinsHandler(value) }}
        value={props.proteinsState}
      />
    </div>
    <br />
    <span>Carbohydrates: </span>
    <br />
    <div
      style={style.textField}
    >
      <TextField
        name={'new-product-kcal'}
        hintText={'Type carbohydrates per 100g'}
        floatingLabelText="Number is required"
        floatingLabelFixed={true}
        fullWidth={true}
        onChange={(event, value) => { props.carbohydratesHandler(value) }}
        value={props.carbohydratesState}
      />
    </div>
    <br />
    <span>Fat: </span>
    <br />
    <div
      style={style.textField}
    >
      <TextField
        name={'new-product-kcal'}
        hintText={'Type fat per 100g'}
        floatingLabelText="Number is required"
        floatingLabelFixed={true}
        fullWidth={true}
        onChange={(event, value) => { props.fatHandler(value) }}
        value={props.fatState}
      />
    </div>
  </div>
)

export default AddProductPart