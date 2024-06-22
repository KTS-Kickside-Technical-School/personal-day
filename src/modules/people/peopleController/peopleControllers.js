import httpStatus from "http-status"

import peopleRepositories from "../peopleRepository/peopleRepositories.js"

export const newPeople = async (req, res) => {
    try {
        const { fullNames, email, phone } = req.body
        const userId = req.user._id
        const people = {
            userId: userId,
            fullNames: fullNames,
            ... (email && { email }),
            ... (phone && { phone }),

        }
        const newPeople = await peopleRepositories.saveNewPeople(people)

        return res.status(httpStatus.CREATED).json({ status: httpStatus.CREATED, message: "Person created successfully", data: { newPeople } })

    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error.message })
    }

}

export const userGetPeople = async (req, res) => {
    try {
        const people = await peopleRepositories.getPeoplesByAttributes("userId", req.user._id)
        return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: "People retrieved successfully", data: { people } })
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error.message })
    }
}

export const userDeletePeopleById = async (req, res) => {
    try {
        const deletedPerson = await peopleRepositories.deletePeopleByAttributes("_id", req.people._id)
        return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: "Person deleted successfully", data: { deletedPerson } })
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error.message });
    }
}


export const userUpdatePerson = async (req, res) => {
    try {
        const { fullNames, email, phone } = req.body
        const userId = req.user._id
        const people = {
            userId: userId,
            fullNames: fullNames,
            ... (email && { email }),
            ... (phone && { phone })
        }

        const updatedPerson = await peopleRepositories.updatePersonByAttributes("_id", req.params.id, people)
        return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: "Updated successfully", data: { updatedPerson } })
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error.message });
    }
}