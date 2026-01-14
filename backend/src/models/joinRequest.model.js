import mongoose from "mongoose";

const joinRequestSchema = new mongoose.Schema(
    {
      orgId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organisation"
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
      }
    },
    { timestamps: true }
  );
  
export const JoinRequest = mongoose.model("JoinRequest", joinRequestSchema);
