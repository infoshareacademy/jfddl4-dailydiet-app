import React, { Component } from 'react';
import Dashboard from './Dashboard';
import ProductsSearchList from './ProductsSearchList';
import Sidebar from './Sidebar'
import SingleProductSite from './SingleProductSite';




class App {
  render() {
    return (
      <div>
        <Sidebar />

        <Dashboard />
        <ProductsSearchList />
        <SingleProductSite />
      </div>
    )
  }
}


export default App;
