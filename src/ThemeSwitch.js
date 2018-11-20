import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from './connect';

class ThemeSwitch extends Component {
  static propTypes = {
    themeColor: PropTypes.string,
    onSwitchColor: PropTypes.func
  }

  handleSwitchColor(color) {
    if (this.props.onSwitchColor) {
      this.props.onSwitchColor(color);
    }
  }


  render() {
    return (
      <div>
        <div>
          <button style={{ color: this.props.themeColor }} onClick={this.handleSwitchColor.bind(this, 'red')}>Red</button>
          <button style={{ color: this.props.themeColor }} onClick={this.handleSwitchColor.bind(this, 'blue')}>Blue</button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  themeColor: state.themeColor
});

const mapDispatchToProps = (dispatch) => ({
  onSwitchColor: (color) => {
    dispatch({ type: 'CHANGE_COLOR', themeColor: color });
  }
});
const ThemeSwitchView = connect(mapStateToProps, mapDispatchToProps)(ThemeSwitch);

export default ThemeSwitchView;
