import React, { useState } from 'react';
import Button from './Button';

function ProductDetails(props) {
    let [productCount, updateCount] = useState(0);

    function displayFormattedProductCount() {
        const returnValue = <small>zero</small>; // változó is kaphat JSX kifejez
        // return productCount1 > 0 ? productCount1 : 'Zero';
        // return productCount1 > 0 ? productCount1 : <small>zero</small>;
        return productCount > 0 ? productCount : returnValue;
    }

    let decrementCount = function () {
        updateCount(--productCount);
        // updateCount(productCount--); // post decrement operátor, a változáshoz két kattintás szükséges
    }

    let incrementCount = function () {
        updateCount(++productCount);
        // updateCount(productCount++); // post increment operátor, a változáshoz két kattintás szükséges
    }

    return (
        <div className="d-flex align-items-center justified-content-between mt-1">
            <h6 className="font-weight-bold my-2 pe-2">
                {props.price} HUF
            </h6>
            <Button eventHandler={decrementCount}>-</Button>
            <span>{displayFormattedProductCount()}</span>
            <Button eventHandler={incrementCount}>+</Button>
            {props.children}
        </div>
    )

    /* return React.createElement('div', { className: 'd-flex align-items-center justified-content-between mt-1' },
        React.createElement('h6', { className: 'font-weight-bold my-2 pe-2' }, props.price),
        React.createElement(Button, {}, '-'),
        React.createElement('span', {}, displayFormattedProductCount()),
        React.createElement(Button, {}, '+'),
        props.children
    ) */
}

export default ProductDetails;