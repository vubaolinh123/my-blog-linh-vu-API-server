import { Router } from 'express'
import { list,read, update } from '../controllers/color'

const router = new Router()

router.get("/colors", list);
router.get("/colors/:id", read);
router.put("/colors/:id", update);

export default router