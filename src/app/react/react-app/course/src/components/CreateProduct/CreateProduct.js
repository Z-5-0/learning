import { useState } from "react";
import ProductForm from "./ProductForm";

function CreateProduct(props) {
    let [formIsVisible, updateFormVisibility] = useState(false)

    const onCreateProduct = (product) => {
        props.createProduct(product);
        toggleFormVisibility();
    }

    const toggleFormVisibility = () => {
        updateFormVisibility(prev => !prev);
    }

    return (
        <div className="list-group shadow" style={{ backgroundColor: 'white', padding: '10px' }}>
            {formIsVisible
                ? (<ProductForm createProduct={onCreateProduct} cancelForm={toggleFormVisibility}/>)
                : (<button className="btn btn-secondary" onClick={toggleFormVisibility}>Toggle form visibility</button>)
            }
        </div>
    )
}

export default CreateProduct;