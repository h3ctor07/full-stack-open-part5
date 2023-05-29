import Notification from "./Notification";

const Login = ({ handleLogin, username, setUsername, password, setPassword, notification}) => {
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

export default Login;