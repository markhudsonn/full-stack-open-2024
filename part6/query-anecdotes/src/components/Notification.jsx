import { useNotificationValue } from '../notificationContext'

const Notification = () => {
  const notification = useNotificationValue()

  if (notification === null) return null

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    color: notification.toLowerCase().includes('error') ? 'red' : 'green'
  }


  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
