import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Container from './UI/Container'
import Slider from 'material-ui/Slider';
import Toggle from 'material-ui/Toggle';




class ProductsSearchList extends React.Component {

    state = {
        lookingProduct: '', // część tekstu po którym jest wyszukiwany produkt
        productsList: [], // kompletna baza danych 
        filtredListOfProductByTextField: [], // lista produktów przefiltrowana przez wyszukiwarkę po nazwie 
        filtredListOfProductBySlider: [], // lista produktów przefiltrowana przez slider i wyszukiwarkę po nazwie  // LISTA WYŚWIETLENIA
        calories: 500, //kalorie
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
                if (this.state.lookingProduct === '') this.setState({ filtredListOfProductByTextField: this.state.productsList })
            }
            )


    }


    handleSlider = (event, value) => {

        this.setState({ calories: value });
        this.searchProducts()
    }


    searchProducts = () => {



        this.setState({
            filtredListOfProductBySlider: this.state.filtredListOfProductByTextField.filter((el, i, arr) => {
                if (el.value.kcal < this.state.calories && el.value.name.indexOf(this.state.lookingProduct) != -1) return true
            })
        })
    }


    // filtrowanie produktów po wpisywaniu nazwy do textFieldu
    // jeżeli nic nie jest wpisane wyświetl wszystkie
    // if (this.state.lookingProduct == '') this.setState({ filtredListOfProductByTextField: this.state.productsList })
    //     else {

    //         this.setState({ filtredListOfProductBySlider: this.state.filtredListOfProductByTextField })
    //     } //NIE WCHODZI DO ELSA :/ 


    //     //filtrowanie produktów za pomocą slidera (kalorie)

    //     if (this.state.toggleButtonState) {

    //     }

    render() {
        return (
            <Container>
                <TextField
                    hintText={'Type name of looking product'}
                    fullWidth={true}
                    onChange={(target, newValue) => {
                        this.setState({ lookingProduct: newValue })
                        this.searchProducts()
                    }}// w onChange-u filter 
                />
                <Container>
                    <Slider
                        min={0}
                        max={500}
                        step={1}
                        value={this.state.calories}
                        onChange={
                            (event, value) =>
                                this.handleSlider(event, value)
                        }
                    />
                    <p>
                        <span>{'Value of calories: '}</span>
                        <span>{this.state.calories}</span>
                    </p>
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