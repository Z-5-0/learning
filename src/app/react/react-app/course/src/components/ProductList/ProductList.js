import Products from "./Products";

function ProductList(props) {
    return (
        !props.productList.length
            ? (<h3>There are no products</h3>)
            : (
                <ul className="list-group shadow">
                    {props.productList.map(product => (
                        <Products
                            key={product?.id}
                            id={product?.id}
                            name={product?.name}
                            desc={product?.desc}
                            isAvailable={product?.isAvailable}
                            image={product?.image}
                            price={product?.price}
                            stock={product?.stock}
                        />
                    ))}
                </ul>
            )
    )
}

export default ProductList;