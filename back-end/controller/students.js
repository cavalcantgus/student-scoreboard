const students = []

const addStudent = async (req, reply) => {
    const id = students.length + 1
    const newStudent = {
        id,
        ...req.body
    }
    students.push(newStudent)
    reply.code(201).send(newStudent)
}

module.exports = {
    addStudent
}