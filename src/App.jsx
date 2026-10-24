
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import RecipeDetails from "./pages/RecipeDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyRecipes from "./pages/MyRecipes";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";

import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";

function AppRoutes() {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <>
      {!isAuthPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />

        <Route path="/my-recipes" element={<MyRecipes />} />
        <Route path="/favorites" element={<Favorites />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />

        {/* Login page already includes the Signup toggle */}
        <Route
          path="/signup"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </>
  );
}

function App() {
  const basename = import.meta.env.PROD ? "/Foodiehub" : "/";

  return (
    <AuthProvider>
      <FavoritesProvider>
        <BrowserRouter basename={basename}>
          <AppRoutes />
        </BrowserRouter>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
