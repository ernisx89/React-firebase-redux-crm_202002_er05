import React, { Component } from 'react';
import firebase from '../../Firebase'
import { Link } from 'react-router-dom' 
//redirecting
import { getUser, logout } from '../../Actions/UserActions'
import { connect } from 'react-redux'

class UpdateTableCustomer extends Component {
  constructor(props) {
    super(props);

    this.state = {
        name: props.name,
        surname: props.surname,
        phone: props.phone,
        email: props.email
    }

    this.dbItems = firebase.database().ref().child('mini-crm/customers');

    this.itemChange = this.itemChange.bind(this);
    this.handleUpdateItem = this.handleUpdateItem.bind(this);

  }

  itemChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleUpdateItem(e) {
      e.preventDefault();
      if (this.state.name && this.state.name.trim().length !== 0) {
          this.dbItems.child(this.props.dbkey).update(this.state);
      }
  }

    render() {
        return (
            <form onSubmit={this.handleUpdateItem }>
                <label htmlFor={this.props.dbkey + 'itemname'}>Name </label>
                <input 
                  id={this.props.dbkey + 'itemname'}
                  onChange={this.itemChange}
                    value={this.state.name}
                    name="name"
                />
                <br/>
                <label htmlFor={this.props.dbkey + 'itemsurname'}>Surname </label>
                <input 
                  id={this.props.dbkey + 'itemsurname'}
                  onChange={this.itemChange}
                  value={this.state.surname}
                  name="surname"
                />
                <br/>
                <label htmlFor={this.props.dbkey + 'itemphone'}>Phone </label>
                <input
                  id={this.props.dbkey + 'itemphone'}
                  onChange={this.itemChange}
                  value={this.state.phone}
                  name="phone"
                  type="number"
                />
                <br/>
                <label htmlFor={this.props.dbkey + 'itememail'}>Email </label>
                <input 
                  id={this.props.dbkey + 'itememail'}
                  onChange={this.itemChange}
                  value={this.state.email}
                  name="email"
                  type="email"
                />{" "}
                <br/>
                <button className="btn btn-primary">Update</button>
            </form>

        );
    }
}

class UpdateCustomer extends Component {
    constructor() {
        super();
        this.state = {
          items: []
        };
        this.dbItems = firebase.database().ref().child('mini-crm/customers');
    }

    componentDidMount() {
        this.dbItems.on('value', dataSnapshot => {
            var items = [];

            dataSnapshot.forEach((childSnapshot) => {
                var item = childSnapshot.val();
                item['.key'] = childSnapshot.key;
                items.push(item);
            });

            this.setState({
                items: items
            });
        });
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
    
    componentWillUnmount() {
        this.dbItems.off();
    }

    render() {
        return (
            <div>
              <div className="d-flex justify-content-center">
                {/**logout */}
                <button 
                  className="btn btn-danger"
                  onClick={() => {this.props.logout()}} 
                >Sign out</button>
              </div>
               <div>
                 <Link to={"/Settings"}>
                    Back
                 </Link>
                </div>
                <div>
                  <h4>
                    Update Customers: 
                  </h4>
                </div>
                <ol>
                    {this.state.items.map((item) => {
                        return (
                            <li key={item['.key']}>
                                <UpdateTableCustomer
                                  dbkey={item['.key']}
                                  name={item.name}
                                  surname={item.surname}
                                  phone={item.phone}
                                  email={item.email}
                                />
                                <br/>
                            </li>
                        );
                    })}
                </ol>
            </div>
        );
    }
}

//redirecting
function mapStateToProps(state, ownProps) {
  return { user: state.user }
}

export default connect(mapStateToProps, {/**binding redirecting*/getUser, logout })(UpdateCustomer);