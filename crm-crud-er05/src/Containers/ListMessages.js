import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, reset } from 'redux-form'
import _ from 'lodash'
import { getMessages, saveMessage, deleteMessage } from '../Actions/MessageActions'
//Navigation
import { Link } from 'react-router-dom'

class ListMessages extends Component {
    componentWillMount() {
        this.props.getMessages()
      }

    renderField(field) { 
        return(
          <input type="text" placeholder={`Enter a ${field.label}...`} {...field.input} /> 
        )
    }
 
    onSubmit(values) {
      this.props.saveMessage(values).then(this.props.dispatch(reset('NewMessage'))) 
    }
    
    renderMessages() {
        return _.map(this.props.messages, (message, key) => {
            return ( 
                <div key={key}>
                    {message.text}{" "}    
                    <button onClick={() => {
                        this.props.deleteMessage(key)
                    }} className="btn btn-danger">Delete</button>
                </div>
            )
        }) 
    }

    render() {
        const { handleSubmit } = this.props 
        return ( 
            <div>
                <div>
                  <h3><u>Messages:</u></h3>
                  {this.renderMessages()}
                  <br />
                </div>
                <div>
                  {/** Nav <UpdatemMessage />*/}
                  <Link to={"/UpdateMessage"}>
                    Update Message
                  </Link> 
                </div>
                <div>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <b>Add a new message</b> {" "} 
                        <Field
                          name="text"
                          component={this.renderField}
                          label="Text"
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
    form: 'NewMessage'
})(ListMessages) 

form = connect(state => ({
  messages: state.messages
}), { getMessages, saveMessage, deleteMessage })(form)

export default form
