import { FETCH_SERVICES } from '../Actions/ServiceActions'
//some kind of reducer
//whenever you dispatch an action it will always action.type
//run through ever case statemnet
//and return payload
//basic reducer
export default function (state={}, action) {
    switch(action.type) {
        case FETCH_SERVICES: 
          return action.payload
        default: 
          return state
    }
}
//it says there is a new service