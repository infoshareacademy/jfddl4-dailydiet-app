import React from 'react'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
// Firebase
import { db } from './firebase'
// Components
import ListElement from './Components/ListElement'
import DialogFavorites from './favorites/DialogFavorites'
// UI
import Container from './UI/Container'
import TextField from 'material-ui/TextField'
import Slider from 'material-ui/Slider'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import { List } from 'material-ui'

import ShareButtonFacebook from './ShareButtonFacebook'

const ITEMS_PER_PAGE = 10

const upper = word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

class ProductsSearchList extends React.Component {

    state = {
        lookingProduct: '', // część tekstu po którym jest wyszukiwany produkt
        productsList: this.props.products || [], // kompletna baza danych
        filteredListOfProduct: [], // lista produktów przefiltrowana przez wyszukiwarkę po nazwie
        calories: 700, //kalorie
        valueDropMenu: 'every',
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
                                                            product={el}
                                                        />
                                                    )
                                                }
                                            )
                                    }
                                    <DialogFavorites/>

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

export default connect(
    state => ({}),
    () => ({})
)(ProductsSearchList)
