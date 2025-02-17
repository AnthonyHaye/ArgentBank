import PropTypes from 'prop-types'

const FeatureItem = ({ icon, title, desc }) => {
  return (
    <div className="feature-item">
      <img src={icon} alt={title} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{desc}</p>
    </div>
  )
}

FeatureItem.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
}

export default FeatureItem
