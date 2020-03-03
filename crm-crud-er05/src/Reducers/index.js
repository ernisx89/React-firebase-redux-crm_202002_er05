import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import ServiceReducer from './ServiceReducer'
import MessageReducer from './MessageReducer'
import CustomerReducer from './CustomerReducer'
import ReservationReducer from './ReservationReducer'
import ReminderReducer from './ReminderReducer'
import UserReducer from './UserReducer'

//group of reducers, runs everytime when dispatch an action
//are gonna check case statements
const rootReducer = combineReducers({
    form: formReducer, //dispatch those things that matter
    services: ServiceReducer,
    messages: MessageReducer,
    customers: CustomerReducer,
    reservations: ReservationReducer,
    reminders: ReminderReducer,
    //login
    user: UserReducer
})

export default rootReducer

//everything is in reducer
//this.props.posts