import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
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
      }
    },
    { timestamps: true }
  );
  
  likeSchema.index(
    { blogId: 1, userId: 1, orgId: 1 },
    { unique: true }
  );
  
export const Like = mongoose.model("Like", likeSchema);
