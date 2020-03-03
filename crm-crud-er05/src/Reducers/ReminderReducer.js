import { FETCH_REMINDERS } from '../Actions/ReminderActions'

export default function (state={}, action) {
    switch(action.type) {
        case FETCH_REMINDERS: 
          return action.payload
        default: 
          return state
    }
}