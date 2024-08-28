const students = []

function getAllStudents() {
    return students
}

function addStudent(student) {
    student.id = students.length + 1 
    students.push(student)
    return student
}

function updateStudent(id, updatedStudent) {
    const index = students.findIndex(student => student.id === id)
    if(index !== -1){
        students[index] = updatedStudent
        return students[index]
    } else {
        return null
    }
}

export default {
    getAllStudents,
    addStudent,
    updateStudent
}