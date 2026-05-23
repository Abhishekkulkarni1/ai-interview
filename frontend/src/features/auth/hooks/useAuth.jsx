import { useContext, useEffect } from "react";
import { AuthContext } from "../authContext";
import {
  registerUser,
  loginUser,
  logoutUser,
  userDetails,
} from "../services/authApi";

export const useAuth = () => {
  const context = useContext(AuthContext);
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
      const data = await logoutUser();
      setUser(null);
    } catch (error) {
      console.log(error, "Error occured while handling logout in hooks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getAndSetUser = async () => {
      setLoading(true);
      try {
        const data = await userDetails();
        if (data?.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log(
          error,
          "Error occured while handling getting user in hooks",
        );
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getAndSetUser();
  }, []);

  return { user, loading, handleRegister, handleLogin, handleLogout };
};
