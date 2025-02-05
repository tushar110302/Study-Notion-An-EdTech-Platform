import dotenv from "dotenv/config";
import { connectDB } from "./config/db.js";
import app from "./app.js";

const port = process.env.PORT || 4000;

connectDB()
.then(() => {
    app.on("error", (error) => {
        console.error(error);
        process.exit(1);
    })
    app.listen(port, () => {
        console.log(`App is listening on port ${port} http://localhost:${port}`);
    })
})
.catch((error) => {
    console.error(`Error exncountered in index.js ${error}`);
})