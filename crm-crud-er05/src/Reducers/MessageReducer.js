import { FETCH_MESSAGES } from '../Actions/MessageActions'

export default function (state={}, action) {
    switch(action.type) {
        case FETCH_MESSAGES: 
          return action.payload
        default: 
          return state
    }
}
