import React, { Component } from 'react';
import Dashboard from './Dashboard';
import ProductsSearchList from './ProductsSearchList';
import Sidebar from './Sidebar'
import SingleProductSite from './SingleProductSite';




class App extends React.Component {
  render() {
    return (
      <div>
   
     
        <ProductsSearchList />
        

      </div>
    )
  }
}


export default App;
