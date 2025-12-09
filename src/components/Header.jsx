import './Header.css';

export const Header = () => {
    return (
        <header className='header'>
            <a className='header__edit btn'>Edit Users</a>
            <a className='header__users btn'>Users</a>
        </header>
    )
};