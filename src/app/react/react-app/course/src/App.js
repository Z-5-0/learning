// import logo from './logo.svg';
import './App.scss';
import CreateProduct from './components/CreateProduct/CreateProduct';
import FilterProduct from './components/FiilterProduct/FilterProduct';
import ProductList from './components/ProductList/ProductList';
import { useEffect, useState } from 'react';
import Component1 from './components/Sample/Component1';
import Component2 from './components/Sample/Component2';
import PortalComponent from './components/Sample/PortalComponent';
import Modal from './components/Sample/Modal';
import RefsDemo from './components/Sample/RefsDemo';
import Effect from './components/Sample/Effect';
import LoginHeader from './components/LoginApp/LoginHeader';
import LoginForm from './components/LoginApp/LoginForm';
import Home from './components/LoginApp/Home';
import LoginApp from './components/LoginApp/LoginApp';
import ReducerApp from './components/Reducer/ReducerApp';
import Demo from './components/Demo/Demo';
import ClassApp from './components/ClassApp/ClassApp';
import { UserApp } from './components/UserApp/UserApp';
import { CustomHookApp } from './components/CustomHookApp/CustomHookApp';
import { CustomHttpHook } from './components/CustomHTTPHook/CustomHttpHook';
import { Forms } from './components/Forms/Forms';

let products = [
  {
    id: 1,
    name: 'Fresh milk',
    desc: 'Lorem ipsum dolor sit amet',
    isAvailable: true,
    image: 'https://picsum.photos/100/100?blur=2&random=1',
    price: 400,
    stock: 8
  },
  {
    id: 2,
    name: 'Banana',
    desc: 'Curabitur gravida arcu ac turpis',
    isAvailable: true,
    image: 'https://picsum.photos/100/100?blur=2&random=2',
    price: 230,
    stock: 5
  },
  {
    id: 3,
    name: 'Onion',
    desc: 'Sed ut perspiciatis unde omnis',
    isAvailable: false,
    image: 'https://picsum.photos/100/100?blur=2&random=3',
    price: 355,
    stock: 12
  }
]

function App() {
  /* APP 1 */
  let [productList, updateProductList] = useState(products);
  let [productFilterText, updateProductFilterText] = useState('all');

  let [selectedApp, updateSelectedApp] = useState(10);

  let filteredList = productList.filter((product) => {
    return productFilterText === 'all'
      ? product
      : productFilterText === 'isAvailable'
        ? product.isAvailable === true
        : product.isAvailable === false;
  });

  function onCreateProduct(product) {
    updateProductList([...productList, { ...product, id: productList.length + 1 }]); // az új termék a lista végére kerül
  }

  const onProductFilter = (filterText) => {
    updateProductFilterText(filterText);
  }

  const onAppChange = (app) => {
    updateSelectedApp(app);
  }

  /* APP 2 */
  let [showModal, showModalUpdate] = useState(false);

  const toggleModal = () => {
    showModalUpdate(prev => {
      return !prev;
    });
  }

  return (
    <div className='row'>
      <div className='col-lg-8 mx-auto'>
        <div className='d-flex justify-content-between mb-4 gap-5'>
          <h1 className='d-flex flex-nowrap' style={{ whiteSpace: 'nowrap' }}>{`App ` + selectedApp}</h1>
          <div className='d-flex flex-wrap gx-1'>
            <button type='button' className='btn btn-warning btn-sm' onClick={() => onAppChange(1)}>App 1</button>
            <button type='button' className='btn btn-warning btn-sm' onClick={() => onAppChange(2)}>App 2</button>
            <button type='button' className='btn btn-warning btn-sm' onClick={() => onAppChange(3)}>App 3</button>
            <button type='button' className='btn btn-warning btn-sm' onClick={() => onAppChange(4)}>App 4</button>
            <button type='button' className='btn btn-warning btn-sm' onClick={() => onAppChange(5)}>App 5</button>
            <button type='button' className='btn btn-warning btn-sm' onClick={() => onAppChange(6)}>App 6</button>
            <button type='button' className='btn btn-warning btn-sm' onClick={() => onAppChange(7)}>App 7</button>
            <button type='button' className='btn btn-warning btn-sm' onClick={() => onAppChange(8)}>App 8</button>
            <button type='button' className='btn btn-warning btn-sm' onClick={() => onAppChange(9)}>App 9</button>
            <button type='button' className='btn btn-warning btn-sm' onClick={() => onAppChange(10)}>App 10</button>
          </div>
        </div>
        {
          selectedApp === 1 && <>
            <CreateProduct createProduct={onCreateProduct} />
            <FilterProduct productFilter={onProductFilter} />
            <ProductList productList={filteredList} />
          </>
        }
        {
          selectedApp === 2 && <>
            <Component1 />
            <Component2 />
            <button className='btn btn-primary' onClick={toggleModal}>Show modal</button>
            {showModal && <Modal showModal={showModal} toggleModal={toggleModal} />}
            {/*<PortalComponent />*/}
            <div>
              <RefsDemo />
            </div>
            <Effect />
          </>
        }
        {
          selectedApp === 3 && <>
            <LoginApp />
          </>
        }
        {
          selectedApp === 4 && <>
            <ReducerApp />
          </>
        }
        {
          selectedApp === 5 && <>
            <Demo />
          </>
        }
        {
          selectedApp === 6 && <>
            <ClassApp />
          </>
        }
        {
          selectedApp === 7 && <>
            <UserApp />
          </>
        }
        {
          selectedApp === 8 && <>
            <CustomHookApp />
          </>
        }
        {
          selectedApp === 9 && <>
            <CustomHttpHook />
          </>
        }
        {
          selectedApp === 10 && <>
            <Forms />
          </>
        }
      </div>
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
