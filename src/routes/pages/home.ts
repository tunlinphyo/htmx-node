import { Router } from "express"
import { Utils } from "../../models/utils"

const router = Router()

router.get("/", (req, res) => {
    res.render("home", {
        title: 'Home Page',
        scriptPath: ['/js/main.js'],
        cssPath: ['/css/main.css', '/css/home.css']
    })
})

router.get("/list", async (req, res) => {
    await Utils.loading([500, 1000])

    const list = ['Apple', 'Google', 'Microsoft', 'Facebook', 'Nvidia']
    res.render("partials/home-list", { layout: false, list })
})

export default router