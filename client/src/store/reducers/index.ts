import { combineReducers } from 'redux'
import auth from './authReducers'
import alert from './alertReducers'
export default combineReducers({
    auth,
    alert
})

