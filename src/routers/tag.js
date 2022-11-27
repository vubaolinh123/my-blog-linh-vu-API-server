import { Router } from 'express'
import { create, read, list, remove, update } from '../controllers/tag'

const router = new Router()

router.post("/tag", create);
router.get("/tag", list);
router.get("/tag/:slug", read);
router.delete("/tag/:slug", remove);
router.put("/tag/:slug", update);

export default router