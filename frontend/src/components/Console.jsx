import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export const Console = () => {
    const {user} = useAuth();
    if(!user.organisations || user.organisations.length === 0){
        return <Navigate to="/console/iam" />
    }
    const defaultOrg = user.organisations[0].orgId;
    return <Navigate to="/console/iam" />
}