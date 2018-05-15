import React from 'react'
// Material-ui
import { MenuItem } from 'material-ui'
import TextField from 'material-ui/TextField'
import DropDownMenu from 'material-ui/DropDownMenu'
// Add product logic
import * as logic from './logic'

const AddProductPart = (props) => (
  props.name ?
    <div>
      <span>Type name: </span>
      <TextField
        name={'new-product-name'}
        hintText={'e.g. avocado'}
        fullWidth={false}
        onChange={(event, value) => logic.nameHandler(value)}
      />
      <br />
    </div>
    :
    props.category ?
      <div>
        <span> Choose category: </span>
        <DropDownMenu
          value={this.state.category}
          onChange={logic.dropDownCategoryHandler}
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
      </div>
      :
      props.favorite ?
        <div>
          <span>Mark as favorite: </span>
          <DropDownMenu
            value={this.state.isFavorite}
            onChange={logic.dropDownFavoriteHandler}
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
            value={this.state.picture}
          />
          <br />
        </div>
        :
        props.clories ?
          <div>
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
          </div>
          :
          props.proteins ?
            <div>
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
            </div>
            :
            null
)

export default AddProductPart