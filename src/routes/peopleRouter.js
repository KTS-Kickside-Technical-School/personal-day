import express from "express"
import { userAuthorization } from "../middlewares/authorization.js"
import {
    validateSchema,
    isPeopleExist,
    isIdValid
} from "../middlewares/validation.js"
import { peopleValidation } from "../modules/people/peopleValidation/peopleValidations.js"
import {
    newPeople,
    userGetPeople,
    userDeletePeopleById,
    userUpdatePerson
} from "../modules/people/peopleController/peopleControllers.js"

const router = express.Router()

router.post('/', userAuthorization(['client']), validateSchema(peopleValidation), newPeople)
router.get('/', userAuthorization(['client']), userGetPeople)
router.put('/:id', userAuthorization(['client']), isIdValid, isPeopleExist, userUpdatePerson)
router.delete('/:id', userAuthorization(['client']), isIdValid, isPeopleExist, userDeletePeopleById)

export default router