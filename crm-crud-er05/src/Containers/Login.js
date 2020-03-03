import React, { Component } from 'react'
import SimpleBox from './SimpleBoxComponent'
import InputField from './InputFieldComponent'
import FooterFormButton from './FooterFormButtonComponent'
//for login(async task) er05
import { login, getUser, googleLogin } from '../Actions/UserActions'
import { connect } from 'react-redux'
import ErrorAlert from './ErrorAlertComponent'
//google auth
import SocialMediaLogin from './SocialMediaLoginComponent'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error: ''
    }
  }
 
  componentWillMount() {
    this.props.getUser()
  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.user.email !== undefined) {
      this.props.history.push('/')
    } 
  }

  submitLogin(event) {
    event.preventDefault()
    this.props.login(this.state.email, this.state.password)
    .catch(err => {this.setState({
      error: err
    })})
  }

  renderBody() {
    //enough for login in react state,
    //becouse i dont need store this info in redux store
    const errStyle = {
      borderColor: 'red'
    }
    return (
      <form onSubmit={event => { this.submitLogin(event) /**reason for event stop propagation of event*/}}>
        <div>
          <InputField 
            id="email" 
            type="text" 
            label="Email" 
            inputAction={(event) => this.setState({
              email: event.target.value
            })} 
            style={this.state.error ? errStyle : null}
          />
          <InputField 
            id="password"
            type="password"
            label="Password"
            inputAction={(event) => this.setState({
              password: event.target.value
            })}
            style={this.state.error ? errStyle : null}
          />
          {/* condititional */}
          {this.state.error && <ErrorAlert>Your email or password is incorrect</ErrorAlert>}
          <FooterFormButton submitLabel="Sign in" />
          {/* google auth */}
          <SocialMediaLogin {...this.props} /> 
        </div>
      </form>
    )
  }

  render() {
    //console.log(this.state)
    return (
    <div>
      <SimpleBox title="Sign in" body={this.renderBody()}/>
    </div>
    )
  }
}

function mapStateToProps(state) {
  return { user: state.user }
}

export default connect(mapStateToProps, { login, getUser, googleLogin })(Login)