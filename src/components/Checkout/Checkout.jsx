import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { db } from "../../services/firebase/firebaseConfig";
import { addDoc, getDocs, collection, query, where, documentId, writeBatch } from 'firebase/firestore';
import { useNotification } from "../../notification/NotificationService";
import '../../../node_modules/flowbite/dist/flowbite.css'; // Importar el archivo CSS de FlowBite 
import { Link } from "react-router-dom";

const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [userData, setUserData] = useState({
        name: "",
        phone: "",
        email: "",
    });

    const { cart, total, clearCart } = useCart();
    const { showNotification } = useNotification();

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createOrder(userData);
    };

    const createOrder = async (userData) => {
        try {
            setLoading(true);
            const objOrder = {
                buyer: {
                    name: userData.name,
                    phone: userData.phone,
                    email: userData.email,
                },
                items: cart,
                total
            };

            const batch = writeBatch(db);
            const outOfStock = [];

            const ids = cart.map(prod => prod.id);

            const productsCollection = query(collection(db, 'products'), where(documentId(), 'in', ids));

            const { docs } = await getDocs(productsCollection);

            docs.forEach(doc => {
                const dataDoc = doc.data();
                const stockDb = dataDoc.stock;

                const productAddedToCart = cart.find(prod => prod.id === doc.id);
                const prodQuantity = productAddedToCart?.quantity;

                if(stockDb >= prodQuantity) {
                    batch.update(doc.ref,{ stock: stockDb - prodQuantity});
                } else {
                    outOfStock.push({ id: doc.id, ...dataDoc });
                }
            });

            if(outOfStock.length === 0) {
                batch.commit();

                const ordersCollection = collection(db, 'orders');
                const { id } = await addDoc(ordersCollection, objOrder);

                clearCart();
                setOrderId(id);
            } else {
                showNotification('error', 'Hay productos que no tienen stock disponible');
            }
        } catch (error){
            showNotification('error', 'Hubo un error generando la orden: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <h1 className="title is-3 has-text-centered mt-5 mb-4">Se está generando su orden...</h1>;
    }

    if (orderId) {
        return (
            <div className="container mt-5">
                <h1 className="title is-3 has-text-centered mb-4">El id de su orden es: {orderId}</h1>
                <div className="has-text-centered">
                    <Link to="/" className="button is-primary">Volver a inicio</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h1 className="title is-3 has-text-centered mb-4">Checkout</h1>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label" htmlFor="name">Nombre:</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            id="name"
                            name="name"
                            value={userData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label" htmlFor="phone">Teléfono:</label>
                    <div className="control">
                        <input
                            className="input"
                            type="tel"
                            id="phone"
                            name="phone"
                            value={userData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label" htmlFor="email">Correo electrónico:</label>
                    <div className="control">
                        <input
                            className="input"
                            type="email"
                            id="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="control mt-4">
                    <button className="button is-primary" type="submit">Generar orden</button>
                </div>
            </form>
        </div>
    );
};

export default Checkout;
