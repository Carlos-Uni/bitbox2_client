export default function SupplierOrDiscountList({ title, data, cleanList }) {
    return (
        <div className="">
            <label>{title} </label>
            <div>
                <ul>
                    {
                        data.map(res =>
                            <li>{res.name && typeof res.name === 'string' ? res.name : res.reducedPrice}</li>
                        )
                    }
                </ul>
                {typeof cleanList === 'undefined' ? '' : <button className="" onClick={cleanList}>Clean all</button>}
            </div>
        </div>
    );
}