import React, { useState } from 'react';

function ProductForm(props) {
    /* let [name, updateName] = useState('');
    let [price, priceName] = useState('');
    
    function nameInputHandler(event) {
        updateName(event.target.value);
    }

    function priceInputHandler(event) {
        priceName(event.target.value);
    } */

    const initalState = {
        name: '',
        price: 0,
        desc: '',
        available: false,
        imgUrl: ''
    }

    let [states, updateStates] = useState(initalState);

    function nameInputHandler(event) {
        updateStates(event.target.value); // felülírja az egész states objektumot egyetlen primitív értékkel
    }

    function priceInputHandler(event) {
        // updateStates({ price: event.target.value }); // így még mindig biztosítani szükséges, hogy a többi kulcs-érték pár nem veszik el
        /* updateStates({
            ...states,
            price: event.target.value
        }); */

        updateStates((prevState) => {
            return { ...prevState, price: event.target.value }
        })
    }

    function handleChange(event) {
        let change;
        let { name, value, checked, type } = event.target;

        switch (type) {
            case 'text':
                change = value;
                break;
            case 'number':
                change = value;
                break;
            case 'checkbox':
                change = checked;
                break;
            case 'file':
                change = value;
                break;
            default: return;
        }

        updateStates((prevState) => {
            return { ...prevState, [name]: change }
        });
    }

    function createProductEventHandler(event) {
        event.preventDefault();
        let product = {
            id: 1,
            name: states.name,
            desc: states.desc,
            isAvailable: states.available,
            image: states.imgUrl,
            price: Number(states.price)
        }

        props.createProduct(product);

        updateStates(initalState);
    }

    return (
        <form className="row g-3" onSubmit={createProductEventHandler}>
            {JSON.stringify(states)} {/* debug-képp */}
            <div className="col-md-6">
                <label htmlFor="name">Product Name</label>
                <input type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Product Name"
                    value={states.name}
                    onChange={handleChange}
                />
            </div>
            <div className="col-md-6">
                <label htmlFor="price">Product Price</label>
                <input type="number"
                    name="price"
                    min="0.01" step="0.01"
                    className="form-control"
                    id="price"
                    placeholder="Product Price"
                    value={states.price}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Product Description</label>
                <input type="text"
                    name="desc"
                    className="form-control"
                    id="description"
                    placeholder="Product Description"
                    value={states.desc}
                    onChange={handleChange}
                />
            </div>

            <div className="form-check form-switch">
                <input className="form-check-input"
                    name="available"
                    type="checkbox"
                    role="switch"
                    id="isAvailable"
                    checked={states.available}
                    onChange={handleChange} />
                <label className="form-check-label" htmlFor="isAvailable">Is product available in stock?</label>
            </div>

            <div className="form-group">
                <label htmlFor="select-image">Select product image</label>
                <input type="file"
                    name="imgUrl"
                    className="form-control"
                    id="select-image"
                    value={states.imgUrl}
                    onChange={handleChange} />
            </div>

            <button type="submit" className="btn btn-primary">Add Product</button>
        </form>
    )
}

export default ProductForm;