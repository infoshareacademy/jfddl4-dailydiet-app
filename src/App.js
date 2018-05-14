import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// Material-ui
import AppBar from 'material-ui/AppBar'
import { orange500 } from 'material-ui/styles/colors'
// Components
import readFromDatabase from './logic'
import Sidebar from './Sidebar'
import Dashboard from './Dashboard'
import ProductsSearchList from './ProductsSearchList'
import SingleProductSite from './SingleProductSite'
import FavoriteProducts from './favorites'
import AddProduct from './AddProduct'

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
              path={'/add-product'}
              component={AddProduct}
            />
            <Route
              path={'/product/:product'}
              render={() => (
                <SingleProductSite
                  product='Potato'
                />
              )}
            />
            <Route
              path={'/favorites'}
              component={() => (
                <FavoriteProducts
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
