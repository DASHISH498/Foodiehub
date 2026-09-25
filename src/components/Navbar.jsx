import { Link } from "react-router-dom";
import { Search, Heart, User } from "lucide-react";

function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🍳</span>

          <span>
            Foodie<span>Hub</span>
          </span>
        </Link>

        <nav className="navbar-menu">
          <Link to="/">Home</Link>
          <Link to="/recipes">Recipes</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="navbar-actions">
          <button className="icon-button">
            <Search size={20} />
          </button>

          <button className="icon-button">
            <Heart size={20} />
          </button>

          <Link to="/login" className="login-button">
            <User size={18} />
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;