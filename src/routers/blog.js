import { Router } from 'express';
import { create, remove, getOne, list, update, page, related } from '../controllers/blog';
import { userById } from '../controllers/user';
import { isAdmin, isAuth, requiredSigin } from '../middleware/checkAuth';
import { rateLimit } from "express-rate-limit";
const router = Router()

const apiLimiter = rateLimit({
    windowMs: 3 * 1000, // 5s được gửi 1 req
    max: 1,
    handler: function (req, res) {
        res.status(429).send({
            status: 500,
            message: 'Vui lòng thử lại sau 3s',
        });
    },
});

router.get("/blogs", apiLimiter ,list)
router.get("/blogs/filter", page)
// router.post("/blogs/:userId", requiredSigin, isAuth, isAdmin, create)
router.post("/blogs", create)
router.get("/blogs/:slug", getOne)
router.get("/blogs/:slug/related", related)
router.delete("/blogs/:slug", remove)
router.put("/blogs/:slug", update)


router.param('userId', userById)

export default router;