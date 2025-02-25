import { Router } from "express"

const router = Router()

router.get("/", (req, res) => {
    res.render("admin/dashboard", {
        layout: 'admin',
        title: 'Dadshboard',
        scriptPath: ['js/main.js'],
        cssPath: ['css/main.css']
    })
})

export default router