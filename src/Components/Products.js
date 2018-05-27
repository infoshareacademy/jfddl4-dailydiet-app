import React from 'react'
import { connect } from 'react-redux'
// Components
import ListElement from './ListElement'
import DialogFavorites from './Favorites/DialogFavorites'
import ShareButtonFacebook from '../ShareButtonFacebook'
// UI
import { List } from 'material-ui';
import Container from '../UI/Container'

const Library = (props) => (
    <div>
        <Container>
            <h1>Library</h1>
        </Container>
        <Container>
            {
                !props.products.length ?
                    'Loading...'
                    :
                    <List>
                        {
                            props.products
                                .map(
                                    el => {
                                        return (
                                            <ListElement
                                                product={el}
                                                key={el.key}
                                            />
                                        )
                                    }
                                )
                        }
                        <DialogFavorites />
                    </List>
            }
        </Container>
        <ShareButtonFacebook />
    </div>
)

const mapStateToProps = state => ({
    products: state.products,
    isDialogOpen: state.favorites.isDialogOpen
})

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Library)