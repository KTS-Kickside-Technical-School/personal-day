import express from "express"
import dotenv from "dotenv"

dotenv.config()

import "./databases/config//config.js"

const app = express()

const port = process.env.PORT || 3000
app.listen(port,()=> console.log(`App listening on http://localhost:${port}`))