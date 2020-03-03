import React from 'react';
import firebase from '../../Firebase';
import { Link } from 'react-router-dom'
//redirecting
import { getUser, logout } from '../../Actions/UserActions'
import { connect } from 'react-redux'

class UpdateTableService extends React.Component {
  constructor (props) {
  
    super(props);

    this.state = {
      title: props.title,
      description: props.description
    };

    this.dbItems = firebase.database().ref().child('mini-crm/services');

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
      <form onSubmit={ this.handleUpdateItem }>
        <label htmlFor={this.props.dbkey + 'itemname'}>Title </label>
        <input 
          id={this.props.dbkey + 'itemname'}
          onChange={ this.itemChange } 
          value={ this.state.title } 
          name="title"
        />
        <br/>
        <label htmlFor={this.props.dbkey + 'itemdescription'}>Description </label>
        <input 
          id={this.props.dbkey + 'itemdescription'}
          onChange={ this.itemChange } 
          value={ this.state.description } 
          name="description"
        />{" "}
        <button className="btn btn-primary">Update</button>
      </form>
    );
  }
}

  class UpdateService extends React.Component {
    constructor () {
      super();
      this.state = {
        items: []
      };
      this.dbItems = firebase.database().ref().child('mini-crm/services');
    }
  
    componentDidMount() {
      this.dbItems.on('value', dataSnapshot => {
        var items = [];
  
        dataSnapshot.forEach(function(childSnapshot) {
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
          <div className="Service-header">
            <h4>
              Update Services: 
            </h4>
          </div>
          <ol>
            {this.state.items.map(function(item) {
              return ( 
                <li key={ item['.key'] }>
                  <UpdateTableService 
                    dbkey={item['.key']} 
                    title={item.title} 
                    description={item.description} 
                  />
                   <br />
                </li>
               
              );
            })}
          </ol>
        </div>
      );
    }
  }
  function mapStateToProps(state, ownProps) {
    return { user: state.user }
  }

export default connect(mapStateToProps, {/**binding redirecting*/getUser, logout })(UpdateService);