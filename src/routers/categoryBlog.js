import { Router } from 'express'
import { create, read, list, remove, update } from '../controllers/categoryBlog'

const router = new Router()

router.post("/categoryBlog", create);
router.get("/categoryBlog", list);
router.get("/categoryBlog/:slug", read);
router.delete("/categoryBlog/:slug", remove);
router.put("/categoryBlog/:slug", update);

export default router