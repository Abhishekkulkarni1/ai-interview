import { useContext } from "react";
import { AuthContext } from "../authContext";
import { registerUser, loginUser, logoutUser } from "../services/authApi";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { user, setUser, loading, setLoading } = context;

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await registerUser({ username, email, password });
      setUser(data.user);
    } catch (error) {
      console.log(error, "Error occured while handling register in hooks");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await loginUser({ username, email, password });
      setUser(data.user);
    } catch (error) {
      console.log(error, "Error occured while handling login in hooks");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logoutUser();
      setUser(null);
    } catch (error) {
      console.log(error, "Error occured while handling logout in hooks");
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, handleRegister, handleLogin, handleLogout };
};
