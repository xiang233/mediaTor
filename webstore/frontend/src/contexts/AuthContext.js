import { createContext, useContext, useEffect, useState } from "react";
import getUser from "../services/getUser";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const loggedIn = JSON.parse(localStorage.getItem("loggedUser"));

const authState = {
  headers: null,
  isLoggedIn: false,
  loggedUser: {
    // bio: null,
    id:null,
    email: "",
    // image: null,
    // token: "",
    username: "",
  },
};

function AuthProvider({ children }) {
  const [{ headers, isLoggedIn, loggedUser }, setAuthState] = useState(
    loggedIn || authState,
  );

  useEffect(() => {
    if (!headers) return;

    getUser({ headers })
      .then((loggedUser) => setAuthState((prev) => ({ ...prev, loggedUser })))
      .catch(console.error);
  }, [headers, setAuthState]);

  return (
    <AuthContext.Provider value={{ headers, isLoggedIn, loggedUser, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;