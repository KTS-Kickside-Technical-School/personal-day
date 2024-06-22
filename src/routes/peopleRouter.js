import express from "express"
import { userAuthorization } from "../middlewares/authorization.js"
import { validateSchema } from "../middlewares/validation.js"
import { peopleValidation } from "../modules/people/peopleValidation/peopleValidations.js"
import { newPeople } from "../modules/people/peopleController/peopleControllers.js"

const router = express.Router()

router.post('/',userAuthorization(['client']),validateSchema(peopleValidation),newPeople)

export default router