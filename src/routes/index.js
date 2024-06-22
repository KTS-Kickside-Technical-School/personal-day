import express from "express"


import authRouter from "./authRouter.js"
import peoperRouter from "./peopleRouter.js"

const router = express.Router()

router.use("/auth",authRouter)
router.use("/people",peoperRouter)

export default router