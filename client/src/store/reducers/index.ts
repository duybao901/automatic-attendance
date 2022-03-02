import { combineReducers } from 'redux'
import auth from './authReducers'
import alert from './alertReducers'
import sidebar from './sidebarReducers'
import teacher from './teacherReducers'
import course from './courseReducers'
import profile from './profileReducer'
export default combineReducers({
    auth,
    alert,
    sidebar,
    teacher,
    course,
    profile
})

