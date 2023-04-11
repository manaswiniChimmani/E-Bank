import Cookies from 'js-cookie'

import './index.css'

const Home = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/ebank/login')
  }

  return (
    <div className="home-container">
      <div className="nav">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
          className="logo"
        />

        <button type="button" className="btn" onClick={onClickLogout}>
          Logout
        </button>
      </div>
      <div className="card-container">
        <h1 className="h1">Your Flexibility, Our Excellence</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          className="card-img"
          alt="digital card"
        />
      </div>
    </div>
  )
}

export default Home
