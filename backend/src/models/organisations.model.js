import mongoose from "mongoose";



const organisationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    joinCode: {
        type: String,
        required: true,
        unique: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});

export const Organisation = mongoose.model("Organisation", organisationSchema);