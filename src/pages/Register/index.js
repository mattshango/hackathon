import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'

import Page from '../'
import { registerUser } from '../../ducks/app'
import { urlHost } from '../../constants'
import './style.scss'

class RegisterPage extends Component {
  constructor(props){
    super(props)

    this.validateUsername = this.validateUsername.bind(this)
    this.validateEmail = this.validateEmail.bind(this)
    this.validatePassword = this.validatePassword.bind(this)
    this.validateConfirmPassword = this.validateConfirmPassword.bind(this)
    this.allFieldsValidated = this.allFieldsValidated.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  state = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",

    usernameError: "",
    emailError: "",
    passwordError: "", 
    confirmPasswordError: "",

    signUpDisabled: true
  }

  // On Submit
  onSubmit(){
    const {username, email, password} = this.state
    this.props.registerUser({username, email, password})
  }

  // Check if all fields are validated
  allFieldsValidated(){
    if(
      !this.checkErrors(this.state.usernameError) &&
      !this.checkErrors(this.state.emailError) &&
      !this.checkErrors(this.state.passwordError) &&
      !this.checkErrors(this.state.confirmPasswordError)
    ) return true

    return false
  }

  // Return true if error text length is more than 0
  checkErrors(text){
    if(text.length > 0) return true
    return false
  }

  // Validate Username
  validateUsername(event){
    const username = event.target.value.trim()
    this.setState({username})

    // Validation
    if(/^[0-9-]+$/.test(username.substring(0,1)) || /^[0-9-]+$/.test(username.substring(username.length-1,1))){
      return this.setState({
        usernameError: "First or character can not be a hyphen or number",
        signUpDisabled: true
      })
    }else if(username.length < 4 || username.length > 15){
      return this.setState({
        usernameError: "Username should be between 4-15 characters",
        signUpDisabled: true
      })
    }else if(!/^[A-Za-z0-9-]+$/.test(username)){
      return this.setState({
        usernameError: "Characters, numbers and hyphens only",
        signUpDisabled: true
      })
    }else{
      // Check database
      axios.get(`${urlHost}/api/users/username/${username}`)
      .then(response => {
        return this.setState({
          usernameError: response.data ? "Username already exist" : "",
          signUpDisabled: response.data ? true : this.state.signUpDisabled,
        },() => {
          if(!response.data) this.setState({signUpDisabled: this.allFieldsValidated()})
        })
      }).catch(() => {
        return this.setState({
          usernameError: "Error checking username",
          signUpDisabled: true
        })
      })
    }
    
  }

  // Validate Email
  validateEmail(event){
    const email = event.target.value.toLowerCase()
    this.setState({email})

    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    // Email is valid
    if(regex.test(email)){
        // Check database
        axios.get(`${urlHost}/api/users/email/${email}`)
        .then(response => {
          return this.setState({
            emailError: response.data ? "Email has been used" : "",
            signUpDisabled: response.data ? true : this.state.signUpDisabled,
          },() => {
            if(!response.data) this.setState({signUpDisabled: this.allFieldsValidated()})
          })
        }).catch(() => {
          return this.setState({
            emailError: "Error checking email",
            signUpDisabled: true
          })
        })
    }else {
      return this.setState({
        emailError: "Invalid email",
        signUpDisabled: true
      })
    }

  }

  // Validate Password
  validatePassword(event){
    const password = event.target.value
    this.setState({password})


    if(password.length < 6){
      return this.setState({
        passwordError: "Password must be minimum 6 characters ",
        signUpDisabled: true
      })
    }else {
      this.setState({passwordError: ""})
    }
    
    if(password !== this.state.confirmPassword){
      return this.setState({
        confirmPasswordError: "Passwords do not match",
        signUpDisabled: true
      }) 
    }

    return this.setState({
      passwordError: "",
      signUpDisabled: this.allFieldsValidated()
    })
  }

  // Validate Confirm Password
  validateConfirmPassword(event){
    const confirmPassword = event.target.value 
    this.setState({confirmPassword})

    const password = this.state.password

    if(password !== confirmPassword){
      return this.setState({
        confirmPasswordError: "Passwords do not match",
        signUpDisabled: true
      }) 
    }

    return this.setState({
      confirmPasswordError: "",
      signUpDisabled: this.allFieldsValidated()
    })
  }

  render() {
    return (
      <Page>
        <Helmet title="Register" />
        <div className="container">
          <h1 className="dashboard-h1">Register</h1>
          <div className="row">
            <div className="col-md-8 form">
              <input 
                type="text"
                className="form-control form__input"
                placeholder="Username"
                value={this.state.username}
                onChange={this.validateUsername}
              />
              <div className={`alert alert-danger show--${this.checkErrors(this.state.usernameError)}`} role="alert">
                {this.state.usernameError}
              </div>
              <input 
                type="text"
                className="form-control form__input"
                placeholder="Email"
                value={this.state.email}
                onChange={this.validateEmail}
              />
              <div className={`alert alert-danger show--${this.checkErrors(this.state.emailError)}`} role="alert">
                {this.state.emailError}
              </div>
              <input 
                type="password"
                className="form-control form__input"
                placeholder="Password"
                value={this.state.password}
                onChange={this.validatePassword}
              />
              <div className={`alert alert-danger show--${this.checkErrors(this.state.passwordError)}`} role="alert">
                {this.state.passwordError}
              </div>
              <input 
                type="password"
                className="form-control form__input"
                placeholder="Confirm Password"
                value={this.state.confirmPassword}
                onChange={this.validateConfirmPassword}
              />
              <div className={`alert alert-danger show--${this.checkErrors(this.state.confirmPasswordError)}`} role="alert">
                {this.state.confirmPasswordError}
              </div>
              <button 
                className="btn btn-primary"
                disabled={this.state.signUpDisabled}
                onClick={this.onSubmit}
              >
                Sign Up
              </button>
              <p className="sign-up-text">Have an account? <Link to="/login">Login</Link></p>
            </div>
          </div>
        </div>
      </Page>
    )
  }
} 


export default connect(null, { registerUser })(RegisterPage)