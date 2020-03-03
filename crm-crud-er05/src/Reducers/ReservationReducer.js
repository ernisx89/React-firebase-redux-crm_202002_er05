import { FETCH_RESERVATIONS } from '../Actions/ReservationActions'

export default function (state={}, action) {
    switch(action.type) {
        case FETCH_RESERVATIONS: 
          return action.payload
        default: 
          return state
    }
}