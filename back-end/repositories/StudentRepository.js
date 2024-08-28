const students = []

function getAllStudents() {
    return students
}

function addStudent(student) {
    student.id = students.length + 1 
    students.push(student)
    return student
}

export default {
    getAllStudents,
    addStudent
}