import express from 'express'
import { engine } from 'express-handlebars'
import path from 'path'
import bodyParser from "body-parser"
import dotenv from 'dotenv'
import pageRoutes from "./routes/pages"
import adminRoutes from "./routes/admin"

dotenv.config()

const app = express()
const port = process.env.NODE_ENV === "production" ? 4000 : process.env.PORT || 3000

app.engine("hbs", engine({
  extname: "hbs",
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "views/layouts"),
  partialsDir: path.join(__dirname, "views/partials")
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(pageRoutes)
app.use("/admin", adminRoutes)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})