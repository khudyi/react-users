import { NavLink } from 'react-router-dom';

import './Header.css';

export const Header = () => {
    return (
        <header className='header'>
            <NavLink 
                to='/edit'
                className={({ isActive }) => 
                    isActive ? 'btn header__edit active' : 'btn header__edit'
                }
            >
                Edit Users
            </NavLink>
            <NavLink 
                to='/users'
                className={({ isActive }) => 
                    isActive ? 'btn header__edit active' : 'btn header__edit'
                }
            >
                Users
            </NavLink>
        </header>
    )
};