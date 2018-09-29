import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

class Button extends React.Component {
  static defaultProps = {
    name: '',
    orange: false,
    wide: false,
    clickHandler: () => {}
  };

  static propTypes = {
    clickHandler: PropTypes.func,
    name: PropTypes.string,
    orange: PropTypes.bool,
    wide: PropTypes.bool
  };

  handleClick = () => {
    const { clickHandler, name } = this.props;
    clickHandler(name);
  };

  render() {
    const { name, orange, wide } = this.props;
    const className = ['component-button', orange ? 'orange' : '', wide ? 'wide' : ''];
    return (
      <div className={className.join(' ').trim()}>
        <button type="button" onClick={this.handleClick}>
          {name}
        </button>
      </div>
    );
  }
}

export default Button;
