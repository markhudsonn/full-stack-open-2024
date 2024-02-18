const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className={message.includes('Error') ? 'error' : 'success'}>
      {message}
    </div>
  )
}

export default Notification