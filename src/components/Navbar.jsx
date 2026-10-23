
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Heart, User, LogOut } from "lucide-react";

const CURRENT_USER_KEY = "foodiehub-current-user";

function readCurrentUser() {
  try {
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);

    if (!storedUser) {
      return null;
    }

    const user = JSON.parse(storedUser);

    return user && typeof user === "object" ? user : null;
  } catch (error) {
    console.error("Unable to read the current user:", error);
    return null;
  }
}

function Navbar() {
  const [currentUser, setCurrentUser] = useState(readCurrentUser);
  const navigate = useNavigate();

  useEffect(() => {
    function syncCurrentUser() {
      setCurrentUser(readCurrentUser());
    }

    // Update Navbar after login, signup, or logout.
    window.addEventListener(
      "foodiehub-auth-updated",
      syncCurrentUser
    );

    // Update when LocalStorage changes in another browser tab.
    window.addEventListener("storage", syncCurrentUser);

    return () => {
      window.removeEventListener(
        "foodiehub-auth-updated",
        syncCurrentUser
      );

      window.removeEventListener("storage", syncCurrentUser);
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem(CURRENT_USER_KEY);

    setCurrentUser(null);

    window.dispatchEvent(
      new Event("foodiehub-auth-updated")
    );

    navigate("/");
  }

  const displayName = currentUser?.name?.trim()
    ? currentUser.name.trim().split(/\s+/)[0]
    : currentUser?.email?.split("@")[0] || "Foodie";

  return (
    <header className="navbar">
      <div className="container navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🍳</span>

          <span>
            Foodie<span className="logo-highlight">Hub</span>
          </span>
        </Link>

        {/* Navigation links */}
        <nav className="navbar-menu">
          <Link to="/">Home</Link>
          <Link to="/recipes">Recipes</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        {/* Navbar actions */}
        <div className="navbar-actions">
          <button
            type="button"
            className="icon-button"
            aria-label="Explore recipes"
            onClick={() => navigate("/recipes")}
          >
            <Search size={20} />
          </button>

          <button
            type="button"
            className="icon-button"
            aria-label="Favorites"
            onClick={() => navigate("/recipes")}
          >
            <Heart size={20} />
          </button>

          {currentUser ? (
            <>
              <span
                title={currentUser.name || currentUser.email}
                style={{
                  maxWidth: "110px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  color: "#51463e",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                Hi, {displayName}
              </span>

              <button
                type="button"
                className="login-button"
                onClick={handleLogout}
                aria-label="Log out of FoodieHub"
                style={{
                  border: 0,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                <LogOut size={17} />
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="login-button">
              <User size={18} />
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
