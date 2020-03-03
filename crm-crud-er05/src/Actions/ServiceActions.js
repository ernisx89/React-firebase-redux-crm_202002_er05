import { servicesDb } from '../Firebase'
export const FETCH_SERVICES = 'fetch_services'

export function getServices() {
    //whenever we call getServices we are basically 
    //subscribing our components
    //anytime db updated, we are gonna call a function bellow
    return dispatch => {
      servicesDb.on('value', snapshot => {
            dispatch({
                type: FETCH_SERVICES,
                payload: snapshot.val()
            })
        })
    }
}

export function saveService(service) {
  return dispatch => servicesDb.push(service) //gonna push JS value key 
}

export function deleteService(id) {
  return dispatch => servicesDb.child(id).remove()
}

export function saveServiceDetails(serviceId, serviceDetails) {
  return dispatch => servicesDb.child(serviceId).child('serviceDetails').push({content: serviceDetails.content})
}


