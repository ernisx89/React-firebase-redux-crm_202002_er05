import React, { Component } from 'react'
import firebase from '../../Firebase'
import { Link } from 'react-router-dom'
//redirecting
import { getUser, logout } from '../../Actions/UserActions'
import { connect } from 'react-redux'


class UpdateTableReservation extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            time: props.time,
            customer: props.customer,
            service: props.service,
            status: props.status,
            reminder: props.reminder
        };
    
        this.dbItems = firebase.database().ref().child('mini-crm/reservations');
    
        this.itemChange = this.itemChange.bind(this);
        this.handleUpdateItem = this.handleUpdateItem.bind(this);
    
    }

    itemChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleUpdateItem(e) {
        e.preventDefault();
        if (this.state.time && this.state.time.trim().length !== 0) {
            this.dbItems.child(this.props.dbkey).update(this.state);
        }
      
    }

    render() {
        return (
            <form onSubmit={this.handleUpdateItem }>
                <label htmlFor={this.props.dbkey + 'itemtime'}>Time </label>
                <input 
                  id={this.props.dbkey + 'itemtime'}
                  //Note: type="datetime-local" is not supported in Firefox, Safari or Internet Explorer 12 (or earlier). 
                  type="datetime-local"
                  onChange={this.itemChange}
                  value={this.state.time}
                  name="time"
                />
                <br/>
                <label htmlFor={this.props.dbkey + 'itemcustomer'}>Customer </label>
                <input 
                  id={this.props.dbkey + 'itemcustomer'}
                  onChange={this.itemChange}
                  value={this.state.customer}
                  name="customer"
                />
                <br/>
                <label htmlFor={this.props.dbkey + 'itemservice'}>Service </label>
                <input
                  id={this.props.dbkey + 'itemservice'}
                  onChange={this.itemChange}
                  value={this.state.service}
                  name="service"
                />
                <br/>
                <label htmlFor={this.props.dbkey + 'itemstatus'}>Status </label>
                <input
                  id={this.props.dbkey + 'itemstatus'}
                  onChange={this.itemChange}
                  value={this.state.status}
                  name="status"
                />
                <br/>
                <label htmlFor={this.props.dbkey + 'itemreminder'}>Reminder </label>
                <input 
                  id={this.props.dbkey + 'itemreminder'}
                  onChange={this.itemChange}
                  value={this.state.reminder}
                  name="reminder"
                />
                <br/>
                <button className="btn btn-primary">Update</button>
            </form>
        );
    }
}

class UpdateReservation extends Component {
    constructor() {
        super();
        this.state = {
          items: []
        };
        this.dbItems = firebase.database().ref().child('mini-crm/reservations');
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
                  <Link to={"/"}>
                    Home
                  </Link>
                </div>
                <div>
                  <h4>
                    Update Reservation: 
                  </h4>
                </div>
                <ol>
                    {this.state.items.map((item) => {
                        return (
                            <li key={item['.key']}>
                                <UpdateTableReservation
                                  dbkey={item['.key']}
                                  time={item.time}
                                  customer={item.customer}
                                  service={item.service}
                                  status={item.status}
                                  reminder={item.reminder}
                                />{" "}
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

export default connect(mapStateToProps, {/**binding redirecting*/getUser, logout })(UpdateReservation);