import express from "express";
const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);

export default router;


