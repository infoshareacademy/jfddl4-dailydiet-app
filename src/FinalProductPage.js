import React from 'react'
import {List, ListItem} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'
import ReactPaginate from 'react-paginate';
import {Link} from 'react-router-dom'

const ITEMS_PER_PAGE = 10

const upper = word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

class Products extends React.Component {
    state = {
        products: this.props.products,
        numberOfPages: 0,
        activePage: 0
    }

    componentDidMount() {
        const dataInArray = (
            Object.entries(this.props.products)
                .map(el => ({
                    value: el[1].name,
                }))

        )
        this.setState({
            numberOfPages: Math.ceil(dataInArray.length / ITEMS_PER_PAGE)
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
                                                      primaryText={upper(aProduct.name)}
                                                      insetChildren={true}
                                                      containerElement={<Link to={`product/${aProduct.key}`}/>}
                                                      leftAvatar={<Avatar src={aProduct.picture} alt={(aProduct.name)}/>}
                                                      rightAvatar={
                                                          <IconButton><StarBorder
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