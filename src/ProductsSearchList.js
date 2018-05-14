import React from 'react'
import TextField from 'material-ui/TextField'
import Container from './UI/Container'
import Slider from 'material-ui/Slider';
// Firebase
import { db } from './firebase'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { List } from 'material-ui';
import ListElement from './ListElement';
import DialogFavorites from './favorites/DialogFavorites';
import ShareButtonFacebook from './ShareButtonFacebook'


class ProductsSearchList extends React.Component {

    state = {
        lookingProduct: '', // część tekstu po którym jest wyszukiwany produkt
        productsList: this.props.products, // kompletna baza danych 
        filtredListOfProduct: [], // lista produktów przefiltrowana przez wyszukiwarkę po nazwie 
        calories: 700, //kalorie
        valueDropMenu: 'every',
        isDialogOpen: false,
        productName: '',
        productKey: '',
        productIsFavorite: null
    }

    componentDidMount() { // pobranie danych i zamiana na tablice obiektów

        this.searchProducts()
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
    onFavoriteRequest = (name, key, isFavorite) => (
        this.setState({ productName: name, productKey: key, productIsFavorite: isFavorite }, this.isDialogOpenToggler)
    )

    toggleFavorite = () => {
        db.ref(`/products/${this.state.productKey}/isFavorite`)
            .set(!this.state.productIsFavorite)
    }

    isDialogOpenToggler = () => {
        this.setState({ isDialogOpen: !this.state.isDialogOpen })
    }

    searchProducts = () => {

        //wyświetl całą
        this.setState({
            filtredListOfProduct: this.state.productsList.filter((el, i, arr) => {
                if (el.kcal < this.state.calories && el.name.indexOf(this.state.lookingProduct) !== -1) return true
                else return false
            })
                .filter((el) => {
                    if (this.state.valueDropMenu === 'every') return true
                    else if (el.category === this.state.valueDropMenu) return true
                    else return false
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
                <Container>
                    {
                        !this.state.filtredListOfProduct.length ?
                            'Loading...'
                            :
                            <List>
                                {
                                    this.state.filtredListOfProduct
                                        .map(
                                            el => (
                                                <ListElement
                                                    key={el.key}
                                                    productName={el.name}
                                                    productKey={el.key}
                                                    isProductFavorite={el.isFavorite}
                                                    productPicture={el.picture}
                                                    onFavoriteRequest={this.onFavoriteRequest}
                                                />
                                            )
                                        )
                                }
                                <DialogFavorites
                                    openToggler={this.isDialogOpenToggler}
                                    favoriteToggler={this.toggleFavorite}
                                    isOpen={this.state.isDialogOpen}
                                    productIsFavorite={this.state.productIsFavorite}
                                    productName={this.state.productName}
                                />

                            </List>
                    }

                    <Container>
                        <ShareButtonFacebook />
                    </Container>
                </Container>
            </Container>
        )
    }

}

export default ProductsSearchList
