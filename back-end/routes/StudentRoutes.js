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
    },
    
    {
        method: 'PUT',
        url: '/student/:id',
        handler: studentHandler.updateStudent
    }
]

export default studentRoutes