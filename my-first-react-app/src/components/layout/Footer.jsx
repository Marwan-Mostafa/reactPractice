import "./footer.css";

function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="site-footer">
      <strong>Elzero Web School</strong>
      <p>Learn. Practice. Build.</p>
      <small>@{year} - All Rights Reserved</small>
    </footer>
  );
}
export default Footer;
