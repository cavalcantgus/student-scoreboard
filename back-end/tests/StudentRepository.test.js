const studentRepository = require('../repositories/StudentRepository.js');

describe('StudentReposoitory', () => {
    beforeEach(() => {
        studentRepository.getAllStudents().length = 0
    })
    
    test('Adiciona um novo estudante', () => {
        const student = { name: 'Marcelo', disciplina: 'Matemática', grade1: 7, grade2: 8, grade3: 6, grade4: 9}
        const addStudent = studentRepository.addStudent(student)

        expect(addStudent).toHaveProperty('id', 1)
        expect(studentRepository.getAllStudents()).toHaveLength(1)
    })

    test('Atualiza um estudante existente', () => {
        const student = { name: 'Maria', disciplina: 'Matemática', grade1: 10, grade2: 5, grade3: 10, grade4: 9}
        const addStudent = studentRepository.addStudent(student)

        const updateStudent = { name: 'Maria', grade1: 10, grade2: 6.5, grade3: 10, grade4: 9}
        const updatedStudent = studentRepository.updateStudent(addStudent.id, updateStudent)

        expect(updatedStudent).toMatchObject(updateStudent)
        expect(updatedStudent).toHaveProperty('id', 1)
    })
})