import express from "express";
import { getSample } from "../controllers/sampleController.js";

const router = express.Router();

// Sample route
router.get("/sample", getSample);

export default router;
