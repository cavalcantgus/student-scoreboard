const students = []

function getAllStudents() {
    return students
}

function addStudent(student) {
    if(!student || typeof student !== 'object'){
        throw new Error('Invalid student object')
    }
    student.id = students.length + 1 
    students.push(student)
    return student
}

function updateStudent(id, updatedStudent) {
    if(!updatedStudent || typeof updatedStudent!== 'object'){
        throw new Error('Invalid updated student object')
    }
    const index = students.findIndex(student => student.id === id)
    if(index !== -1){
        students[index] = updatedStudent
        return students[index]
    } else {
        throw new Error('Student not found')
    }
}

function deleteStudent(id) {
    const index = students.findIndex(student => student.id === id)
    if(index !== -1){
        students.splice(index, 1)
        return true
    }
    return false
}

export default {
    getAllStudents,
    addStudent,
    updateStudent,
    deleteStudent
}