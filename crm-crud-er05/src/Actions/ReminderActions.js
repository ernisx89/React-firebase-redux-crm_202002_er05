import { remindersDb } from '../Firebase'
export const FETCH_REMINDERS = 'fetch_reminders'

export function getReminders() {
    return dispatch => {
      remindersDb.on('value', snapshot => {
            dispatch({
                type: FETCH_REMINDERS,
                payload: snapshot.val()
            })
        })
    }
}

export function saveReminder(reminder) {
  return dispatch => remindersDb.push(reminder) 
}

export function deleteReminder(id) {
  return dispatch => remindersDb.child(id).remove()
}