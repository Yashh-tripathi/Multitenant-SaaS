import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const orgMiddleware = asyncHandler(async (req,_,next) => {

    const { orgId } = req.params;
    if(!orgId){
        throw new ApiError(400, "Organisation id is required");
    }
    const org = req.user.organisations.find(
        (o) => o.orgId.toString() === orgId.toString()
    );
    if(!org){
        throw new ApiError(403, "You don't belong to this organistaion.")
    }
    if(org.status !== "approved"){
        throw new ApiError(403, "Organisation access not approved.")
    }
    req.orgId = org.orgId;
    req.role = org.role;
    next();
});


export const roleMiddleware = (allowedRoles = []) => {
    return (req, _, next) => {
        if(!allowedRoles.includes(req.role)){
            throw new ApiError(403, "Insufficient permissions")
        }
        next();
    }
}

