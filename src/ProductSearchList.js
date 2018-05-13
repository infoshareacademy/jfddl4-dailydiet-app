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
        filtredListOfProductByTextField: [], // lista produktów przefiltrowana przez wyszukiwarkę po nazwie 
        filtredListOfProductBySlider: [], // lista produktów przefiltrowana przez slider i wyszukiwarkę po nazwie  // LISTA WYŚWIETLENIA
        calories: 700, //kalorie
        valueDropMenu: 2
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
            }).then(() => { // zapis całej listy produktów do przefiltrowanej listy po to żeby po załadowaniu strony gdy textField jest pusty widoczne były wszystkie produkty
                if (this.state.lookingProduct === '') this.setState({ filtredListOfProductByTextField: this.state.productsList }, () => this.searchProducts())
            }
            )
    }

    handleSlider = (event, value) => {
        this.setState({ calories: value }, () => this.searchProducts());

    }

    handleTextField = (event, newValue) => {
        this.setState({ lookingProduct: newValue }, () => this.searchProducts())

    }

    handleChange = (event, index, value) => this.setState({valueDropMenu: value});

    searchProducts = () => {
        this.setState({
            filtredListOfProductBySlider: this.state.filtredListOfProductByTextField.filter((el, i, arr) => {
                if (el.value.kcal < this.state.calories && el.value.name.indexOf(this.state.lookingProduct) != -1) return true
            })
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
                    <DropDownMenu value={this.state.valueDropMenu} onChange={this.handleChange} openImmediately={true}>
                        <MenuItem value={1} primaryText="Never" />
                        <MenuItem value={2} primaryText="Every Night" />
                        <MenuItem value={3} primaryText="Weeknights" />
                        <MenuItem value={4} primaryText="Weekends" />
                        <MenuItem value={5} primaryText="Weekly" />
                    </DropDownMenu>
                </Container>
                {
                    this.state.filtredListOfProductBySlider.map((el, i) => (
                        <div key={el.key}>{i} {el.value.name} {el.value.kcal}</div>
                    ))
                }
            </Container>
        )
    }

}

export default ProductsSearchList