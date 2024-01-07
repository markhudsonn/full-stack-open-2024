const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    if (message.includes('Error:')) {
      return (
        <div className='error-notification'>
          {message}
        </div>
      )
    }

    return (
      <div className='success-notification'>
        {message}
      </div>
    )
    }

export default Notification