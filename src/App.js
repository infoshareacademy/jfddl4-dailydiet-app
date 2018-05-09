import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'

import Dashboard from './Dashboard'
import ProductsSearchList from './ProductsSearchList'
import Sidebar from './Sidebar'
import SingleProductSite from './SingleProductSite'
import Products from "./FinalProductPage";


class App extends React.Component {

  state = {
    isOpen: false,
      products: Products

  }

  drawerStateHandler = () => this.setState({
    isOpen: !this.state.isOpen
  })

  drawerClose = () => this.setState({
    isOpen: false
  })


  render() {

    return (
      <div>
        <AppBar
          title='Daily Diet App'
          onLeftIconButtonClick={this.drawerStateHandler}
        />

        <Router>

          <div>

            <Sidebar
              open={this.state.isOpen}
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
              render={
                () => (<SingleProductSite
                  product='Potato' />)
              }
            />

          </div>

        </Router>
          <Products/>

      </div>
    )
  }
}

export default App
