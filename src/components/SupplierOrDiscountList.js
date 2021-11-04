export default function SupplierOrDiscountList({ title, data, cleanList }) {

    return (
        <div className="form-group">
            <label>{title} </label>
            <ul className="list-group">
                {
                    data.map(res =>
                        <li className="list-group-item">
                            {res.name && typeof res.name === 'string' ? res.name : res.reducedPrice}
                        </li>
                    )
                }
            </ul>
            {typeof Object.keys(data).length > 0 ? <button className="" onClick={cleanList}>Clean all</button> : ''}
        </div>
    );
}