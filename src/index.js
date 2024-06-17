import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import morgan from "morgan"

import "./databases/config/config.js"

import swaggerUi from "swagger-ui-express"
import swaggerDocument from "../swagger.json" assert {type: 'json'}

import router from "./routes/index.js"

dotenv.config()

const app = express()

const port = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())
app.use(morgan(process.env.NODE_EN))

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use("/api", router)

app.get("**", (req, res) => {
    res.status(200).json({ status: 200, message: "Welcome to Personal Day System" })
})

app.listen(port, () => console.log(`App listening on http://localhost:${port}`))