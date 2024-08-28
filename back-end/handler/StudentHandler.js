import studentRepository from '../repositories/StudentRepository.js';

async function getAllStudents(req, reply) {
    const students = studentRepository.getAllStudents()
    reply.send(students)
}

async function addStudent(req, reply) {
    const newStudent = studentRepository.addStudent(req.body)
    console.log('Student created')
    reply.code(201).send(newStudent)
}

async function updateStudent(req, reply) {
    const id  = Number(req.params.id)
    const updatedStudent = req.body

    const student = studentRepository.updateStudent(id, updatedStudent)
    if(student){
        reply.send(student)
    }
}

async function deleteStudent(req, reply) {
    const id = Number(req.params.id)
    studentRepository.deleteStudent(id)
}
 
export default {
    getAllStudents,
    addStudent,
    updateStudent,
    deleteStudent
}