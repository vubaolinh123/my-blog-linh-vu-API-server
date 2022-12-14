import { Router } from 'express';
import { login, register, changPassword } from "../controllers/auth"
const router = Router()

router.post("/login", login)
router.post("/register", register)
router.post("/password", changPassword)


export default router;