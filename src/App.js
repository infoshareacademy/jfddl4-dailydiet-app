import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { db } from './firebase'
// Material-ui
import AppBar from 'material-ui/AppBar'
import { orange500 } from 'material-ui/styles/colors'
// Components
import readFromDatabase from './logic'
import Sidebar from './Sidebar'
import Dashboard from './Dashboard'
import Products from './Components/Products'
import SingleProductSite from './Components/SingleProductSite'

import FavoriteProducts from './favorites'
import AddProduct from './AddProduct'

class App extends React.Component {

    state = {
        isSidebarOpen: false,
        products: []
    }

    componentDidMount() {
        // readFromDatabase(this.setArrayToState)
        db.ref(`/products`)
            .once(
                'value',
                (snapshot) => {
                    const dataInArray =
                        (Object.entries(snapshot.val() || {})
                            .map(([key, value]) => (
                                typeof value === 'object' ?
                                    { ...value, key }
                                    :
                                    { key, value }
                            ))
                        )
                    this.setArrayToState(dataInArray)
                }).then(
                    this.state.products.map(el =>
                        db.ref(`/products/${el.key}`).push({
                            carbohydrates: el.carbohydrates,
                            category: el.category,
                            fat: el.fat,
                            kcal: el.kcal,
                            name: el.name,
                            picture: el.picture,
                            protein: el.protein
                        })
                    )
                )
    }

    setArrayToState = (data) => {
        this.setState({
            products: data
        })
    }

    drawerStateHandler = () => this.setState({
        isSidebarOpen: !this.state.isSidebarOpen
    })

    drawerClose = () => this.setState({
        isSidebarOpen: false
    })

    render() {
        return (
            <div>
                <AppBar
                    title='Daily Diet App'
                    onLeftIconButtonClick={this.drawerStateHandler}
                    style={{
                        backgroundColor: orange500,
                    }}
                />

                <Router>

                    <div>

                        <Sidebar
                            open={this.state.isSidebarOpen}
                            handler={this.drawerStateHandler}
                            close={this.drawerClose}
                        />

                        <Route
                            exact path={'/'}
                            component={Dashboard}
                        />

                        <Route
                            path={'/library'}
                            component={() => (
                                <Products />)}
                        />
                        <Route
                            path={'/product/:product'}
                            component={SingleProductSite}
                        />
                        <Route
                            path={'/favorites'}
                            component={() => (
                                <FavoriteProducts
                                    products={this.state.products}
                                />)}
                        />
                        <Route
                            path={'/add-product'}
                            component={() => (
                                <AddProduct
                                    products={this.state.products}
                                />)}
                        />


                    </div>

                </Router>

            </div>
        )
    }
}

export default App
