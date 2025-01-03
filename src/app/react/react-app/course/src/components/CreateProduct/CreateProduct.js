import ProductForm from "./ProductForm";

function CreateProduct(props) {
    function onCreateProduct(product) {
        props.createProduct(product);
    }

    return (
        <div className="row">
            <div className="col-lg-8 mx-auto list-group shadow" style={{ backgroundColor: 'white', marginBottom: '30px', padding: '10px' }}>
                <ProductForm createProduct={onCreateProduct} />
            </div>
        </div>
    )
}

export default CreateProduct;