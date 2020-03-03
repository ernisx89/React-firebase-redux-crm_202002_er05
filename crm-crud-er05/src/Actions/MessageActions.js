import { messagesDb } from '../Firebase'
export const FETCH_MESSAGES = 'fetch_messages'

export function getMessages() {
    return dispatch => {
      messagesDb.on('value', snapshot => {
            dispatch({
                type: FETCH_MESSAGES,
                payload: snapshot.val()
            })
        })
    }
}

export function saveMessage(message) {
  return dispatch => messagesDb.push(message) 
}

export function deleteMessage(id) {
  return dispatch => messagesDb.child(id).remove()
}

//edit
export function editMessage(id) {
  return dispatch => messagesDb.child(id).remove()
}