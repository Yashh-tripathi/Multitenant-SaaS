import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const ConsoleLayout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { orgId } = useParams();

  const currentOrg = user.organisations.find(
    (o) => o.orgId === orgId
  );
  const isAdmin = user.organisations.some(
    o => o.orgId === orgId && o.role === "admin"
  );
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="px-6 py-4 text-xl font-bold border-b border-gray-700">
          BlogSaaS
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <button
            onClick={() => navigate("/console/iam")}
            className="w-full text-left px-3 py-2 rounded hover:bg-gray-700"
          >
            IAM
          </button>

          {orgId && (
            <>
              <button
                onClick={() =>
                  navigate(`/console/org/${orgId}/blogs`)
                }
                className="w-full text-left px-3 py-2 rounded hover:bg-gray-700"
              >
                Blogs
              </button>
            </>
          )}



    {isAdmin && (
      <button
      className="w-full text-left px-3 py-2 rounded hover:bg-gray-700"
        onClick={() =>
          navigate(`/console/org/${orgId}/pending-requests`)
        }
      >
        Pending Requests
      </button>
    )}


        </nav>

        <div className="px-4 py-4 border-t border-gray-700 text-sm">
          <p>{user.name}</p>
          <p className="text-gray-400">
            {currentOrg?.role || "No role"}
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default ConsoleLayout;
