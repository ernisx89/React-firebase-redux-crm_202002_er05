import { reservationsDb } from '../Firebase'
export const FETCH_RESERVATIONS = 'fetch_reservations'

export function getReservations() {
    return dispatch => {
      reservationsDb.on('value', snapshot => {
            dispatch({
                type: FETCH_RESERVATIONS,
                payload: snapshot.val()
            })
        })
    }
}

export function saveReservation(reservation) {
  return dispatch => reservationsDb.push(reservation) 
}

export function deleteReservation(id) {
  return dispatch => reservationsDb.child(id).remove()
}
