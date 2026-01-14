import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api//axios.js";
import { useAuth } from "../context/AuthContext.jsx";


const Blog = () => {
    const navigate = useNavigate();
  const { orgId } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const {user} = useAuth();

  const currentOrg = user.organisations.find(
    (o) => o.orgId === orgId && o.status === "approved"
  );
  const isAdmin = currentOrg?.role === "admin";

  const [title, setTitle] = useState("");
  const [content , setContent] = useState("");
  const [creating, setCreating] = useState(false);

  const handleCreateBlogs = async (e) => {
    e.preventDefault();
    if(!title.trim() || !content.trim()) return ;
    try {
        setCreating(true);
        const res = await axios.post(`/orgs/${orgId}/blogs`,{
            title, 
            content
        });
        setBlogs((prev) => [res.data.data, ...prev]);
        setTitle("");
        setContent("");

    } catch (err) {
        alert(err.response?.data?.message || "Failed to create blog");
    }finally{
        setCreating(false);
    }
  }

  useEffect(() => {
    const fetchBlogs = async () => { 
        try {
            const res = await axios.get(`/orgs/${orgId}/blogs`);
            setBlogs(res.data.data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch blogs")
        }finally{
            setLoading(false);
        }
    };
    fetchBlogs();
  },[orgId])

  return (
    <div className="p-10">
        {isAdmin && (
  <form
    onSubmit={handleCreateBlogs}
    className="border rounded p-4 mb-6 bg-white"
  >
    <h2 className="font-semibold mb-3">Create Blog</h2>

    <input
      type="text"
      placeholder="Blog title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="border px-3 py-1 rounded w-full mb-3"
    />

    <textarea
      placeholder="Write blog content..."
      value={content}
      onChange={(e) => setContent(e.target.value)}
      className="border px-3 py-1 rounded w-full mb-3 min-h-30"
    />

    <button
      type="submit"
      disabled={creating}
      className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600 disabled:opacity-50"
    >
      {creating ? "Creating..." : "Create Blog"}
    </button>
  </form>
)}

      <h1 className="text-2xl font-bold mb-6">Blogs</h1>

      {blogs.length === 0 ? (
        <p className="text-gray-500">
          No blogs found for this organisation.
        </p>
      ) : (
        <ul className="space-y-4">
          {blogs.map((blog) => (
            <li
              key={blog._id}
              onClick={() => navigate(`/console/org/${orgId}/blogs/${blog._id}`)}
              className="border rounded p-4 hover:bg-gray-50"
            >
              <h2 className="text-lg font-semibold">
                {blog.title}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                By {blog.createdBy?.name || "Unknown"}
              </p>

              <p className="text-gray-700 mt-2 line-clamp-2">
                {blog.content}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Blog;
