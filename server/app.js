import express from "express";
import userRoutes from "./routes/user.route.js";
import courseRoutes from "./routes/course.route.js";
import profileRoutes from "./routes/profile.route.js";
import paymentRoutes from "./routes/payment.route.js";
import contactRoutes from "./routes/contact.route.js"
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();

app.use(cors({
    origin: "*",
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"))

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach-us", contactRoutes)

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

export default app