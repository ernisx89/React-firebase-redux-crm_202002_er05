import React, { Component } from 'react';
import firebase from '../../Firebase'
import { Link } from 'react-router-dom'
//redirecting
import { getUser, logout } from '../../Actions/UserActions'
import { connect } from 'react-redux'

class UpdateTableReminder extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            title: props.title,
            assignedMessage: props.assignedMessage,
            status: props.status,
            sendingTime: props.sendingTime,
        };
  
        this.dbItems = firebase.database().ref().child('mini-crm/reminders');

        this.itemChange = this.itemChange.bind(this);
        this.handleUpdateItem = this.handleUpdateItem.bind(this);
    }

    itemChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleUpdateItem(e) {
        e.preventDefault();
        if (this.state.title && this.state.title.trim().length !== 0) {
            this.dbItems.child(this.props.dbkey).update(this.state);
        }
    }

    render() {
        return (
            <form onSubmit={this.handleUpdateItem }>
                <label htmlFor={this.props.dbkey + 'itemtitle'}>Title </label>
                <input 
                  id={this.props.dbkey + 'itemtitle'}
                  onChange={this.itemChange}
                    value={this.state.title}
                    name="title"
                />
                <br/>
                <label htmlFor={this.props.dbkey + 'itemassignedMessage'}>AssignedMessage </label>
                <input 
                  id={this.props.dbkey + 'itemassignedMessage'}
                  onChange={this.itemChange}
                  value={this.state.assignedMessage}
                  name="assignedMessage"
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
                <label htmlFor={this.props.dbkey + 'itemsendingTime'}>SendingTime </label>
                <input 
                  id={this.props.dbkey + 'itemsendingTime'}
                  onChange={this.itemChange}
                  value={this.state.sendingTime}
                  name="sendingTime"
                />{" "}
                <br/>
                <button className="btn btn-primary">Update</button>
            </form>
        );
    }
}

class UpdateReminder extends Component {
    constructor() {
        super();
        this.state = {
          items: []
        };
        this.dbItems = firebase.database().ref().child('mini-crm/reminders');
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
                    Update Reminders: 
                  </h4>
                </div>
                <ol>
                    {this.state.items.map((item) => {
                        return (
                            <li key={item['.key']}>
                                <UpdateTableReminder
                                  dbkey={item['.key']}
                                  title={item.title}
                                  assignedMessage={item.assignedMessage} 
                                  status={item.status}
                                  sendingTime={item.sendingTime}
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

export default connect(mapStateToProps, {/**binding redirecting*/getUser, logout })(UpdateReminder);