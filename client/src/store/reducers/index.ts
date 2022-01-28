import { combineReducers } from 'redux'
import auth from './authReducers'
import alert from './alertReducers'
import sidebar from './sidebarReducers'
export default combineReducers({
    auth,
    alert,
    sidebar
})

