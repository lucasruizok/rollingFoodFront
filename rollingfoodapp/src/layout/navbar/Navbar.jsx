import React, { useContext } from 'react'
import './navbar.css'
import 'antd/dist/antd.css';
import { NavLink } from "react-router-dom";
import { DataContext } from '../../context/DataContext';
import { navbarLinks } from '../../constants/constNavbar';
import { svgLogo } from '../../constants/constLogo';

export const Navbar = () => {

    let activeStyle = {
        textDecoration: "underline",
    };
    const { cart, user, logout } = useContext(DataContext);
    const currentUser = user;

    function collapsenavbar() {
        const navbar = document.getElementById('navbarNavDropdown');
        navbar.classList.remove('show');
    }
    return (
        <>
            <nav className='navbar-expand-lg navbar'>
                <div className='d-flex'>
                    <NavLink to='/'>
                        <div className='logo'>
                            <svg className='logoNav' width="137pt" height="15pt" viewBox="0 0 137 15" xmlns="http://www.w3.org/2000/svg"><g stroke-linecap="round" fill-rule="evenodd" fill="#faebd7"><path d={svgLogo} vector-effect="non-scaling-stroke" /></g></svg>
                        </div>
                    </NavLink>
                </div>
                <button className='navbar-toggler' type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className="collapse navbar-collapse menu" id="navbarNavDropdown">
                    <ul className='navbar-nav menu'>
                        {
                            navbarLinks.map((link) => {
                                return (
                                    !link.protected ?
                                        <li className='nav-item' key={link.key}>
                                            <NavLink
                                                onClick={() => collapsenavbar()}
                                                to={link.path}
                                                style={({ isActive }) =>
                                                    isActive ? activeStyle : undefined
                                                }
                                                className='nav-link'
                                            >
                                                {link.title}
                                            </NavLink>
                                        </li>
                                        :
                                        ''
                                )
                            })
                        }
                        {
                            navbarLinks.map((link) => {
                                return (
                                    link.protected && currentUser?.role === 'admin' ?
                                        <li className='nav-item' key={link.key}>
                                            <NavLink
                                                onClick={() => collapsenavbar()}
                                                to={link.path}
                                                style={({ isActive }) =>
                                                    isActive ? activeStyle : undefined
                                                }
                                                className='nav-link'
                                            >
                                                {link.title}
                                            </NavLink>
                                        </li>
                                        : ''
                                )
                            })
                        }
                    </ul>
                    {!currentUser ? '' :
                        <>
                            <div className='cart-pedidos'>
                                <NavLink
                                    onClick={() => collapsenavbar()}
                                    to='orders'
                                    style={({ isActive }) =>
                                        isActive ? activeStyle : undefined
                                    }
                                    className='nav-link cart-navbar'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">
                                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                    </svg>
                                </NavLink>
                                <span className='item-total-pedidos'>{cart.length}</span>
                            </div>
                        </>
                    }
                </div>
                {
                    currentUser?.nameUser ?
                        <h5 className='m-0'>Bienvenido {currentUser?.nameUser}</h5>
                        : ''
                }
                {
                    currentUser ?
                        <NavLink to='/'
                            className='nav-link btn btn-dark p-2 mx-2 btnLogin'
                            onClick={() => logout()}>
                            Salir
                        </NavLink>
                        :
                        <NavLink to='login'
                            className='nav-link btn btn-success p-2 mx-2 btnLogin'>
                            Ingresar
                        </NavLink>
                }
            </nav>
        </>
    )
}
