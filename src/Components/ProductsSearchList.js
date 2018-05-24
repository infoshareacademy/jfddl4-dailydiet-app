import React from 'react'
import TextField from 'material-ui/TextField'
import Container from '../UI/Container'
import Slider from 'material-ui/Slider'
// Firebase
import { db } from '../firebase'

import DropDownMenu from './DropDownMenu'
import { List } from 'material-ui'
import ListElement from '../ListElement'
import DialogFavorites from '../favorites/DialogFavorites'
import ReactPaginate from 'react-paginate'

import { upper } from '../logic'
import ShareButtonFacebook from './ShareButtonFacebook'





class ProductsSearchList extends React.Component {

    state = {
        lookingProduct: '', //REDUX
        productsList: this.props.products || [], //REDUX
        filteredListOfProduct: [], //REDUX
        calories: 700, //kalorie //REDUX
        valueDropMenu: 'every', //REDUX


        //BARTKOWY KOMPONENT IS FAVOURITE
        isDialogOpen: false,
        productName: '',
        productKey: '',
        productIsFavorite: null,
        //BARTKOWY KOMPONENT IS FAVOURITE

        //PAGINACJA MAGDY KOMPONENT IS FAVOURITE
        ITEMS_PER_PAGE: 10, // wrzuc w stan
        activePage: 0 //
    }
    componentDidMount() { // pobranie danych i zamiana na tablice obiektów
        this.searchProducts()   /// to mi chyba nie potrzzebne
    }

    handlePageClick = (e) => {
        this.setState({
            activePage: e.selected
        })
    }
// //////////////////////////////////////////////////////////////////////////
// /////////////////////FILTROWANIE LISTY PRODUKTÓW//////////////////////////
// //////////////////////////////////////////////////////////////////////////
//     handleSlider = (event, value) => {  // akcja do reduxa  
//         this.setState({ calories: value }, () => this.searchProducts());

//     }
//     handleTextField = (event, newValue) => { // akcja do reduxa
//         this.setState({ lookingProduct: newValue }, () => this.searchProducts())

//     }
//     handleChange = (event, index, value) => { // akcja do reduxa 
//         this.setState({ valueDropMenu: value }, () => this.searchProducts());
//     }
// ////////////////////////////////////////////////////////////////////////////////

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

    //////////////////////////////////
    //////////////TO IDZIE DO REDUCERA
    //////////////////////////////////

    searchProducts = () => {

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
            filteredListOfProduct: filteredArray, // <=== podmiana zmiennej filtredList ze stora reduxowego
            numberOfPages: Math.ceil(filteredArray.length / this.state.ITEMS_PER_PAGE)
        })


    }

    //////////////////////////////////
    //////////////TO IDZIE DO REDUCERA
    //////////////////////////////////


    render() {

        return (
            <div>
                <Container>

                    <TextField
                        hintText={'Type name of looking product'}
                        fullWidth={true}
                        onChange={(event, newValue) => this.handleTextField(event, newValue)}// w onChange-u filter
                    />

                    <Slider /////// SLIDER WARTOSC POCZATKOWA I KONCOWA(DYNAMICZNIE ZMIENIAJACA SIĘ)
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

                    <DropDownMenu />

                    <Container>

                        {
                            !this.state.filteredListOfProduct.length ?
                                'Loading...'
                                :
                                <List>
                                    {
                                        this.state.filteredListOfProduct // <=== ta zmienna tablicowa będzie brana ze stora
                                            .filter((aProduct, index) => {

                                                return (
                                                    this.state.activePage * this.state.ITEMS_PER_PAGE <= index
                                                    &&
                                                    (this.state.activePage + 1) * this.state.ITEMS_PER_PAGE > index
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
                            pageCount={this.state.numberOfPages} // zmienna brana ze stanu
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}// zmienna brana ze stanu
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

export default ProductsSearchList
