import PropTypes from 'prop-types';
import React from 'react';

function Input({ placeholder, type, value, label, onChange, dataTestID, className }) {
  return (
    <div>
      <label htmlFor={ dataTestID }>
        { label }
        <input
          placeholder={ placeholder }
          type={ type }
          className={ className }
          value={ value }
          onChange={ onChange }
          data-testid={ dataTestID }
        />
      </label>
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  dataTestID: PropTypes.string,
  className: PropTypes.string,
};

Input.defaultProps = {
  label: '',
  placeholder: '',
  type: '',
  value: '',
  onChange: '',
  dataTestID: '',
  className: '',
};

export default Input;
