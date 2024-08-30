const request = require('supertest')
const fastify = require('fastify')
const studentRoutes = require('../routes/StudentRoutes.js')
const studentHandler = require('../handler/StudentHandler.js')

jest.mock('../handler/StudentHandler.js')

describe('Teste de rotas', () => {
    const app = fastify()
    beforeAll(async () => {
        studentRoutes.forEach(route => app.route(route))
        await app.ready()
    })

    afterAll(() => app.close())

    test('Teste para o HTTP GET', async () => {
        const req = [{id: 1, name: 'Marcelo', disciplina: 'Matemática', grade1: 10, grade2: 10, grade3: 9, grade4: 9, average: 9.5, status: 'Aprovado' }]
        studentHandler.getAllStudents.mockResolvedValue(req)

        const response = await request(app.server).get('/student')

        expect(response.status).toBe(200)
        expect(response.body).toEqual(req)
        expect(studentHandler.getAllStudents).toHaveBeenCalled()
    })

    test('Teste para o HTTP POST', async () => {
        const newStudent = { name: 'Ana', disciplina: 'História', grade1: 8, grade2: 7, grade3: 9, grade4: 6 }
        const savedStudent = { id: 1, ...newStudent, average: 7.5, status: 'Aprovado' }
        studentHandler.addStudent.mockResolvedValue(savedStudent)

        const response = await request(app.server).post('/student').send(newStudent)
        
        expect(response.status).toBe(200)
        expect(response.body).toEqual(savedStudent)
    })

    test('Teste para o HTTP PUT', async () => {
        const id = 1
        const updateStudentData = { name: 'Ana', grade1: 9, grade2: 8, grade3: 10, grade4: 7 }
        const updatedStudent = { id: id, ...updateStudentData, average: 8.5, status: 'Aprovado'}
        studentHandler.updateStudent.mockResolvedValue(updatedStudent)

        const response = await request(app.server).put(`/student/${id}`).send(updateStudentData)

        expect(response.status).toBe(200)
        expect(response.body).toEqual(updatedStudent)
    })

    test('Teste para o HTTP DELETE', async () => {
        const id = 1;
        studentHandler.deleteStudent.mockResolvedValue(true)

        const response = await request(app.server).delete(`/student/${id}`)

        expect(response.status).toBe(200)
    })
})