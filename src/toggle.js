import React from 'react';
import ProtoTypes from 'prop-types';

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true
    };
  }

  handleClick = () => {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  };

  render() {
    const { isToggleOn } = this.state;
    return (
      <button type="button" onClick={this.handleClick}>
        {isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
export default Toggle;
