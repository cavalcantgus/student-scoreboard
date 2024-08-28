import studentHandler from '../handler/StudentHandler.js'

const studentRoutes = [
    {
        method: 'GET',
        url: '/student',
        handler: studentHandler.getAllStudents
    },

    {
        method: 'POST',
        url: '/student',
        handler: studentHandler.addStudent
    }
]

export default studentRoutes