import React from 'react';
import classnames from 'classnames';
import propTypes from 'prop-types';

const TextFieldGroup =  ({
    name,
    placeholder,
    value,
    label,
    errror,
    info,
    type,
    onChange,
    disabled
}) => {
  return (
      <div className="form-group">
          <input type={type} className={classnames('form-control form-control-lg', {
              'is-invalid': error
          })} 
          placeholder={placeholder} 
          name={name} 
          value={value} 
          disabled={disabled} 
          onChange={onChange} />
          {info && <small className='form-text text-muted'>{info}</small>}
          {error && (<div className="invalid-feedback">{error}</div>)}
      </div>
  )
}

TextFieldGroup.propTypes = {
    name: PropType.string.isRequired,
    placeholder: PropType.string.isRequired,
    value: PropType.string.isRequired,
    label: PropType.string,
    errror: PropType.string,
    info: PropType.string.isRequired,
    type: PropType.string.isRequired,
    onChange: PropType.func.isRequired,
    disabled: PropType.string
}

TextFieldGroup.defaultProps = {
    type: 'text'
}

export default TextFieldGroup;