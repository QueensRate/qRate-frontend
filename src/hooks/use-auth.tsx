
import * as React from "react";

interface AuthContextType {
  userEmail: string | null;
  token: string | null;
  login: (email: string, token: string) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userEmail, setUserEmail] = React.useState<string | null>(null);
  const [token, setToken] = React.useState<string | null>(null);

  React.useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    const storedToken = localStorage.getItem("token");
    if (storedEmail && storedToken) {
      setUserEmail(storedEmail);
      setToken(storedToken);
    }
  }, []);

  const login = (email: string, newToken: string) => {
    setUserEmail(email);
    setToken(newToken);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    if (userEmail) {
      const confirmLogout = window.confirm(`Are you sure you want to sign out of ${userEmail}?`);
      if (confirmLogout) {
        setUserEmail(null);
        setToken(null);
        localStorage.removeItem("userEmail");
        localStorage.removeItem("token");
        window.location.href = "/sign-in"; // Redirect to sign-in page
      }
    }
  };

  return (
    <AuthContext.Provider value={{ userEmail, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}