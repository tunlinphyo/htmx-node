import { Router } from "express"
import dashboardRoutes from "./dashboard"
import productRoutes from "./product"

const router = Router()

router.use("/", dashboardRoutes)
router.use("/products/", productRoutes)

export default router