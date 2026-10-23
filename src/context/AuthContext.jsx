
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

const CURRENT_USER_KEY = "foodiehub-current-user";
const AUTH_EVENT = "foodiehub-auth-updated";

function readCurrentUser() {
  try {
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);

    if (!storedUser) return null;

    const user = JSON.parse(storedUser);

    if (
      !user ||
      typeof user !== "object" ||
      !user.email
    ) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Unable to read user session:", error);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readCurrentUser);

  useEffect(() => {
    function syncUser() {
      setUser(readCurrentUser());
    }

    function handleStorage(event) {
      if (
        !event.key ||
        event.key === CURRENT_USER_KEY
      ) {
        syncUser();
      }
    }

    window.addEventListener(AUTH_EVENT, syncUser);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(AUTH_EVENT, syncUser);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);

    window.dispatchEvent(new Event(AUTH_EVENT));
  }, []);

  const value = {
    user,
    isAuthenticated: Boolean(user),
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider."
    );
  }

  return context;
}
