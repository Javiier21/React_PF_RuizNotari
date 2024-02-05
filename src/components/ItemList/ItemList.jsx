import Item from "../Item/Item"

const ItemList = ({ products }) => {
    return(
        <div onClick={() => console.log('list')} className="align-items-center d-flex justify-center" >
        {
            products.map(product => {
                return (
                    <Item key={product.id} {...product}/>
                )
            })
        }
        </div> 
    )
}

export default ItemList