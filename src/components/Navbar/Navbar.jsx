import { useEffect, useState } from 'react'
import classes from './Navbar.module.css'
import CartWidget from '../CartWidget/CartWidget'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../../services/firebase/firebaseConfig'
import { getDocs, collection, query, orderBy } from 'firebase/firestore'
import '../../../node_modules/flowbite/dist/flowbite.css'; // Importar el archivo CSS de FlowBite 
 
const Navbar = () => {
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const categoriesCollection = query(collection(db, 'categories'), orderBy('name', 'desc'))

        getDocs(categoriesCollection)
            .then(querySnapshot => {
                
                const categoriesAdapted = querySnapshot.docs.map(doc => {
                    const fields = doc.data()
                    return { id: doc.id, ...fields }
                })

                setCategories(categoriesAdapted)                
            })            
    }, [])

    return (
        <nav className={`navbar is-primary ${classes.container}`} style={{ justifyContent: 'space-around' }}>
            <div className="navbar-brand">
                <h1 onClick={() => navigate('/')} className={`navbar-item ${classes.rojo}`}>Ecommerce</h1>
            </div>
            <div className="navbar-menu">
                <div className="navbar-start">
                    {
                        categories.map(cat => (
                            <Link key={cat.id} to={`/category/${cat.slug}`} className='navbar-item'>
                                {cat.name}
                            </Link>
                        ))
                    }
                </div>
            </div>
            <div className="navbar-end">
                <Link to="/cart" className="navbar-item">
                    <CartWidget />
                </Link>
            </div>
        </nav>
    )
}

export default Navbar