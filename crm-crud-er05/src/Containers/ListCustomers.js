import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, reset } from 'redux-form'
import _ from 'lodash'
import { getCustomers, saveCustomer, deleteCustomer } from '../Actions/CustomerActions'
//Navigation
import { Link } from 'react-router-dom'

class ListCustomers extends Component {
    componentWillMount() {
        this.props.getCustomers()
      }

    renderField(field) { 
        return(
          <input type="text" placeholder={`Enter a ${field.label}...`} {...field.input} /> 
        )
    }
 
    onSubmit(values) {
      this.props.saveCustomer(values).then(this.props.dispatch(reset('NewCustomer'))) 
    }
    
    renderCustomers() {
        return _.map(this.props.customers, (customer, key) => {
            return ( 
                <div key={key}>
                  <p>
                    Name: {customer.name}
                    <br />
                    Surname: {customer.surname}  
                    <br />
                    Phone: {customer.phone}
                    <br />
                    Email: {customer.email}{" "}   
                    <button onClick={() => {
                        this.props.deleteCustomer(key)
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
                  <h3><u>Customers:</u></h3>
                  {this.renderCustomers()}
                </div>
                <div>
                    {/** Nav <UpdatemCustomer />*/}
                  <Link to={"/UpdateCustomer"}>
                    Update Customer
                  </Link> 
                </div>
                <div>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <b>Add a new Customer</b> {" "} 
                        <Field
                          name="name"
                          component={this.renderField}
                          label="Name"
                        />
                         <Field
                          name="surname"
                          component={this.renderField}
                          label="Surname"
                        />
                        <Field
                          name="phone"
                          component={this.renderField}
                          label="Phone"
                        />
                        <Field
                          name="email"
                          component={this.renderField}
                          label="Email"
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
    form: 'NewCustomer'
})(ListCustomers) 

form = connect(state => ({
  customers: state.customers
}), { getCustomers, saveCustomer, deleteCustomer })(form)

export default form