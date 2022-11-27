import { Router } from 'express';
import { create, remove, getOne, list, update, page, related } from '../controllers/blog';
import { userById } from '../controllers/user';
import { isAdmin, isAuth, requiredSigin } from '../middleware/checkAuth';
const router = Router()

router.get("/blogs", list)
router.get("/blogs/filter", page)
// router.post("/blogs/:userId", requiredSigin, isAuth, isAdmin, create)
router.post("/blogs", create)
router.get("/blogs/:slug", getOne)
router.get("/blogs/:slug/related", related)
router.delete("/blogs/:slug", remove)
router.put("/blogs/:slug", update)


router.param('userId', userById)

export default router;