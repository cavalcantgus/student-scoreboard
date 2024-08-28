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

export default {
    getAllStudents,
    addStudent
}