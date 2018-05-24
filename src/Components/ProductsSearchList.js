import React from 'react'
import TextField from 'material-ui/TextField'
import Container from '../UI/Container'
import Slider from 'material-ui/Slider';
// Firebase
import { db } from '../firebase'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { List } from 'material-ui';
import ListElement from '../ListElement';
import DialogFavorites from '../favorites/DialogFavorites';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom'

import ShareButtonFacebook from './ShareButtonFacebook'

import { connect } from 'react-redux'
import { searchPhrase } from '../state/productSearchList'


const ITEMS_PER_PAGE = 10

const upper = word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

class ProductsSearchList extends React.Component {

    state = {

        lookingProduct: '',
        productsList: this.props.products || [],
        filteredListOfProduct: [],
        calories: 700, //kalorie
        valueDropMenu: 'every',


        isDialogOpen: false,
        productName: '',
        productKey: '',
        productIsFavorite: null,
        activePage: 0
    }

    componentDidMount() { // pobranie danych i zamiana na tablice obiektów
        this.searchProducts()
    }

    handlePageClick = (e) => {
        this.setState({
            activePage: e.selected
        })
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

        const filteredArray = this.state.productsList.filter((el, i, arr) => {
            if (el.kcal < this.state.calories && el.name.indexOf(this.state.lookingProduct) !== -1) {
                return true
            }
            else return false
        })
            .filter((el) => {
                if (this.state.valueDropMenu === 'every') return true
                else if (el.category === this.state.valueDropMenu) return true
                else return false
            })


        this.setState({
            filteredListOfProduct: filteredArray,
            numberOfPages: Math.ceil(filteredArray.length / ITEMS_PER_PAGE)
        })


    }


    render() {

        return (
            <div>
                <Container>
                    <TextField
                        hintText={'Type name of looking product'}
                        fullWidth={true}
                        onChange={(event, newValue) => this.props.setSearchPhrase(newValue)}// w onChange-u filter
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
                            !this.state.filteredListOfProduct.length ?
                                'Loading...'
                                :
                                <List>
                                    {
                                        this.state.filteredListOfProduct
                                            .filter((aProduct, index) => {

                                                return (
                                                    this.state.activePage * ITEMS_PER_PAGE <= index
                                                    &&
                                                    (this.state.activePage + 1) * ITEMS_PER_PAGE > index
                                                )
                                            })
                                            .map(
                                                el => {
                                                    return (
                                                        <ListElement
                                                            key={el.key}
                                                            productName={upper(el.name)}
                                                            productKey={el.key}
                                                            isProductFavorite={el.isFavorite}
                                                            productPicture={el.picture}
                                                        />
                                                    )
                                                }
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

                        <ReactPaginate
                            previousLabel={"previous"}
                            nextLabel={"next"}
                            breakLabel={<a href="">...</a>}
                            breakClassName={"break-me"}
                            pageCount={this.state.numberOfPages}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"activePage"}
                        />

                    </Container>
                </Container>
                <ShareButtonFacebook />
            </div>
        )
    }

}


const mapStateToProps = state => ({
    phrase: state.productSearchList.phrase,
    products: state.products
})

const mapDispatchToProps = dispatch => ({

    setSearchPhrase: (newValue) => dispatch(searchPhrase(newValue))

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductsSearchList)
