import React from 'react'
import { Link, NavLink } from 'react-router-dom'


const Navbar = () => {
    return (
        <div className="navbar navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">Auth</Link>
            <div>
                <div className="d-flex">
                    <Link className="btn btn-dark mr-2" to="/" exact>Accueil</Link>
                    <Link className="btn btn-dark mr-2" to="/admin" exact>Admin</Link>
                    <Link className="btn btn-dark mr-2" to="/login" exact>Login</Link>
                </div>
            </div>

        </div>
    )
}

export default Navbar;

