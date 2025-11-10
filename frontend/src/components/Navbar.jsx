import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

    const logout = () => {
        navigate('/login');
        localStorage.removeItem('token');
        setToken('');
        setCartItems({});
    };

    return (
        <div className='flex items-center justify-between py-5 px-4 sm:px-8 bg-white shadow-md sticky top-0 z-50'>
            {/* Logo */}
            <Link to='/' className='flex items-center'>
                <img src={assets.logo} className='w-36' alt="Logo" />
            </Link>

            {/* Desktop Menu */}
            <ul className='hidden sm:flex gap-6 text-gray-700 font-medium text-sm'>
                {['/', '/collection', '/about', '/contact'].map((path, idx) => {
                    const labels = ['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'];
                    return (
                        <NavLink
                            key={idx}
                            to={path}
                            className={({ isActive }) =>
                                `relative flex flex-col items-center gap-1 hover:text-purple-600 transition-colors duration-200 ${
                                    isActive ? 'text-purple-700 font-semibold' : ''
                                }`
                            }
                        >
                            <p>{labels[idx]}</p>
                            <span className='absolute bottom-0 w-6 h-[2px] bg-purple-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left'></span>
                        </NavLink>
                    );
                })}
            </ul>

            {/* Icons */}
            <div className='flex items-center gap-5'>
                <img
                    onClick={() => { setShowSearch(true); navigate('/collection'); }}
                    src={assets.search_icon}
                    className='w-5 cursor-pointer hover:scale-110 transition-transform'
                    alt="Search"
                />

                {/* Profile */}
                <div className='relative group'>
                    <img
                        onClick={() => token ? null : navigate('/login')}
                        src={assets.profile_icon}
                        className='w-6 cursor-pointer hover:scale-110 transition-transform'
                        alt="Profile"
                    />
                    {token && (
                        <div className='absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-lg py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50'>
                            <p className='px-4 py-2 hover:bg-purple-50 cursor-pointer' onClick={() => navigate('/profile')}>My Profile</p>
                            <p className='px-4 py-2 hover:bg-purple-50 cursor-pointer' onClick={() => navigate('/orders')}>Orders</p>
                            <p className='px-4 py-2 hover:bg-purple-50 cursor-pointer' onClick={logout}>Logout</p>
                        </div>
                    )}
                </div>

                {/* Cart */}
                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} className='w-6 cursor-pointer hover:scale-110 transition-transform' alt="Cart" />
                    {getCartCount() > 0 && (
                        <span className='absolute -right-2 -bottom-2 w-5 h-5 text-[10px] text-white bg-purple-600 rounded-full flex items-center justify-center'>
                            {getCartCount()}
                        </span>
                    )}
                </Link>

                {/* Mobile Menu */}
                <img
                    onClick={() => setVisible(true)}
                    src={assets.menu_icon}
                    className='w-6 cursor-pointer sm:hidden hover:scale-110 transition-transform'
                    alt="Menu"
                />
            </div>

            {/* Mobile Sidebar */}
            <div className={`fixed top-0 right-0 h-full bg-white shadow-lg z-50 transition-transform duration-300 ${visible ? 'translate-x-0' : 'translate-x-full'} w-3/4 max-w-xs`}>
                <div className='flex flex-col h-full'>
                    <div className='flex items-center justify-between p-4 border-b'>
                        <p className='font-semibold text-gray-700'>Menu</p>
                        <img onClick={() => setVisible(false)} src={assets.dropdown_icon} className='w-5 rotate-45 cursor-pointer' alt="Close" />
                    </div>
                    <nav className='flex flex-col mt-4'>
                        {['/', '/collection', '/about', '/contact'].map((path, idx) => {
                            const labels = ['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'];
                            return (
                                <NavLink
                                    key={idx}
                                    to={path}
                                    onClick={() => setVisible(false)}
                                    className='py-3 px-6 hover:bg-purple-50 transition-colors text-gray-700 font-medium'
                                >
                                    {labels[idx]}
                                </NavLink>
                            );
                        })}
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
