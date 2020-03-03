import React, { Component } from 'react'
import firebase from '../../Firebase'
import { Link } from 'react-router-dom'
//redirecting
import { getUser, logout } from '../../Actions/UserActions'
import { connect } from 'react-redux'

class UpdateTableMessage extends Component {
  constructor(props) {
      super(props);
  
      this.state = {
          text: props.text
      }

      this.dbItems = firebase.database().ref().child('mini-crm/messages');
      this.itemChange = this.itemChange.bind(this);
      this.handleUpdateItem = this.handleUpdateItem.bind(this)
  }

  itemChange(e) {
      this.setState({ [e.target.name]: e.target.value })
  }

  handleUpdateItem(e) {
      e.preventDefault()
      if (this.state.text && this.state.text.trim().length !== 0) {
          this.dbItems.child(this.props.dbkey).update(this.state)
      }
  }

  render() {
      return (
          <form onSubmit={this.handleUpdateItem }>
              <label htmlFor={this.props.dbkey + 'itemtext'}></label>
              <textarea 
                id={this.props.dbkey + 'itemtext'}
                onChange={this.itemChange}
                  value={this.state.text}
                  name="text"
              ></textarea>{" "}
              <button className="btn btn-primary">Update</button>
          </form>
      );
  }
}

class UpdateMessage extends Component {
  constructor(props) {
      super(props)
      this.state = {
        items: []
      }   
      this.dbItems = firebase.database().ref().child('mini-crm/messages'); 
  }


  componentDidMount() {
      this.dbItems.on('value', dataSnapshot => {
          var items = []

          dataSnapshot.forEach((childSnapshot) => {
              var item = childSnapshot.val()
              item['.key'] = childSnapshot.key
              items.push(item)
          })

          this.setState({
              items: items
          })
      })
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
              <Link to={"/Settings"}>
                Back
              </Link>
              <div>
                  <b>Update Messages: </b>
              </div>
              <ol>
                  {this.state.items.map((item) => {
                      return (
                          <li key={item['.key']}>
                              <UpdateTableMessage
                                dbkey={item['.key']}
                                text={item.text}
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

export default connect(mapStateToProps, {/**binding redirecting*/getUser, logout })(UpdateMessage)