import React from 'react'
import { connect } from 'react-redux'

import { List } from 'material-ui';
import ListElement from './ListElement'

import { upper } from '../utils'
import DialogFavorites from '../favorites/DialogFavorites'

const Library = (props) => (
    <div>
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