import express from "express";
import { getimages, regeneratkey, register } from "../controllers/userControllers.js";

const router=express.Router();

router.post('/register',register);
router.post('/regeneratkey',regeneratkey);
router.post('/getimages',getimages)
export default router;