import React from 'react'
// UI
import style from '../../UI/style'
import { MenuItem } from 'material-ui'
import TextField from 'material-ui/TextField'
import DropDownMenu from 'material-ui/DropDownMenu'

const AddProductPart = (props) => (
  <div>
    <span>Type name: </span>
    <br />
      <TextField
        style={style.addProductInput}
        name={'new-product-name'}
        hintText={'e.g. avocado'}
        fullWidth={true}
        onChange={(event, value) => props.nameHandler(value)}
      />
    <br />
    <span>Choose category:</span>
    <br />
    <div
      style={style.addProductDropDown}
    >
      <DropDownMenu
        style={style.addProductInput}
        value={props.categoryState}
        onChange={() => {props.categoryHandler}}
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
      style={style.addProductDropDown}
    >
      <DropDownMenu
        style={style.addProductInput}
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
      <TextField
        style={style.addProductInput}
        name={'new-product-picture'}
        hintText={'e.g https://freepik.com/...jpg'}
        floatingLabelText="Required .jpg or .png formats"
        floatingLabelFixed={true}
        fullWidth={true}
        onChange={(event, value) => props.pictureHandler(value)}
        value={props.pictureState}
      />
    <br />
    <span>Calories: </span>
    <br />
      <TextField
        style={style.addProductInput}
        name={'new-product-kcal'}
        hintText={'Type calories per 100g'}
        floatingLabelText="Number is required"
        floatingLabelFixed={true}
        fullWidth={true}
        onChange={(event, value) => { props.caloriesHandler(value) }}
        value={props.caloriesState}
      />
    <br />
    <span>Proteins: </span>
    <br />
      <TextField
        style={style.addProductInput}
        name={'new-product-kcal'}
        hintText={'Type proteins per 100g'}
        floatingLabelText="Number is required"
        floatingLabelFixed={true}
        fullWidth={true}
        onChange={(event, value) => { props.proteinsHandler(value) }}
        value={props.proteinsState}
      />
    <br />
    <span>Carbohydrates: </span>
    <br />
      <TextField
        style={style.addProductInput}
        name={'new-product-kcal'}
        hintText={'Type carbohydrates per 100g'}
        floatingLabelText="Number is required"
        floatingLabelFixed={true}
        fullWidth={true}
        onChange={(event, value) => { props.carbohydratesHandler(value) }}
        value={props.carbohydratesState}
      />
    <br />
    <span>Fat: </span>
    <br />
      <TextField
        style={style.addProductInput}
        name={'new-product-kcal'}
        hintText={'Type fat per 100g'}
        floatingLabelText="Number is required"
        floatingLabelFixed={true}
        fullWidth={true}
        onChange={(event, value) => { props.fatHandler(value) }}
        value={props.fatState}
      />
  </div>
)

export default AddProductPart