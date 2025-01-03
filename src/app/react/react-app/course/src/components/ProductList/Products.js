import ProductDetails from './ProductDetails';

/* let isAvailable = 'Available';
let badgeClass = 'badge ';
badgeClass += isAvailable === 'Available' ? 'bg-success' : 'bg-danger'; */

function Products(props) {
    return (
        <li className="list-group-item">
            <div className="media align-items-lg-center flex-column flex-lg-row p3 d-flex justify-content-between">
                <div className="media-body order-2 order-lg-1">
                    <h5 className="mt-0 font-weight-bold mb-2">
                        {props.name}
                    </h5>
                    <p className="font-italic text-muted mb-0 small">
                        {props.desc}
                    </p>
                    <ProductDetails
                        price={props.price}>
                            ID: {JSON.stringify(props.id)}
                    </ProductDetails>
                    <div className={`badge ${props.isAvailable ? 'bg-success' : 'bg-danger'}`}>
                        {props.isAvailable ? 'Available' : 'Unavailable'}
                    </div>
                </div>
                <img src={props.image} alt="" width="100px" className="ml-lg-5 order-1 order-lg-2" />
                {/*<img src={require('' + props.image)} alt="" width="100px" className="ml-lg-5 order-1 order-lg-2" /> külső url, ha az image any típusú, akkor így alakítható string-é  */}
            </div>
        </li>
    )
}

export default Products;