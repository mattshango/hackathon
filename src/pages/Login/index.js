import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Page from '../'
import { loginUser } from '../../ducks/app'
import './style.scss'

class LoginPage extends Component {
  constructor(props){
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
    this._handleKeyPress = this._handleKeyPress.bind(this)
  }

  state = {
    username: "",
    password: "",
    loginDisabled: false
  }

  // Return true if error text length is more than 0
  checkErrors(text){
    if(text.length > 0) return true
    return false
  }

  // On Key Press
  _handleKeyPress(event){
    // On Enter Press
    if (event.key === 'Enter') {
      this.onSubmit()
    }
  }

  // On Submit
  onSubmit(){
    if(this.state.username.length === 0) return

    this.setState({loginDisabled: true})

    const {username, password} = this.state
    if(this.props.match.params.callback) return this.props.loginUser({
      username, 
      password, 
      callback: this.props.match.params.callback
    })
    
    this.props.loginUser({username, password})
  }

  componentDidUpdate(){
    // Enable login if errors appear when component updates
    if(this.checkErrors(this.props.loginError)) if(this.state.loginDisabled) this.setState({loginDisabled: false})
  }


  render() {
    return (
      <Page>
        <Helmet title="Login" />
        <div className="container">
          <h1 className="dashboard-h1">Login</h1>
          <div className="row">
            <div className="col-md-8 form">
              <input 
                type="text"
                className="form-control form__input"
                placeholder="Enter Username"
                value={this.state.username}
                onChange={({target}) => this.setState({username: target.value})}
                onKeyPress={this._handleKeyPress}
              />
               <input 
                type="password"
                className="form-control form__input"
                placeholder="Enter Password"
                value={this.state.password}
                onChange={({target}) => this.setState({password: target.value})}
                onKeyPress={this._handleKeyPress}
              />
              <div className={`alert alert-danger show--${this.checkErrors(this.props.loginError)}`} role="alert">
                {this.props.loginError}
              </div>
              <button 
                className="btn btn-primary"
                disabled={this.state.loginDisabled}
                onClick={this.onSubmit}
                onKeyPress={this._handleKeyPress}
              >
                Login
              </button>
              <p className="sign-up-text">New to the Hackathon? <Link to="/register">Sign Up</Link></p>
            </div>
          </div>
        </div>
      </Page>
    )
  }
} 

LoginPage.propTypes = {
  loginError: PropTypes.string
}

const mapStateToProps = state => ({
  loginError: state.app.loginError
})

export default connect(mapStateToProps, {
  loginUser
})(LoginPage)