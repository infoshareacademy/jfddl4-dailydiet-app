import React, {Component} from 'react'
import {List, ListItem} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'
import ReactPaginate from 'react-paginate';

const ITEMS_PER_PAGE = 5

class Products extends Component {
    state = {
        products: null,
        numberOfPages: 0,
        activePage: 0
    }


    componentDidMount() {
        fetch('https://dailydiet-app.firebaseio.com/products/.json')
            .then((response) => response.json())
            .then((myJson) => {
                const dataInArray = (
                    Object.entries(myJson)
                        .map(el => ({
                            key: el[0],
                            value: el[1].name,
                            pic: el[1].picture
                        }))

                )

                this.setState({
                    products: dataInArray,
                    numberOfPages: Math.ceil(dataInArray.length / ITEMS_PER_PAGE)
                })
                console.log(dataInArray)
            })
    }


    handlePageClick = (e) => {
        this.setState({
            activePage: e.selected
        })
    }


    render() {
        return (
            <div>
                {
                    !this.state.products ?
                        'loading...'
                        :
                        <List>
                            {
                                this.state.products
                                    .filter((aProduct, index) => (
                                        this.state.activePage * ITEMS_PER_PAGE <= index
                                        &&
                                        (this.state.activePage + 1) * ITEMS_PER_PAGE > index
                                    ))
                                    .map(
                                        aProduct => (
                                            <ListItem key={aProduct.key}
                                                      primaryText={aProduct.value}
                                                      insetChildren={true}
                                                      leftAvatar={<Avatar src={aProduct.pic}/>}
                                                      rightAvatar={<IconButton><StarBorder
                                                          color="lightBlue"/></IconButton>}
                                            >

                                            </ListItem>
                                        )
                                    )
                            }
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
            </div>

        )
    }

}

export default Products