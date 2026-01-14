import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";

const PendingRequests = () => {
  const { orgId } = useParams();
  const { user } = useAuth();

  const [requests, setRequests] = useState([]);

  const isAdmin = user.organisations.some(
    o => o.orgId === orgId && o.role === "admin"
  );
  const handleApprove = async (requestId) => {
    try {
      await axios.patch(`/join-requests/${requestId}/approve`);
      setRequests((prev) =>
        prev.filter((r) => r._id !== requestId)
      );
    } catch (err) {
      console.error("Approval failed");
    }
  };

  const handleReject = async (requestId) => {
    try {
      await axios.patch(`/join-requests/${requestId}/reject`);
      setRequests((prev) =>
        prev.filter((r) => r._id !== requestId)
      );
    } catch (err) {
      console.error("Rejection failed");
    }
  };

  useEffect(() => {
    if (!isAdmin) return;

    const fetchRequests = async () => {
      const res = await axios.get(
        `/join-requests/${orgId}/pending`
      );
      setRequests(res.data.data);
    };

    fetchRequests();
  }, [orgId, isAdmin]);

  if (!isAdmin) {
    return <p className="p-6">Not authorized</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">
        Pending Join Requests
      </h1>

      {requests.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        requests.map(req => (
          <div key={req._id} className="border p-3 mb-2">
            <p>{req.userId.name}</p>
            <p className="text-sm text-gray-500">
              {req.userId.email}
            </p>
            <div className="space-x-2">
            <button
              onClick={() => handleApprove(req._id)}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Approve
            </button>

            <button
              onClick={() => handleReject(req._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Reject
            </button>
          </div>
          </div>
          
        ))
      )}
    </div>
  );
};

export default PendingRequests;
