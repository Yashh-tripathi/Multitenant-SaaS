import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
      blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
      },
      orgId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organisation"
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      text: String
    },
    { timestamps: true }
  );
  
export const Comment = mongoose.model("Comment", commentSchema);
  