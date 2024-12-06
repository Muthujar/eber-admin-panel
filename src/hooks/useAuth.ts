import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const useAuth = () => {
  const navigate = useNavigate(); // Replaces useHistory in v6

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login"); // Redirect to login page if not authenticated
    }
  }, [navigate]); // Ensure navigate is in the dependency array
};