import React from 'react';
import PropTypes from 'prop-types';

export default function Square(props) {
  const { onClick, value } = props;
  return (
    <button type="button" className="square" onClick={onClick}>
      {value}
    </button>
  );
}
Square.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string
};
Square.defaultProps = {
  onClick: () => {},
  value: ''
};
