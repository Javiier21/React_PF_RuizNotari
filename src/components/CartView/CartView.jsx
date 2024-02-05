import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import '../../../node_modules/flowbite/dist/flowbite.css'; // Importar el archivo CSS de FlowBite 

const CartView = () => {
    const { cart, total, removeItem } = useCart();

    return (
        <div className="container mt-5">
            <h1 className="title is-3 has-text-centered mb-4">CARRITO</h1>
            <div className="columns is-multiline">
                {cart.map(prod => (
                    <div key={prod.id} className="column is-full-mobile is-half-tablet is-one-third-desktop">
                        <div className="card p-4">
                            <h2 className="title is-5">{prod.name}</h2>
                            <h3 className="subtitle is-6">Cantidad: {prod.quantity}</h3>
                            <h3 className="subtitle is-6">Precio unidad: ${prod.price}</h3>
                            <h3 className="subtitle is-6">Subtotal: ${prod.quantity * prod.price}</h3>
                            <button className="button is-danger is-fullwidth mt-3" onClick={() => removeItem(prod.id)}>
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <h1 className="title is-4 has-text-centered mt-4">Total de la compra: ${total}</h1>
            {cart.length > 0 && (
                <Link to='/checkout' className="button is-primary is-fullwidth mt-4">Ir al Checkout</Link>
            )}
        </div>
    );
}

export default CartView;
