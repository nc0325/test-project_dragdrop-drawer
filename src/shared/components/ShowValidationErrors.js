import React from 'react';
import PropTypes from 'prop-types';
import {Alert} from 'antd';

const ShowValidationErrors = ({errors}) => {
  return (
    <>
      {errors &&
        errors.map((error, index) => (
          <Alert
            key={index}
            message={error}
            type='error'
            showIcon
            style={{marginBottom: '10px'}}
          />
        ))}
    </>
  );
};

export default ShowValidationErrors;

ShowValidationErrors.propTypes = {
  errors: PropTypes.array,
};
