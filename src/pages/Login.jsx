import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChefHat,
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  UserRound,
  ArrowRight,
  CheckCircle2,
  UtensilsCrossed,
} from "lucide-react";

const USERS_KEY = "foodiehub-users";
const SESSION_KEY = "foodiehub-current-user";

function readUsers() {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    return Array.isArray(users) ? users : [];
  } catch {
    return [];
  }
}

function Login() {
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const switchMode = () => {
    setIsSignup((current) => !current);
    setError("");
    setSuccess("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    const users = readUsers();

    if (isSignup) {
      if (!name.trim()) {
        setError("Please enter your full name.");
        return;
      }

      if (password.length < 8) {
        setError("Password must contain at least 8 characters.");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      const alreadyExists = users.some(
        (user) => user.email === normalizedEmail
      );

      if (alreadyExists) {
        setError("An account with this email already exists. Please log in.");
        return;
      }

      const newUser = {
        id: Date.now(),
        name: name.trim(),
        email: normalizedEmail,
        // Demo only: never store plaintext passwords in production.
        password,
        createdAt: new Date().toISOString(),
      };

      try {
        localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
        localStorage.setItem(
          SESSION_KEY,
          JSON.stringify({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
          })
        );

        window.dispatchEvent(new Event("foodiehub-auth-updated"));
        navigate("/");
      } catch {
        setError("Unable to create your account. Please try again.");
      }

      return;
    }

    const matchedUser = users.find(
      (user) =>
        user.email === normalizedEmail && user.password === password
    );

    if (!matchedUser) {
      setError("Incorrect email or password. Please try again.");
      return;
    }

    try {
      localStorage.setItem(
        SESSION_KEY,
        JSON.stringify({
          id: matchedUser.id,
          name: matchedUser.name,
          email: matchedUser.email,
        })
      );

      window.dispatchEvent(new Event("foodiehub-auth-updated"));
      navigate("/");
    } catch {
      setError("Unable to log in right now. Please try again.");
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-container">
        <section className="auth-visual">
          <Link to="/" className="auth-brand">
            <span className="auth-brand-icon">
              <ChefHat size={25} />
            </span>
            <span>
              Foodie<span>Hub</span>
            </span>
          </Link>

          <div className="auth-visual-content">
            <span className="auth-eyebrow">
              <UtensilsCrossed size={15} />
              YOUR KITCHEN, YOUR STORY
            </span>

            <h1>
              Good food.
              <br />
              Great memories.
            </h1>

            <p>
              Discover delicious recipes, save your favorites, and bring
              something wonderful to your table.
            </p>

            <div className="auth-benefits">
              <div>
                <CheckCircle2 size={19} />
                <span>Discover recipes for every craving</span>
              </div>
              <div>
                <CheckCircle2 size={19} />
                <span>Keep your favorite meals in one place</span>
              </div>
              <div>
                <CheckCircle2 size={19} />
                <span>Make every meal a little more special</span>
              </div>
            </div>
          </div>

          <div className="auth-visual-footer">
            Made with love for food lovers.
            <span>© FoodieHub</span>
          </div>
        </section>

        <section className="auth-form-section">
          <div className="auth-form-wrapper">
            <Link to="/" className="auth-mobile-brand">
              <ChefHat size={24} />
              <span>
                Foodie<span>Hub</span>
              </span>
            </Link>

            <div className="auth-heading">
              <span className="auth-heading-label">
                {isSignup ? "GET STARTED" : "WELCOME BACK"}
              </span>

              <h2>
                {isSignup ? "Create your account" : "Welcome back!"}
              </h2>

              <p>
                {isSignup
                  ? "Join our community of food lovers."
                  : "Sign in to continue your food journey."}
              </p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              {isSignup && (
                <div className="auth-field">
                  <label htmlFor="auth-name">Full name</label>
                  <div className="auth-input-wrap">
                    <UserRound size={19} />
                    <input
                      id="auth-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      autoComplete="name"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="auth-field">
                <label htmlFor="auth-email">Email address</label>
                <div className="auth-input-wrap">
                  <Mail size={19} />
                  <input
                    id="auth-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="auth-field">
                <label htmlFor="auth-password">Password</label>
                <div className="auth-input-wrap">
                  <LockKeyhole size={19} />
                  <input
                    id="auth-password"
                    type={showPassword ? "text" : "password"}
                    placeholder={
                      isSignup ? "At least 8 characters" : "Enter your password"
                    }
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete={isSignup ? "new-password" : "current-password"}
                    required
                  />

                  <button
                    type="button"
                    className="auth-password-toggle"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              {isSignup && (
                <div className="auth-field">
                  <label htmlFor="auth-confirm-password">
                    Confirm password
                  </label>
                  <div className="auth-input-wrap">
                    <LockKeyhole size={19} />
                    <input
                      id="auth-confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Enter your password again"
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      autoComplete="new-password"
                      required
                    />

                    <button
                      type="button"
                      className="auth-password-toggle"
                      onClick={() =>
                        setShowConfirmPassword((current) => !current)
                      }
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {!isSignup && (
                <div className="auth-form-options">
                  <label className="auth-remember">
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </label>
                  <span className="auth-forgot-disabled">
                    Forgot password?
                  </span>
                </div>
              )}

              {error && (
                <div className="auth-message auth-error" role="alert">
                  {error}
                </div>
              )}

              {success && (
                <div className="auth-message auth-success" role="status">
                  {success}
                </div>
              )}

              <button type="submit" className="auth-submit-button">
                <span>{isSignup ? "Create account" : "Sign in"}</span>
                <ArrowRight size={19} />
              </button>
            </form>

            <div className="auth-switch">
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              <button type="button" onClick={switchMode}>
                {isSignup ? "Sign in" : "Sign up"}
              </button>
            </div>

            <div className="auth-bottom-note">
              By continuing, you agree to use FoodieHub responsibly.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;