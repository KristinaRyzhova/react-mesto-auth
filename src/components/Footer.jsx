function Footer() {
  const today = new Date();
  const year = today.getFullYear();
  return (
    <>
      <footer className="footer">
        <p className="footer__copyright" lang="en">
          © {year} Mesto Russia
        </p>
      </footer>
    </>
  );
};

export default Footer;