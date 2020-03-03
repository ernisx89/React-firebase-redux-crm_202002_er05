import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, reset } from 'redux-form'
import _ from 'lodash'
import { getServices, saveService, deleteService } from '../Actions/ServiceActions'
import { Link } from 'react-router-dom'
//redirecting
import { getUser, logout } from '../Actions/UserActions'

class ListServices extends Component {
    componentWillMount() {
        this.props.getServices()

        //redirecting
        this.props.getUser()
        if(this.props.user.loading === false && this.props.user.email === undefined) {
          this.props.history.replace('/Login')
        }
      }
      
  //redirecting
  componentWillReceiveProps(nextProps) {
    if(nextProps.user.loading === false && nextProps.user.email === undefined) {
      this.props.history.replace('/Login')
    }  
  }

    renderField(field) { //`` backticks allows a string interpolation
       // ... into another object, combine two objects together, 
       //can make another object with its keys and add another key on to
       //
        return(
          <input type="text" placeholder={`Enter a ${field.label}...`} {...field.input/*, key: value*/} /> 
        )
    }
 
    //values will be in for e.g. name="body"
    onSubmit(values) {
      this.props.saveService(values).then(this.props.dispatch(reset('NewService'))) 
      //after we done saving the service, form will be reset
    }
    
    //react is using Virtual DOM and its sniffs through
    //Link to used to service that title, its highlighted
    renderServices() {
        return _.map(this.props.services, (service, key) => {
            //everything in JSX must be wrapp in div
            return ( //react is using Virtual DOM and its sniffs through
                //each of this is gonna be unique
                <div key={key}> 
                {/*service details Link id*/}
                  <p>
                    {/* <Link to={`/${key}`}>  */}
                    Title: {service.title}
                      <br />
                    {/* </Link><br />  */}
                    Description: {service.description}{" "} 
                    <button onClick={() => {
                        this.props.deleteService(key) //key is taking from above parameter
                    }} className="btn btn-danger">Delete</button>
                  </p>
                </div>
            )
        }) //_ lodash fn
        //that will return an array of JSX force
    }
    render() {
        const { handleSubmit } = this.props //variable
        return ( //redux form 
            <div>
                <div className="d-flex justify-content-center">
                  {/**logout */}
                  <button 
                    className="btn btn-danger"
                    onClick={() => {this.props.logout()}} 
                  >Sign out</button>
                </div>
                <div>
                {/**Navigation Settings */}
                <Link to={"/"}>
                  Home
                </Link>
                </div>
                <div>
                  <h3><u>Services: </u></h3>
                  {this.renderServices()}
                </div>
                <div>
                <div>
                   {/** Nav <UpdateService />*/}
                  <Link to={"/UpdateService"}>
                    Update Service
                  </Link> 
                </div>
                </div>
                <div>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <b>Add a new service {" "} </b>
                        <Field
                          name="title"
                          component={this.renderField}
                          label="Title"
                        />
                        <Field
                          name="description"
                          component={this.renderField}
                          label="Description"
                        />
                        <button type="submit" className="btn btn-primary">Post</button>
                        <hr />
                    </form>
                </div>
            </div>    
        )
    }
}

//normal connect statement, put things for us, some lifecycle thing
let form = reduxForm({
    form: 'NewService'
})(ListServices) //binding, creating with a uinique identifier of newService

form = connect((state, /*redirecting*/ownProps) => ({
  services: state.services,
  /*redirecting*/user: state.user
}), { getServices, saveService, deleteService, /**binding redirecting*/getUser, logout })(form) //actions creators, these allow call functions above

export default form