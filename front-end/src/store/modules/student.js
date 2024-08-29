const state = {
    students: []
}

const mutations = {
    SET_STUDENTS(state, students) {
        state.students = students
    },

    ADD_STUDENT(state, student) {
        state.students.push(student)
    },

    UPDATE_STUDENT(state, updatedStudent) {
        const index = state.students.findIndex(s => s.id === updatedStudent.id)
        if(index !== -1){
            state.students.splice(index, 1, updatedStudent)
        }
    },
    
    DELETE_STUDENT(state, id) {
        state.students = state.students.filter(s => s.id !== id)
    }
}

const actions = {
    async fetchStudents({ commit }) {
        try {
            const response = await fetch('http://localhost:3000/student')
            if(!response.ok){
                throw new Error(`HTTP Error! StatusCode: ${response.status}`)
            }
            const students = await response.json()
            commit('SET_STUDENTS', students)
        } catch(error) {
            console.error('Failed to fetch students', error)
        }
    },

    async saveStudent({ commit }, student) {
        try{ 
            let response
            let result 
            if (student.id) {
                response = await fetch(`http://localhost:3000/student/${student.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(student),
                    headers: { 'Content-Type': 'application/json' }
                })
            } else {
                response = await fetch('http://localhost:3000/student', {
                method: 'POST',
                body: JSON.stringify(student),
                headers: { 'Content-Type': 'application/json' }
                })
            }

            if(!response.ok){
                throw new Error(`HTTP Error! StatusCode: ${response.status}`)
            }
            
            result = await response.json()

            if(student.id){
                commit('UPDATE_STUDENT', result)
            } else {
                commit('ADD_STUDENT', result)
            }
        }
        catch(error) {
            console.error('Failed to save or update student:', error)
        }
      }, 

      async deleteStudent({ commit }, studentId) {
        try{
            const response = await fetch(`http://localhost:3000/student/${studentId}`, { method: 'DELETE' })
            if(!response.ok) {
                throw new Error(`HTTP Error! StatusCode: ${response.status}`)
            }
            commit('DELETE_STUDENT', studentId);
        }
        catch(error) {
            console.error('Failed to delete student', error)
        }
      }
}

const getters = {
    allStudents: state => state.students
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}