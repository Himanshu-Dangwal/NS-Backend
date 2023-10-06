"use client";
import { get, post, put, del } from "@/utils/api";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

export const AuthContextData = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
};

export function useData() {
  return useContext(AuthContextData);
}

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isAuthenticated: true, user: action.payload };
    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};

export default function AuthContext({ children }) {
  const [authState, dispatch] = useReducer(authReducer, initialState);
  console.log(authState.isAuthenticated);
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem("authToken");

        if (authToken) {
          // Fetch user data
          const userResponse = await fetch("http://127.0.0.1:8080/api/auth/getuser", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          });
          if (userResponse.ok) {
            const userData = await userResponse.json();
            setUser(userData);
          } else {
            console.error("Failed to fetch user data");
          }
        }

        // Fetch blogs data
        const blogsResponse = await get("blogs/");
        setBlogs(blogsResponse);
        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(user);

  return (
    <AuthContextData.Provider value={{ authState, dispatch, blogs, setBlogs, user }}>
      {children}
    </AuthContextData.Provider>
  );
}
