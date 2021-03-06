import {
    isLoggedInOptions,
    roleOptions,
    SET_EMAIL,
    SET_IMAGE,
    SET_LOG_IN,
    SET_NO_SYMPTOM_DAY,
    SET_ROLE
} from "../login_Actions";
import { combineReducers } from 'redux'

const {LOGOUT} = isLoggedInOptions
const {NOT_LOGGED_IN} = roleOptions
function loginReducer(state = LOGOUT, action) {
    switch (action.type) {
        case SET_LOG_IN:
            return action.loginOrNot
        default:
            return state
    }
}

function roleReducer(state = NOT_LOGGED_IN, action) {
    switch (action.type) {
        case SET_ROLE:
            return action.role
        default:
            return state
    }
}


function emailReducer(state = "", action) {
    switch (action.type) {
        case SET_EMAIL:
            return action.email
        default:
            return state
    }
}
function imageReducer(state = "", action) {
    switch (action.type) {
        case SET_IMAGE:
            return action.url
        default:
            return state
    }
}

function daysReducer(state = null, action) {
    switch (action.type) {
        case SET_NO_SYMPTOM_DAY:
            return action.day
        default:
            return state
    }
}
 const rootReducer = combineReducers({
     loginReducer,
     emailReducer,
     roleReducer,
     imageReducer,
     daysReducer
 })
export default rootReducer