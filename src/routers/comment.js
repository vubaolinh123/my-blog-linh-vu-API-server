import { Router } from 'express';
import { create, remove, getOne, list, update } from '../controllers/comment';
import { rateLimit } from "express-rate-limit";

const router = Router()
const apiLimiter = rateLimit({
    windowMs: 30 * 1000, // 30s được gửi 1 req
    max: 1,
    handler: function (req, res) {
        res.status(429).send({
            status: 500,
            message: 'Vui lòng thử lại sau 30s',
        });
    },
});

router.get("/comment", list)
router.post("/comment", apiLimiter ,create)
router.get("/comment/:id", getOne)
router.delete("/comment/:id", remove)
router.put("/comment/:id", update)


export default router;