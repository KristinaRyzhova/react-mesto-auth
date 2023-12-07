import Logo from '../images/Logo.svg';

function Header() {
  return (
    <>
      <header className="header">
        <img src={Logo} alt="логотип проекта" className="header__logo" />
      </header>
    </>
  );
};

export default Header;