import React from 'react';
import ReactDOM from 'react-dom';

import { applyMiddleware, createStore } from 'redux' //global store for redux
import thunk from 'redux-thunk'
import reducers from './Reducers/index'
import { Provider } from 'react-redux'
import { BrowserRouter, /*Switch, */Route } from 'react-router-dom'

import ListServices from './Containers/ListServices'
//import ServiceDetail from './Containers/ServiceDetail'

import ListMessages from './Containers/ListMessages'
import ListCustomers from './Containers/ListCustomers'
import ListReservations from './Containers/ListReservations'
import ListReminders from './Containers/ListReminders'

//Nav 
import UpdateReservation from './Containers/Updates/UpdateReservation'
import UpdateMessage from './Containers/Updates/UpdateMessage'
import UpdateReminder from './Containers/Updates/UpdateReminder'
import UpdateCustomer from './Containers/Updates/UpdateCustomer'
import UpdateService from './Containers/Updates/UpdateService'

//auth
import Login from './Containers/Login'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore) //kind a bind

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)} >
  <BrowserRouter>
    <Route path="/Login" component={Login} />
    <Route path="/Settings" component={ListServices} />
    <Route path="/Settings" component={ListMessages} />
    <Route path="/Settings" component={ListCustomers} />
    <Route exact path="/" component={ListReservations} />
    <Route path="/Settings" component={ListReminders} />

    <Route path="/UpdateReservation" component={UpdateReservation} />
    <Route path="/UpdateMessage" component={UpdateMessage} />
    <Route path="/UpdateReminder" component={UpdateReminder} />
    <Route path="/UpdateCustomer" component={UpdateCustomer} />
    <Route path="/UpdateService" component={UpdateService} />
  
  </BrowserRouter>
  </Provider>,
  document.getElementById('root'))
