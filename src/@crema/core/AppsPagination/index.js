import React from 'react';
import {Pagination} from 'antd';
import PropTypes from 'prop-types';

const AppsPagination = ({count, page, onChange, pageSize, className}) => {
  return (
    <Pagination
      defaultCurrent={1}
      hideOnSinglePage={true}
      component='div'
      total={count}
      pageSize={pageSize}
      className={className}
      current={page}
      backIconButtonProps={{'aria-label': 'Previous Page'}}
      nextIconButtonProps={{'aria-label': 'Next Page'}}
      onChange={onChange}
      rowsPerPageOptions={[]}
      showSizeChanger={false}
    />
  );
};

export default AppsPagination;

AppsPagination.defaultProps = {
  className: '',
  pageSize: 20,
};

AppsPagination.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.any.isRequired,
  onChange: PropTypes.func,
  className: PropTypes.string,
  pageSize: PropTypes.number,
};
