import express from "express";
const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyJob);
 

export default router;

