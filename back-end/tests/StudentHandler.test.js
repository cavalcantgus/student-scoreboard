const studentHandler = require('../handler/StudentHandler.js')
const studentRepository = require('../repositories/StudentRepository.js')
const logger = require('../logs/logger.js')

jest.mock('../repositories/StudentRepository.js')
jest.mock('../logs/logger')

describe('StudentHandler', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    test('Retorna todos os estudantes', async () => {
        const req = {}
        const reply = { send: jest.fn() }

        const students = [{id: 1, name: 'Marcelo', disciplina: 'Matemática', grade1: 10, grade2: 8, grade3: 6.5, grade4: 9, average: 8.37, status: 'Aprovado'}]
        studentRepository.getAllStudents.mockReturnValue(students)

        await studentHandler.getAllStudents(req, reply)
        expect(reply.send).toHaveBeenCalledWith(students)
    })

    test('Adiciona um novo estudante', async () => {
        const req = {body: { name: 'Marcelo', disciplina: 'Matemática', grade1: 10, grade2: 8, grade3: 6.5, grade4: 9}}
        const reply = { code: jest.fn().mockReturnThis(), send: jest.fn()}
        
        const savedStudent = {id: 1, ...req.body, average: 8.37, status: 'Aprovado'}
        studentRepository.addStudent.mockResolvedValue(savedStudent)

        await studentHandler.addStudent(req, reply)

        expect(reply.code).toHaveBeenCalledWith(201)
        expect(reply.send).toHaveBeenCalledWith(savedStudent)
        expect(logger.info).toHaveBeenCalledWith('Student created')
    })

    test('Atualiza um estudante existente', async () => {
        const req = { params: {id: '1'}, body: { name: 'Marcelo', disciplina: 'Matemática', grade1: 10, grade2: 8, grade3: 10, grade4: 10}}
        const reply = { code: jest.fn().mockReturnThis(), send: jest.fn()}

        const updatedStudent = { id: 1, ...req.body, average: 9.5, status: 'Aprovado'}
        studentRepository.updateStudent.mockResolvedValue(updatedStudent)

        await studentHandler.updateStudent(req, reply)
        
        expect(reply.send).toHaveBeenCalledWith(updatedStudent)
        expect(logger.info).toHaveBeenCalledWith('Update student')
    })

    test('Deleta um estudante existente', async () => {
        const req = { params: {id: '1'}}
        const reply = { code: jest.fn().mockReturnThis(), send: jest.fn()}

        studentRepository.deleteStudent.mockReturnValue(true)

        await studentHandler.deleteStudent(req, reply)

        expect(reply.code).toHaveBeenCalledWith(204)
        expect(reply.send).toHaveBeenCalled()
        expect(logger.info).toHaveBeenCalledWith('Delete student')
    })
})