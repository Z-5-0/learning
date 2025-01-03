import Products from "./Products";

let products = [
    {
        id: 1,
        name: 'Fresh milk',
        desc: 'Lorem ipsum dolor sit amet',
        isAvailable: true,
        image: 'https://picsum.photos/100/100?blur=2&random=1',
        price: 400
    },
    {
        id: 2,
        name: 'Banana',
        desc: 'Curabitur gravida arcu ac turpis',
        isAvailable: true,
        image: 'https://picsum.photos/100/100?blur=2&random=2',
        price: 230
    },
    {
        id: 3,
        name: 'Onion',
        desc: 'Sed ut perspiciatis unde omnis',
        isAvailable: false,
        image: 'https://picsum.photos/100/100?blur=2&random=3',
        price: 355
    }
]

function ProductList(props) {
    console.log('props: ', props);
    return (
        <div className='row'>
            {JSON.stringify(props.newProduct)}
            <div className='col-lg-8 mx-auto'>
                <ul className="list-group shadow row">
                    {products.map(product => (
                        <Products
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            desc={product.desc}
                            isAvailable={product.isAvailable}
                            image={product.image}
                            price={product.price}
                        />
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ProductList;