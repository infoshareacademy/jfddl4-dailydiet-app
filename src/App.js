import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
// Material-ui
import AppBar from 'material-ui/AppBar'
import {orange500} from 'material-ui/styles/colors'

import readFromDatabase from './logic'
import Dashboard from './Dashboard'
import ProductsSearchList from './ProductsSearchList'
import Sidebar from './Sidebar'
import SingleProductSite from './SingleProductSite'
import Products from "./FinalProductPage";

import FavoriteProducts from './favorites'

class App extends React.Component {

    state = {
        isSidebarOpen: false,
        products: null
    }

    componentDidMount() {
        readFromDatabase(this.setArrayToState)
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
                            component={ProductsSearchList}
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
                    <Route //TEMORARY
                        path={'/all'}
                        component={() => (
                            <Products
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
