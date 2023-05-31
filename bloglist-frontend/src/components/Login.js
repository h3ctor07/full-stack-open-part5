import Notification from './Notification'
import PropTypes from 'prop-types'

const Login = ({ handleLogin, username, setUsername, password, setPassword, notification }) => {
  return (
    <div>
      <h2>log in to application</h2>
      {notification && <Notification notification={notification} />}
      <form onSubmit={handleLogin}>
        <div>
					username
          <input
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
					password
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button>login</button>
      </form>
    </div>
  )
}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default Login