import { Router } from "express"

const router = Router()

router.get("/", (req, res) => {
    res.render("admin/products", {
        layout: 'admin',
        title: 'Products',
        scriptPath: ['js/main.js'],
        cssPath: ['css/main.css']
    })
})

export default router