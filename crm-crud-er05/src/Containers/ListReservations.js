import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, reset } from 'redux-form'
import _ from 'lodash'
import { getReservations, saveReservation, deleteReservation } from '../Actions/ReservationActions'
import { Link } from 'react-router-dom/';
import { getUser, logout } from '../Actions/UserActions'

class ListReservations extends Component {
  componentWillMount() {
    this.props.getReservations()
    //login
    this.props.getUser()
    if(this.props.user.loading === false && this.props.user.email === undefined) {
      this.props.history.replace('/Login')
    }
  }
  
    //login for redirecting home page
  componentWillReceiveProps(nextProps) {
    //console.log(nextProps)
    if(nextProps.user.loading === false && nextProps.user.email === undefined) {
      this.props.history.replace('/Login')
    }
  }

  renderField(field) { 
      return(
        <input type="text" placeholder={`Enter a ${field.label}...`} {...field.input} /> 
      )
  }

  /**for Cloud Function Note: type="datetime-local" is not supported in Firefox, Safari or Internet Explorer 12 (or earlier). */
  renderDateTime(field) {
    return (
      <input type="datetime-local" /*placeholder={`Enter a ${field.label}...`}*/ {...field.input} />
    )
  }

  onSubmit(values) {
    this.props.saveReservation(values).then(this.props.dispatch(reset('NewReservation'))) 
  }
  
  renderReservations() {
      return _.map(this.props.reservations, (reservation, key) => {
          return ( 
              <div key={key} className="card post">
                <p /*className="card-text"*/>
                  Time: {reservation.time}
                  <br />
                  Customer: {reservation.customer}  
                  <br />
                  Service: {reservation.service}
                  <br />
                  Status: {reservation.status}
                  <br />
                  Reminder: {reservation.reminder}{" "}   
                  <button onClick={() => {
                      this.props.deleteReservation(key)
                  }} className="btn btn-danger">Delete</button>
                </p>
              </div>
          )
      }) 
  }
  render() {
      const { handleSubmit } = this.props 
      return ( 
        <div>
          <div className="d-flex justify-content-center">
            {/**Logout */}
            <button 
              className="btn btn-danger"
              onClick={() => {this.props.logout()}} 
            >Sign out</button>
          </div>
          <div className="container">
              {/**Navigation */}
              <div>
                <Link to={"/Settings"}>
                  Settings
                </Link>
              </div>
              <div className="main">
                <h3><u>Reservations: </u></h3>
                {this.renderReservations()}
              </div>
              <div>
                  {/** Nav <UpdateReservation />*/}
                <Link to={"/UpdateReservation"}>
                  Update Reservation
                </Link> 
                <br /> <br />
              </div>
              <div /*className="navbar fixed-bottom"*/>
                  <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                  <b>Add a new Reservation</b> {" "} 
                      <Field
                        /**Note: type="datetime-local" is not supported in Firefox, Safari or Internet Explorer 12 (or earlier). */
                        name="time"
                        component={this.renderDateTime}
                        label="Time"
                        /* for css file class="footer-title"*/
                      />
                      <Field
                        name="customer"
                        component={this.renderField}
                        label="Customer"
                      />
                      <Field
                        name="service"
                        component={this.renderField}
                        label="Service"
                      />
                      <Field
                        name="status"
                        component={this.renderField}
                        label="Status"
                      />
                      <Field
                        name="reminder"
                        component={this.renderField}
                        label="Reminder"
                      />
                      <button type="submit" className="btn btn-primary">Post</button>
                  </form>
                  <hr />
              </div>
          </div> 
        </div>   
      )
  }
}

let form = reduxForm({
    form: 'NewReservation'
})(ListReservations) 

form = connect((state, /*login*/ownProps) => ({ 
  //ownProps takes whatever reducer initialstate have
  // i.e. in UserReducer.js
  reservations: state.reservations,
  //for login
  user: state.user
}), { getReservations, saveReservation, deleteReservation, /*login*/getUser, logout })(form)

export default form