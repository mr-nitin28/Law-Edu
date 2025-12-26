import { createContext, useEffect, useState } from "react";
import instructorsDataJson from '../data/instructorsData.json';



export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "₹";

  const [instructors, setInstructors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userData, setUserData] = useState(() => {
    const stored = localStorage.getItem('userData');
    return stored ? JSON.parse(stored) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  // Logout function to clear all auth data
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setToken('');
    setUserData(null);
  };

  // Load Instructors data from local JSON
  const getInstructorsData = () => {
    try {
      // Load from local JSON file
      setInstructors(instructorsDataJson.instructors || []);
    } catch (error) {
      console.error('Failed to load instructors:', error);
      setInstructors([]);
    }
  };

  // Load instructors on mount
  useEffect(() => {
    getInstructorsData();
  }, []);

  const value = {
    instructors,
    getInstructorsData,
    currencySymbol,
    token,
    setToken,
    userData,
    setUserData,
    logout,
    isLoading,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
