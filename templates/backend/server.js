import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import cors from "cors";
import connectDB from "./config/db.js";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("thisismysecret"));
app.use(methodOverride("_method"));

const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";
app.use(
  cors({
    origin: frontendURL,
    credentials: true,
  })
);

app.use("/api", routes);
app.use(express.static("public"));
app.use(errorHandler);

// Start server after DB connects
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
});
