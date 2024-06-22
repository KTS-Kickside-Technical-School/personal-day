import httpStatus from "http-status"

import peopleRepositories from "../peopleRepository/peopleRepositories.js"

export const newPeople = async (req, res) => {
    try {
        const { fullNames, email, phone } = req.body
        const  userId  = req.user._id
        const people = {
            userId: userId,
            fullNames: fullNames,
            ... (email && { email }),
            ... (phone && { phone }),

        }

        console.log(people)
        const newPeople = await peopleRepositories.saveNewPeople(people)

        return res.status(httpStatus.CREATED).json({ status: httpStatus.CREATED, message: "Person created successfully", data: { newPeople } })

    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error.message })
    }

}
