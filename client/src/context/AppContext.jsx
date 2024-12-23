import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [credit, setCredit] = useState(false);

  const backendUrl = "http://localhost:4000"; //import.meta.env.VITE_APP_BACKEND_URL;
  const navigate = useNavigate();
  const loadCreditsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/users/credits`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.statusCode === 200) {
        setCredit(data.creditBalance);
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/image/generate-image`,
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (data.statusCode === 200) {
        loadCreditsData();
        return data.image;
      } else {
        toast.error(data.message);
        loadCreditsData();
        // if (data.creditBalance === 0) {
        //   navigate("/buy");
        // }
      }
    } catch (error) {
      console.log(error);
      navigate("/buy");
      toast.error("Insufficient credits");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  useEffect(() => {
    if (token) {
      loadCreditsData();
    }
  }, [token]);

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl,
    token,
    setToken,
    credit,
    setCredit,
    loadCreditsData,
    logout,
    generateImage,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
