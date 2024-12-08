import express from "express";
const router = express.Router();

router.route("/register").post(singleUpload,register);
export default router;