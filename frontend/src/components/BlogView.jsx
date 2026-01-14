import axios from "../api/axios.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export const BlogView = () => {
    const {orgId, blogId} = useParams();
    
    const [blog , setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    //likes
    const [likesCount, setLikesCount] = useState(0);
    const [liked , setLiked] = useState(false);

    //comments 
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [commentLoading, setCommentLoading] = useState(false);


    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`/orgs/${orgId}/blogs/${blogId}`);
                setBlog(res.data.data);
            } catch (err) {
                setError(
                    err.response?.data?.message || "Failed to fetch blog"
                  );
            }finally{
                setLoading(false);
            }
        }
        fetchBlog();

        const fetchLikes = async () => {
            const res = await axios.get(`/orgs/${orgId}/blogs/${blogId}/likes`);
            setLikesCount(res.data.data.count);
            setLiked(res.data.data.likedByMe);
        }
        
    },[orgId, blogId]);

    useEffect(() => {
        const fetchAll = async () => {
            try {
              const blogRes = await axios.get(
                `/orgs/${orgId}/blogs/${blogId}`
              );
              setBlog(blogRes.data.data);
        
              const likesRes = await axios.get(
                `/orgs/${orgId}/blogs/${blogId}/likes`
              );
              const commentsRes = await axios.get(
                `/orgs/${orgId}/blogs/${blogId}/comments`
              );
              setComments(commentsRes.data.data);
              setLikesCount(likesRes.data.data.count);
              setLiked(likesRes.data.data.likedByMe);
            } catch (err) {
              setError("Failed to load blog");
            } finally {
              setLoading(false);
            }
          };
        
          fetchAll();
    },[orgId, blogId]);

    const toggleLike = async () => {
        try {
            if(liked){
                await axios.post(`/orgs/${orgId}/blogs/${blogId}/like`);
                setLikesCount((c) => c - 1);
            }else {
                await axios.post(
                  `/orgs/${orgId}/blogs/${blogId}/like`
                );
                setLikesCount((c) => c + 1);
              }
              setLiked(!liked);
        } catch (error) {
            alert("Unable to update like");
        }
    }

    const handleAddComment = async (e) => {
        e.preventDefault();
      
        if (!commentText.trim()) return;
      
        try {
          setCommentLoading(true);
      
          const res = await axios.post(
            `/orgs/${orgId}/blogs/${blogId}/comments`,
            { text: commentText }
          );
      
          setComments((prev) => [...prev, res.data.data]);
          setCommentText("");
        } catch (err) {
          alert("Failed to add comment");
        } finally {
          setCommentLoading(false);
        }
      };
      

    if (loading) return <p className="p-10">Loading...</p>;
    if (error) return <p className="p-10 text-red-500">{error}</p>;
    if (!blog) return null;

    return (
        <div className="p-10 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
    
          <p className="text-sm text-gray-500 mb-6">
            By {blog.createdBy?.name || "Unknown"}
          </p>
    
          <div className="text-gray-800 bg-gray-200/40 p-10 rounded-xl shadow-md text-xl  leading-relaxed whitespace-pre-line">
            {blog.content}
          </div>
          <button
  onClick={toggleLike}
  className={`mt-4 px-4 py-1 rounded cursor-pointer ${
    liked
      ? "bg-red-500 text-white border-red-500"
      : "hover:bg-gray-100"
  }`}
>
  ❤️ {likesCount} {likesCount === 1 ? "Like" : "Likes"}
</button>

{/* Comments Section */}
<div className="mt-10">
  <h2 className="text-xl font-semibold  mb-4">Comments</h2>

  {/* Add Comment */}
  <form onSubmit={handleAddComment} className="mb-6">
    <textarea
      value={commentText}
      onChange={(e) => setCommentText(e.target.value)}
      placeholder="Write a comment..."
      className="w-full border rounded-xs p-2 mb-2 min-h-20"
    />

    <button
      type="submit"
      disabled={commentLoading}
      className="bg-orange-500 text-white px-4 py-1 rounded-xs cursor-pointer hover:bg-orange-600 disabled:opacity-50"
    >
      {commentLoading ? "Posting..." : "Post Comment"}
    </button>
  </form>

  {/* Comments List */}
  {comments.length === 0 ? (
    <p className="text-gray-500">No comments yet.</p>
  ) : (
    <ul className="space-y-4">
      {comments.map((comment) => (
        <li key={comment._id}className="bg-gray-300 rounded p-3">
          <p className="text-sm text-gray-600 mb-1">
            {comment.userId?.name || "User"}  {comment.createdAt} 
          </p>
          <p className="text-gray-800">{comment.text}</p>
        </li>
      ))}
    </ul>
  )}
</div>


        </div>
      );
}