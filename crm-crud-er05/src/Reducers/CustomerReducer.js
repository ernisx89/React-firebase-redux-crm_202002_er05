import { FETCH_CUSTOMERS } from '../Actions/CustomerActions'

export default function (state={}, action) {
    switch(action.type) {
        case FETCH_CUSTOMERS: 
          return action.payload
        default: 
          return state
    }
}