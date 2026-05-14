import express from "express";
import { signUser ,loginUser} from "../controllers/authController.js";

const router = express.Router();

router.post('/signup',signUser);
router.post('/login',loginUser);

export default router;