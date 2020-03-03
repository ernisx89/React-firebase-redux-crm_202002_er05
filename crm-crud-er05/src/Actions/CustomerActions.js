import { customersDb } from '../Firebase'
export const FETCH_CUSTOMERS = 'fetch_customers'

export function getCustomers() {
    return dispatch => {
      customersDb.on('value', snapshot => {
            dispatch({
                type: FETCH_CUSTOMERS,
                payload: snapshot.val()
            })
        })
    }
}

export function saveCustomer(customer) {
  return dispatch => customersDb.push(customer) 
}

export function deleteCustomer(id) {
  return dispatch => customersDb.child(id).remove()
}
