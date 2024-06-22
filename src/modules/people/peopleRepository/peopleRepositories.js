import People from "../../../databases/models/people.js"


 const saveNewPeople = async(people) => {
    return await People.create(people)
}

export default { saveNewPeople };