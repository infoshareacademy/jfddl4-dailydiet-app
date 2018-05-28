import React from 'react'
import TextField from 'material-ui/TextField'
import Container from '../UI/Container'
import Slider from 'material-ui/Slider'
// Firebase
import { db } from '../firebase'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import { List } from 'material-ui'
import ListElement from '../ListElement'
import DialogFavorites from '../favorites/DialogFavorites'
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom'

import ShareButtonFacebook from './ShareButtonFacebook'

import { connect } from 'react-redux'
import { searchCalories, searchCategory } from '../state/productSearchList'



const ITEMS_PER_PAGE = 10

const upper = word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

class ProductsSearchList extends React.Component {

    state = {
        searchPhrase: '',
        numberOfPages: 0,
        isDialogOpen: false,
        activePage: 0,
        filteredListOfProduct: this.props.products
    }

    setSearchPhrase = (newValue) => {
        this.setState({
            searchPhrase: newValue
        }, () => this.filteredListOfProduct())
    }

    handlePageClick = (e) => {
        this.setState({
            activePage: e.selected
        })
    }

    maxSliderValue = () => {

        let arrayOfKcal = this.props.products.map((el) => el.kcal)
        let max = Math.max.apply(null, arrayOfKcal)
        return max
    }

    filteredListOfProduct = () => {
        let filteredListOfProduct = this.props.products.filter((el) => {
            if (el.kcal < this.props.calories && el.name.includes(this.state.searchPhrase.toLowerCase())) {
                return true
            }
            else return false
        }).filter((el) => {
            if (this.props.category === 'every') return true
            else if (el.category === this.props.category) return true
            else return false
        })

        let numberOfPages = Math.ceil(filteredListOfProduct.length / ITEMS_PER_PAGE)

        this.setState({
            filteredListOfProduct,
            numberOfPages
        })
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

    render() {

        return (
            <div>
                <Container>
                    <Container>
                        <TextField
                            hintText={'What product are you looking for?'}
                            fullWidth={true}
                            onChange={(event, newValue) => this.setSearchPhrase(newValue)}
                        />
                    </Container>

                    <Container>
                        {this.props.products.length ? <div>
                            <div style={{
                                display: 'flex',
                                justifyContent: "space-between"
                            }}>
                                <span>0 kcal</span>
                                <span> {this.maxSliderValue()} kcal</span>
                            </div>
                            <Slider
                                min={0}
                                max={this.props.products.length ? this.maxSliderValue() : 1000}
                                step={1}
                                value={this.props.products.length ? this.props.calories : this.maxSliderValue()}
                                onChange={(event, value) => this.props.setSearchCalories(value)}
                            />
                            <p>
                                <span>{'Value of calories: '}</span>
                                <span>{this.props.calories} kcal</span>
                            </p>

                            <DropDownMenu
                                value={this.props.category}
                                onChange={(obj, e, newVal) => { this.props.setSearchCategory(newVal) }}
                                openImmediately={false}>

                                <MenuItem value={'every'} primaryText="Every" />
                                <MenuItem value={'other'} primaryText="Other" />
                                <MenuItem value={'dairy'} primaryText="Dairy" />
                                <MenuItem value={'sweets'} primaryText="Sweets" />
                                <MenuItem value={'drinks'} primaryText="Drinks" />
                                <MenuItem value={'fruit'} primaryText="Fruit" />
                                <MenuItem value={'vegetable'} primaryText="Vegetable" />
                                <MenuItem value={'meat'} primaryText="Meat" />

                            </DropDownMenu></div>
                            : 'Loading...'}
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
    products: state.products,
    calories: state.productSearchList.calories,
    category: state.productSearchList.option
})

const mapDispatchToProps = dispatch => ({

    setSearchCalories: (newValue) => dispatch(searchCalories(newValue)),
    setSearchCategory: (newValue) => dispatch(searchCategory(newValue))

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductsSearchList)
