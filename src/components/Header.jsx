import Logo from '../images/Logo.svg';
import { Link, Routes, Route } from 'react-router-dom';

function Header({ email, onExit }) {
  return (
    <>
      <header className="header">
          <img src={Logo} alt="логотип проекта" className="header__logo" />
          <Routes>
            <Route path='/sign-up' element={<Link to='/sign-in' className='header__auth'>Войти</Link>} />
            <Route path='/sign-in' element={<Link to='/sign-up' className='header__auth'>Регистрация</Link>} />
            <Route path='/' element={
              <div className='header__auth-container'>
                <p className='header__email'>{email}</p>
                <Link to='/sign-in' className='header__exit' onClick={onExit}>Выйти</Link>
              </div>} />
          </Routes>
      </header>
    </>
  );
};

export default Header;