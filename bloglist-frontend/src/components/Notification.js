const Notification = ({ notification }) => {
	return(
		<h2 className={notification.error? 'error' : 'success'}>{notification.message}</h2>
	)
}

export default Notification