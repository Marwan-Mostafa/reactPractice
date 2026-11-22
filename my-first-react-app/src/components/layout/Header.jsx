import "./header.css";
import Navbar from "./Navbar";

function Header() {
  return (
    <header className="site-header">
      <div>
        <a href="#" className="site-logo">
          Elzero Web School
        </a>
      </div>
        <Navbar />
    </header>
  );
}
export default Header;
