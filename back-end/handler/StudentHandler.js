import studentRepository from '../repositories/StudentRepository.js'
import logger from '../logs/logger.js'

async function getAllStudents(req, reply) {
    try{
        const students = studentRepository.getAllStudents()
        reply.send(students)
    } catch(error) {
        logger.error('Failed to get students:', error)
        reply.code(500).send({ error: 'Failed to fetch students' })
    }
}

async function addStudent(req, reply) {
    try{
        const newStudent = req.body
        if(!newStudent || typeof newStudent !== 'object') {
            reply.code(400).send({ error: 'Invalid student!'})
        }
        const savedStudent = await studentRepository.addStudent(calculateAverageAndStatus(newStudent))
        logger.info('Student created')
        reply.code(201).send(savedStudent)
    } catch(error) {
        logger.error('Failed to add student:', error)
        reply.code(500).send({ error: 'Failed to add student'})
    }
}

async function updateStudent(req, reply) {
    try{
        const id  = Number(req.params.id)
        const updatedStudent = req.body
        if(!updatedStudent || typeof updatedStudent !== 'object'){
            reply.code(400).send({ error: 'Invalid student or ID'})
        }
        const student = await studentRepository.updateStudent(id, calculateAverageAndStatus(updatedStudent))
        if(student){
            logger.info('Update student')
            reply.send(student)
        } else {
            reply.code(404).send({ error: 'Student not found'})
        }
    } catch(error) {
        logger.error('Failed to update student:', error)
        reply.code(500).send({ error: 'Failed to update student'})
    }
}

async function deleteStudent(req, reply) {
    try{ 
        const id = Number(req.params.id)
        if(isNaN(id)){
            return reply.code(404).send({ error: 'Invalid ID'})
        }
        const result = studentRepository.deleteStudent(id)
        if(result) {
            logger.info('Delete student')
            reply.code(204).send()
        } else {
            reply.code(404).send({ error: 'Student not found'})
        }
    } catch(error) {
        logger.error('Failed to delete student:', error)
        reply.code(500).send({ error: 'Failed to delete student'})
    }
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