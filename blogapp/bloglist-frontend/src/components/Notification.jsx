import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  if (!notification) {
    return null
  }

  const { message, tone } = notification
  const tone_style = `notification ${tone}`

  return <div className={tone_style}>{message}</div>
}

Notification.propTypes = {
  notification: PropTypes.object,
}

export default Notification
