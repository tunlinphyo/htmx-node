import { Router } from "express"
import homeRoutes from "./home"

const router = Router()

// Use all route modules
router.use("/", homeRoutes)

export default router