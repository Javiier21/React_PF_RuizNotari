import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../notification/NotificationService';
import '../../../node_modules/flowbite/dist/flowbite.css'; // Importar el archivo CSS de FlowBite 

const InputCount = ({ onAdd, stock, initial = 1 }) => {
    const [count, setCount] = useState(initial);

    const handleChange = (e) => {
        if (e.target.value <= stock) {
            setCount(e.target.value);
        }
    }

    return (
        <div className="field has-addons">
            <div className="control">
                <input className="input" type="number" onChange={handleChange} value={count} />
            </div>
            <div className="control">
                <button className="button is-primary" onClick={() => onAdd(count)}>Agregar al carrito</button>
            </div>
        </div>
    );
}

const ButtonCount = ({ onAdd, stock, initial = 1 }) => {
    const [count, setCount] = useState(initial);

    const increment = () => {
        if (count < stock) {
            setCount(count + 1);
        }
    }

    const decrement = () => {
        setCount(count - 1);
    }

    return (
        <div className="field has-addons">
            <div className="control">
                <button className="button is-danger" onClick={decrement}>-</button>
            </div>
            <div className="control">
                <p className="input is-size-5 has-text-centered">{count}</p>
            </div>
            <div className="control">
                <button className="button is-success" onClick={increment}>+</button>
            </div>
            <div className="control">
                <button className="button is-primary" onClick={() => onAdd(count)}>Agregar al carrito</button>
            </div>
        </div>
    );
}

const ItemDetail = ({ id, name, category, img, price, stock, description }) => {
    const [inputType, setInputType] = useState('button');

    const { addItem, isInCart } = useCart();

    const { showNotification } = useNotification();

    const ItemCount = inputType === 'input' ? InputCount : ButtonCount;

    const handleOnAdd = (quantity) => {
        const objProductToAdd = {
            id, name, price, quantity
        }
        addItem(objProductToAdd)
        showNotification('success', `Se agregó correctamente ${quantity} ${name}`)
    }

    return (
        <article className="card p-4" style={{ maxWidth: '400px', margin: '20px auto' }}>
            <button className="button is-link is-light" onClick={() => setInputType(inputType === 'input' ? 'button' : 'input')}>
                Cambiar contador
            </button>
            <header>
                <h2 className="title is-4">
                    {name}
                </h2>
            </header>
            <picture>
                <img src={img} alt={name} className="image" style={{ width: '100%', marginBottom: '10px' }} />
            </picture>
            <section>
                <p>
                    Categoria: {category}
                </p>
                <p>
                    Descripción: {description}
                </p>
                <p>
                    Precio: ${price}
                </p>
            </section>
            <footer>
                {!isInCart(id) ? (
                    <ItemCount onAdd={handleOnAdd} stock={stock} />
                ) : (
                    <Link to='/cart' className="button is-primary is-fullwidth">Finalizar compra</Link>
                )}
            </footer>
        </article>
    );
}

export default ItemDetail;
