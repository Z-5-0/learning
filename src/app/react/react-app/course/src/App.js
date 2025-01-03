// import logo from './logo.svg';
import './App.scss';
import CreateProduct from './components/CreateProduct/CreateProduct';
import ProductList from './components/ProductList/ProductList';
import { useState } from 'react';

function App() {
  let [product, updateProduct] = useState(null);

  function onCreateProduct(product) {
    updateProduct(product);
  }

  return (
    <div>
      <CreateProduct createProduct={onCreateProduct} />
      <ProductList newProduct={product} />
    </div>
  );
}

export default App;

/* function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
} */
