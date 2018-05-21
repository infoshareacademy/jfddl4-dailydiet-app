import React from 'react'
import {connect} from 'react-redux'

import {List} from 'material-ui';
import ListElement from '../ListElement';

import {upper} from '../utils'

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

                </List>
        }
    </div>
)

const mapStateToProps = state => ({
    products: state.products
})

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Library)