import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    userId: '',
    pin1: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin1: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {userId, pin1} = this.state
    // const userDetails = {userId, pin}
    const userDetails = {user_id: userId, pin: pin1}

    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
      console.log(response)
    } else {
      this.onSubmitFailure(data.error_msg)
      console.log(response)
    }
  }

  render() {
    const {showSubmitError, errorMsg, userId, pin1} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="container">
          <div className="img-con">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              className="img"
              alt="website login"
            />
          </div>

          <form onSubmit={this.submitForm} className="form-container">
            <h1>Welcome Back!</h1>
            <label className="input-label" htmlFor="userId">
              User ID
            </label>
            <input
              type="text"
              id="userId"
              className="input-field"
              value={userId}
              onChange={this.onChangeUserId}
              placeholder="Enter User ID"
            />
            <label className="input-label" htmlFor="pin">
              Enter PIN
            </label>
            <input
              type="password"
              id="pin"
              className="input-field"
              placeholder="Enter PIN"
              value={pin1}
              onChange={this.onChangePin}
            />

            <button type="submit" className="login-button">
              Login
            </button>

            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
