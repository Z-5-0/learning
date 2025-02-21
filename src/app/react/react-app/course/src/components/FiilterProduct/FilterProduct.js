import './FilterProduct.scss'

let FilterProduct = (props) => {

    const onFilterChanged = (event) => {
        props.productFilter(event.target.value);
    }

    return (
        <div className="list-group shadow filter">
            <select name="isAvailable" onChange={onFilterChanged}>
                <option value="all">All</option>
                <option value="isAvailable">Available</option>
                <option value="unavailable">Unavailable</option>
            </select>
        </div>
    )
}

export default FilterProduct;