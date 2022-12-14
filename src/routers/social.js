import { Router } from 'express'
import { create, read, list, remove, update } from '../controllers/social'

const router = new Router()

router.post("/social", create);
router.get("/social", list);
router.get("/social/:id", read);
router.delete("/social/:id", remove);
router.put("/social/:id", update);

export default router