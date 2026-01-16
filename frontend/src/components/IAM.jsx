import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx"
import axios from "../api/axios.js";
import { useNavigate } from "react-router-dom";
import { ClipboardCheck, Copy } from "lucide-react";


export const IAM = () => {
    const navigate = useNavigate();
    const {setUser} = useAuth();
    const {user} = useAuth();
    const [orgName, setOrgName] = useState("");
    const [joinCode, setJoinCode] = useState("");
    const [orgInfo, setOrgInfo] = useState(null);
    const [joinStatus, setJoinStatus] = useState("");
    const [pendingRequests, setPendingRequest] = useState([]);
    const [orgDetails, setOrgDetails] = useState([]);
    const [copiedCode, setCopiedCode] = useState(null);


    const handleCopy = async (code) => {
        try {
          await navigator.clipboard.writeText(code);
          setCopiedCode(code);
      
          // reset after 2 seconds
          setTimeout(() => setCopiedCode(null), 2000);
        } catch (err) {
          alert("Failed to copy");
        }
      };

    const adminOrgs = user.organisations.filter(
        o => o.role === "admin" && o.status === "approved"
      );

      useEffect(() => {
        if (adminOrgs.length > 0) {
          fetchPendingRequest(adminOrgs[0].orgId);
        }
      }, []);
      
    useEffect(() => {
        const fetchOrgs = async () => {
          const res = await axios.get("/organisations/my");
          setOrgDetails(res.data.data);
       
        };
        fetchOrgs();
    }, []);

    const fetchPendingRequest = async (orgId) => {
        try {
            const res = await axios.get(`/join-requests/${orgId}/pending`);
            setPendingRequest(res.data.data);
        } catch (error) {
            console.error("Failed to fetch join requests");
        }
    }

  

    useEffect(() => {
        if(!user.organisations) return;
        const adminOrg = user.organisations.find(
            (o) => o.role === "admin" && o.status === "approved"
        );
        if(adminOrg){
            fetchPendingRequest(adminOrg.orgId);
        }
    }, [])

    const handleJoinRequest = async () => {
        if(!orgInfo) return;
        try {
            await axios.post("/join-requests", {
                orgId: orgInfo._id
            });
            setJoinStatus("Join request sent. Waiting for approval.");
        } catch (err) {
            setJoinStatus(
                err.response?.data?.message || "Failed to send request"
            );
        }
    }


    const handleCheckJoinCode = async () => {
        if(!joinCode) return;
        try {
            const res = await axios.get(`/organisations/code/${joinCode}`);
            setOrgInfo(res.data.data);
            setJoinStatus("");
        } catch (error) {
            setOrgInfo(null);
            setJoinStatus("Invalid join code");
        }
    }

    const handleCreateOrg =  async () => {
        if(!orgName.trim()) return;
        try {
            await axios.post("/organisations", {
                name: orgName
            });
            const me = await axios.get("/auth/me");
            setUser(me.data.data);
            navigate("/console/iam");
        } catch (error) {
            console.error(err.response?.data?.message || "Failed to create org");
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-10">
          <h1 className="text-2xl font-bold mb-6">
            Identity & Access Management
          </h1>
    
          {/* Existing Organisations */}
          <div className="bg-white p-6 rounded shadow mb-8">
            <h2 className="font-semibold mb-3">Your Organisations</h2>
    
            {user.organisations.length === 0 ? (
              <p className="text-gray-500 text-sm">
                You are not part of any organisation yet.
              </p>
            ) : (
              <ul className="space-y-2">
                {user.organisations.map((org) => (
                  <li
                    key={org.orgId}
                    onClick={() =>
                        navigate(`/console/org/${org.orgId}/blogs`)
                      }
                    className="border p-3 rounded flex justify-between"
                  >
                    <span>{org.orgId}</span>
                    <span className="text-sm text-gray-500">
                      {org.role} · {org.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
           <div className="bg-white p-6 rounded shadow mb-8">
           {orgDetails.map(org => (
            <div key={org._id} className=" mt-1  rounded-md shadow-sm flex  px-2 py-1 justify-between">
            <p>Organisation name : <b>{org.orgId.name}</b> </p>
            <p>Join Code: <b>{org.orgId.joinCode}</b></p>
            <button
      onClick={(e) => {
        e.stopPropagation();
        handleCopy(org.orgId.joinCode);
      }}
      className="text-xs px-2 py-0.5  rounded hover:bg-gray-100"
    >
      {copiedCode === org.orgId.joinCode ? <ClipboardCheck/> : <Copy/>}
    </button>
            </div>
            ))}
           </div>
          
    
          {/* Create Organisation */}
          <div className="bg-white p-6 rounded shadow mb-8">
            <h2 className="font-semibold mb-3">Create Organisation</h2>
    
            <input
              type="text"
              placeholder="Organisation name"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              className="border px-3 py-1 rounded w-full mb-3"
            />
    
            <button onClick={handleCreateOrg} className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600">
              Create
            </button>
          </div>
    
          {/* Join Organisation */}
          <div className="bg-white p-6 rounded shadow">
            <h2 className="font-semibold mb-3">Join Organisation</h2>
    
            <input
              type="text"
              placeholder="Enter join code"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              className="border px-3 py-1 rounded w-full mb-3"
            />

            <button
                onClick={handleCheckJoinCode}
                className="border px-4 py-1 rounded hover:bg-gray-100 mb-3"
            >
                Check Code
            </button>
    
            {orgInfo && (
                <div className="border p-3 rounded mb-3">
                <p className="font-medium">{orgInfo.name}</p>
                <button
                    onClick={handleJoinRequest}
                    className="mt-2 bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600"
                >
                    Request Access
                </button>
                </div>
            )}

            {joinStatus && (
                <p className="text-sm text-gray-600 mt-2">{joinStatus}</p>
            )}
          </div>
          

        </div>
      );
}