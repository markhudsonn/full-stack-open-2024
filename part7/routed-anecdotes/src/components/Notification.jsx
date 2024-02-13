
const Notification = ({ message }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    color: 'green'
  }
  return message ? <div style={style}>{message}</div> : null
}

export default Notification


