import People from "../../../databases/models/people.js"


const saveNewPeople = async (people) => {
    return await People.create(people)
}

const getPeoplesByAttributes = async (key, value) => {
    return await People.find({ [key]: value })
}
const getSinglePersonByAttributes = async (key, value) => {
return await People.findOne({ [key]: value })
}

const deletePeopleByAttributes = async (key, value) => {
    return await People.findOneAndDelete({ [key]: value })
}

const updatePersonByAttributes = async (key, value, updatedPerson) => {
    return await People.findOneAndUpdate({ [key]: value }, updatedPerson, { new: true });
};
export default { saveNewPeople, getPeoplesByAttributes, deletePeopleByAttributes,getSinglePersonByAttributes,updatePersonByAttributes };