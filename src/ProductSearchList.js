import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Container from './UI/Container'



class ProductsSearchList extends React.Component {

    state = {
        lookingProduct: '', // część tekstu po którym jest wyszukiwany produkt
        productsList: [], // kompletna baza danych 
        filtredListOfProduct: []
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
                    this.state.filtredListOfProduct.map((el)=>(

                        <div key={el.key}> {el.value.name} </div>

                    ))


                }

            </Container>
        )
    }

}

export default ProductsSearchList