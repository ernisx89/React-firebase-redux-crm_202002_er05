import * as firebase from 'firebase'

var config = {
  apiKey: "xxxxxs",
  authDomain: "xxxxx",
  databaseURL: "xxxx",
  projectId: "xxxx",
  storageBucket: "xxxx",
  messagingSenderId: "xxxx",
  appId: "xxxxx"
};

firebase.initializeApp(config)

export const servicesDb = firebase.database().ref('mini-crm/services/')
export const messagesDb = firebase.database().ref('mini-crm/messages')
export const customersDb = firebase.database().ref('mini-crm/customers')
export const reservationsDb = firebase.database().ref('mini-crm/reservations')
export const remindersDb = firebase.database().ref('mini-crm/reminders')
//login
export const auth = firebase.auth()
//google auth
export const googleProvider = new firebase.auth.GoogleAuthProvider()

export default firebase

