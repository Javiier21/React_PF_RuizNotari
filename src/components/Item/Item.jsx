import { Link } from "react-router-dom";
import '../../../node_modules/flowbite/dist/flowbite.css'; // Importar el archivo CSS de FlowBite 

const Item = ({ id, name, img, price }) => {

    const handleClick = (e) => {
        e.stopPropagation();
        console.log('item');
    }

    return (
        <div onClick={handleClick} className="card p-4" style={{ maxWidth: '300px', margin: '10px' }}>
            <h2 className="title is-4">{name}</h2>
            <img src={img} alt={name} className="image" style={{ width: '100%', marginBottom: '10px' }} />
            <h3 className="subtitle is-5">${price}</h3>
            <Link to={`/detail/${id}`} className="button is-link is-light">Ver Detalle</Link>
        </div>
    );
}

export default Item;
