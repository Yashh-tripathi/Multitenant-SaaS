import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true
}));
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({extended: true, limit: "40kb"}));
app.use(express.static('public'));
app.use(cookieParser());

//routes
import authRoutes from "./routes/auth.routes.js";
import organisationRoutes from "./routes/organisation.routes.js";
import joinRequestRoutes from "./routes/joinRequest.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import likeRoutes from "./routes/like.routes.js";

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/organisations", organisationRoutes);
app.use("/api/v1/join-requests", joinRequestRoutes);
app.use("/api/v1/orgs", blogRoutes);
app.use("/api/v1/orgs", commentRoutes);
app.use("/api/v1/orgs",likeRoutes);

export default app;