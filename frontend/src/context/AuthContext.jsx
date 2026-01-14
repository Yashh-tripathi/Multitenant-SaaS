import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios.js";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchMe = async () => {
        try {
            const res = await axios.get("/auth/me", {
                withCredentials: true
            });
            setUser(res.data.data);
        } catch (error) {
            setUser(null);
        }finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMe();
    }, []);

    return (
        <AuthContext.Provider value={{user, setUser, loading}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);