const studentHandler = require('../handler/StudentHandler.js')


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
    },

    {
        method: 'DELETE',
        url: '/student/:id',
        handler: studentHandler.deleteStudent
    }
]

module.exports= studentRoutes