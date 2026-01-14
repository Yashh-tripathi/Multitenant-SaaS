import dotenv from 'dotenv';
import connectDB from './db/db.config.js';
import app from './app.js';

dotenv.config({
    path: './.env'
});

const PORT = process.env.PORT || 4000;

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log("App running on port: ", PORT);
    });
    app.on("error", (error) => {
        res.send("Error: ",error)
    });
})
.catch((error) => {
    console.log("Post connection promise object error : ", error);
});