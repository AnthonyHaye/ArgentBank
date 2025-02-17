import PropTypes from 'prop-types'

const Input = ({
  id,
  label,
  type,
  checked,
  onChange,
  value,
  autoComplete,
  placeholder,
}) => {
  //détermine les classes à appliquer en fonction du type
  const inputClass = type === 'checkbox' ? 'input-remember' : 'input-wrapper'

  return (
    <div className={inputClass}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        checked={type === 'checkbox' ? checked : undefined}
        value={type !== 'checkbox' ? value : undefined}
        onChange={onChange}
        autoComplete={autoComplete}
        placeholder={placeholder}
      />
    </div>
  )
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.string,
  autoComplete: PropTypes.string,
  placeholder: PropTypes.string,
}

export default Input
