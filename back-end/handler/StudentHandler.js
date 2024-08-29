import studentRepository from '../repositories/StudentRepository.js';

async function getAllStudents(req, reply) {
    const students = studentRepository.getAllStudents()
    reply.send(students)
}

async function addStudent(req, reply) {
    const newStudent = req.body
    const savedStudent = await studentRepository.addStudent(calculateAverageAndStatus(newStudent))
    console.log('Student created')
    reply.code(201).send(savedStudent)
}

async function updateStudent(req, reply) {
    const id  = Number(req.params.id)
    const updatedStudent = req.body
    const student = await studentRepository.updateStudent(id, calculateAverageAndStatus(updatedStudent))
    if(student){
        reply.send(student)
    }
}

async function deleteStudent(req, reply) {
    const id = Number(req.params.id)
    studentRepository.deleteStudent(id)
}
 
function calculateAverageAndStatus(student) {
    const grades = [student.grade1, student.grade2, student.grade3, student.grade4].map(Number)
    const total = grades.reduce((sum, grade) => sum + grade, 0) 
    const average = (total / grades.length).toFixed(2)

    return {
        ...student,
        average: average,
        status: average >= 7 ? 'Aprovado' : 'Reprovado'
    }
}
export default {
    getAllStudents,
    addStudent,
    updateStudent,
    deleteStudent
}