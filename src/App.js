import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// Redux & state
import { connect } from 'react-redux'
import { getFavorites } from './state/favorites'
import { clearError } from './state/alerts'
// Material-ui
import AppBar from 'material-ui/AppBar'
import Snackbar from 'material-ui/Snackbar'
import { orange500 } from 'material-ui/styles/colors'
// Components
import Sidebar from './Sidebar'
import Dashboard from './Components/Dashboard'
import Products from './Components/Products'
import SingleProductSite from './Components/SingleProductSite'
import FavoriteProducts from './Components/Favorites'
import AddProduct from './Components/AddProduct'
import LogOut from './Components/Auth/LogOut'

class App extends React.Component {
    state = {
        isSidebarOpen: false
    }

    componentDidMount() {
        this.props.getFavorites()
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

                <Router>

                    <div>

                        <AppBar
                            title='Daily Diet App'
                            onLeftIconButtonClick={this.drawerStateHandler}
                            iconElementRight={
                                <LogOut />
                            }
                            style={{
                                backgroundColor: orange500,
                            }}
                        />

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
                            component={Products}
                        />
                        <Route
                            path={'/product/:product'}
                            component={SingleProductSite}
                        />
                        <Route
                            path={'/favorites'}
                            component={() => (
                                <FavoriteProducts
                                    products={this.props.products}
                                />)}
                        />
                        <Route
                            path={'/add-product'}
                            component={() => (
                                <AddProduct
                                    products={this.props.products}
                                />)}
                        />


                    </div>

                </Router>

                <Snackbar
                    autoHideDuration={4000}
                    open={this.props.imWithAlert}
                    message={this.props.alert}
                    bodyStyle={{ backgroundColor: "#E65100", textAlign: 'center' }}
                    onRequestClose={this.props.clearError}
                />

            </div>
        )
    }
}

export default connect(
    state => ({
        products: state.products,
        imWithAlert: state.alerts.imWithAlert,
        alert: state.alerts.alert
    }),
    dispatch => ({
        getFavorites: () => dispatch(getFavorites()),
        clearError: () => dispatch(clearError())
    })
)(App)