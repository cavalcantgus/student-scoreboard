import { createStore } from 'vuex'
import student from './modules/student'

const store = createStore({
    modules: {
        student
    }
})

export default store