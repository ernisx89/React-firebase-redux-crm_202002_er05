import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, reset } from 'redux-form'
import _ from 'lodash'
import { getReminders, saveReminder, deleteReminder } from '../Actions/ReminderActions'
import { Link } from 'react-router-dom'

class ListReminders extends Component {
    componentWillMount() {
        this.props.getReminders()
      }

    renderField(field) { 
        return(
          <input type="text" placeholder={`Enter a ${field.label}...`} {...field.input} /> 
        )
    }
 
    onSubmit(values) {
      this.props.saveReminder(values).then(this.props.dispatch(reset('NewReminder'))) 
    }
    
    renderReminders() {
        return _.map(this.props.reminders, (reminder, key) => {
            return ( 
                <div key={key}>
                  <p>
                    Title: {reminder.title}
                    <br />
                    AssignedMessage: {reminder.assignedMessage}  
                    <br />
                    Status: {reminder.status}
                    <br />
                    Sending Time: {reminder.sendingTime}{" "}   
                    <button onClick={() => {
                        this.props.deleteReminder(key)
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
                <div>
                  <h3><u>Reminders: </u></h3>
                  {this.renderReminders()}
                </div>
                <div>
                    {/** Nav <UpdatemReminder />*/}
                  <Link to={"/UpdateReminder"}>
                    Update Reminder 
                  </Link> 
                </div>
                <div>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <b>Add a new Reminder</b> {" "} 
                        <Field
                          name="title"
                          component={this.renderField}
                          label="Title"
                        />
                         <Field
                          name="assignedMessage"
                          component={this.renderField}
                          label="AssignedMessage"
                        />
                        <Field
                          name="status"
                          component={this.renderField}
                          label="Status"
                        />
                        <Field
                          name="sendingTime"
                          component={this.renderField}
                          label="SendingTime"
                        />
                        <button type="submit" className="btn btn-primary">Post</button>
                    </form>
                    <hr />
                </div>
            </div>    
        )
    }
}

let form = reduxForm({
    form: 'NewReminder'
})(ListReminders) 

form = connect(state => ({
  reminders: state.reminders
}), { getReminders, saveReminder, deleteReminder })(form)

export default form