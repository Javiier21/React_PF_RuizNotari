import { useState } from 'react';
import '../../../node_modules/flowbite/dist/flowbite.css'; // Importar el archivo CSS de FlowBite 

const ItemCount = ({ initialValue, incrementBy }) => {
    const [count, setCount] = useState(0);

    const decrement = () => {
        if (count > 0) {
            setCount((prev) => prev - incrementBy);
        }
    }

    const increment = () => {
        setCount((prev) => prev + incrementBy);
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
                <button className="button is-primary" onClick={() => setCount(initialValue)}>Reiniciar</button>
            </div>
        </div>
    );
}

export default ItemCount;
