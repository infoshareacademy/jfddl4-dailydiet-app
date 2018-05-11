import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Container from './UI/Container'
import Slider from 'material-ui/Slider';
import Toggle from 'material-ui/Toggle';




class ProductsSearchList extends React.Component {



    handleSlider = (event, value) => {
        this.setState({ slider: value });
    };




    state = {
        lookingProduct: '', // część tekstu po którym jest wyszukiwany produkt
        productsList: [], // kompletna baza danych 
        filtredListOfProduct: [],
        slider: 500,
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
    }




    searchProducts = () => {

        this.setState({
            filtredListOfProduct: this.state.productsList.filter((el, i, arr) => {

                if (el.value.name.indexOf(this.state.lookingProduct) != -1) return true
            })
        })
    }


    render() {
        return (
            <Container>

                <TextField
                    hintText={'Type name of looking product'}
                    fullWidth={true}
                    onChange={(target, newValue) => this.setState({ lookingProduct: newValue })} // w onChange-u filter 

                />

                <RaisedButton
                    label="Search"
                    primary={true}
                    onClick={() => this.searchProducts()}
                />

                {
                    this.state.filtredListOfProduct.map((el) => (

                        <div key={el.key}> {el.value.name} </div>

                    ))


                }

                <Container>
                    <div>
                        <Toggle
                            label="Simple"
                            
                        />
                        <Slider
                            min={0}
                            max={1000}
                            step={1}
                            value={this.state.slider}
                            onChange={this.handleSlider}
                            onClick={() => alert('works')}
                        />
                        <p>
                            <span>{'Value of calories: '}</span>
                            <span>{this.state.slider}</span>
                        </p>
                    </div>

                </Container>
            </Container>
        )
    }

}

export default ProductsSearchList