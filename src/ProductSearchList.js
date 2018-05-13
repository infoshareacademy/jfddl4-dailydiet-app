import React from 'react'
import TextField from 'material-ui/TextField'
import Container from './UI/Container'
import Slider from 'material-ui/Slider';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';




class ProductsSearchList extends React.Component {

    state = {
        lookingProduct: '', // część tekstu po którym jest wyszukiwany produkt
        productsList: [], // kompletna baza danych 
        filtredListOfProduct: [], // lista produktów przefiltrowana przez wyszukiwarkę po nazwie 
        calories: 700, //kalorie
        valueDropMenu: 'Every'
    }

    componentDidMount() { // pobranie danych i zamiana na tablice obiektów

        fetch('https://dailydiet-app.firebaseio.com/products/.json')
            .then((response) => response.json())
            .then((myJson) => {
                const dataInArray = (
                    Object.entries(myJson)
                        .map(el => ({
                            key: el[0],
                            value: el[1]
                        }))
                )
                this.setState({ productsList: dataInArray })
                console.log(dataInArray)
            })
            .then(() => { // zapis całej listy produktów do przefiltrowanej listy po to żeby po załadowaniu strony gdy textField jest pusty widoczne były wszystkie produkty
                if (this.state.lookingProduct === '') this.setState({ filtredListOfProduct: this.state.productsList }, () => this.searchProducts())
            }
            )
    }

    handleSlider = (event, value) => {
        this.setState({ calories: value }, () => this.searchProducts());

    }

    handleTextField = (event, newValue) => {
        this.setState({ lookingProduct: newValue }, () => this.searchProducts())

    }

    handleChange = (event, index, value) => {
        this.setState({ valueDropMenu: value }, () => this.searchProducts());
    }
    searchProducts = () => {
        //wyświetl całą
        this.setState({
            filtredListOfProduct: this.state.productsList.filter((el, i, arr) => {
                if (el.value.kcal < this.state.calories && el.value.name.indexOf(this.state.lookingProduct) != -1) return true
            })
            .filter((el) => { 
                if(this.state.valueDropMenu === 'every') return true
                else if (el.value.category === this.state.valueDropMenu ) return true })
       
      
        })
}

render() {
    return (
        <Container>
            <TextField
                hintText={'Type name of looking product'}
                fullWidth={true}
                onChange={(event, newValue) => this.handleTextField(event, newValue)}// w onChange-u filter 
            />
            <Container>
                <Slider
                    min={0}
                    max={700}
                    step={1}
                    value={this.state.calories}
                    onChange={(event, value) => this.handleSlider(event, value)}
                />
                <p>
                    <span>{'Value of calories: '}</span>
                    <span>{this.state.calories}</span>
                </p>
                <DropDownMenu value={this.state.valueDropMenu} onChange={this.handleChange} openImmediately={false}>
                    <MenuItem value={'every'} primaryText="Every" />
                    <MenuItem value={'other'} primaryText="Other" />
                    <MenuItem value={'dairy'} primaryText="Dairy" />
                    <MenuItem value={'sweets'} primaryText="Sweets" />
                    <MenuItem value={'drinks'} primaryText="Drinks" />
                    <MenuItem value={'fruit'} primaryText="Fruit" />
                    <MenuItem value={'vegetable'} primaryText="Vegetable" />
                    <MenuItem value={'meat'} primaryText="Meat" />
                </DropDownMenu>
            </Container>
            {
                this.state.filtredListOfProduct.map((el, i) => (
                    <div key={el.key}>{i} {el.value.name} {el.value.kcal}</div>
                ))
            }
        </Container>
    )
}

}

export default ProductsSearchList