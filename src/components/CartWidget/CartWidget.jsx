import cartImg from './assets/carrito.png'
import { useCart } from '../../context/CartContext'

const CartWidget = () => {
    const { totalQuantity } = useCart()

    return (
        <button style={{ color: '#FFF' }}>
            <img src={cartImg} alt="Nueva Imagen" className="mr-2" style={{ width: '30px', height: 'auto' }} />
            { totalQuantity }
        </button>
    )
}

export default CartWidget