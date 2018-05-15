import React from 'react'
// Firebase
import { db } from '../firebase'
// Material-ui
import { MenuItem } from 'material-ui'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import DropDownMenu from 'material-ui/DropDownMenu'
import Container from '../UI/Container'
// Add product logic
import * as logic from './logic'
import AddProductPart from './AddProductPart'

const style = {
  wrapper: {
    diplay: 'flex',
    flexGrow: 1,
    maxWidth: '500px'
  },
  centered: {
    textAlign: 'center'
  }
}

class AddProduct extends React.Component {
  state = {
    products: this.props.products,
    name: '',
    category: 'other',
    isFavorite: true,
    picture: '',
    kcal: '',
    proteins: '',
    carbohydrates: '',
    fat: ''
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
              name={true}
            />

            <AddProductPart
              category={true}
            />

            <AddProductPart
              favorite={true}
            />

            <AddProductPart
              calories={true}
            />

            <AddProductPart
              proteins={true}
            />

            <span>Carbohydrates: </span>
            <TextField
              floatingLabelText="Number is required"
              floatingLabelFixed={true}
              name={'new-product-kcal'}
              hintText={'Type carbohydrates per 100g'}
              fullWidth={false}
              onChange={(event, value) => { logic.carbohydratesHandler(value) }}
              value={this.state.carbohydrates}
            />
            <br />
            <div>
              <span>Fat: </span>
              <TextField
                floatingLabelText="Number is required"
                floatingLabelFixed={true}
                name={'new-product-kcal'}
                hintText={'Type fat per 100g'}
                fullWidth={false}
                onChange={(event, value) => { logic.fatHandler(value) }}
                value={this.state.fat}
              />
            </div>
          </div>
        </Container>
        <Container>
          <RaisedButton
            label={<b>Add!</b>}
            onClick={logic.addToDatabase}
            primary={true}
            fullWidth={true}
          />
        </Container>
      </div>
    )
  }
}

export default AddProduct