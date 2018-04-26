import React, { Component } from 'react';
import Dashboard from './Dashboard';
import ProductBrowser from './ProductBrowser';
import Sidebar from './Sidebar'



const App = () => (
  <div>
    <Sidebar />
    <Dashboard />
    <ProductsSearchList />
    <SingleProductSite />
 </div>
)


export default App;
