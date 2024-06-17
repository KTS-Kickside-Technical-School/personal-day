import express from "express"
import dotenv from "dotenv"
import "./databases/config/config.js" 

import swaggerUi from "swagger-ui-express"
import swaggerDocument from "../swagger.json" assert {type: 'json'}

dotenv.config()

const app = express()

const port = process.env.PORT || 3000

app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDocument))
app.listen(port,()=> console.log(`App listening on http://localhost:${port}`))