const studentsController = require('../controller/students')

const routes = [{
    method: 'POST',
    url: '/student',
    handler: studentsController.addStudent
}]