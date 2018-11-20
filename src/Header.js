import React from 'react';
import { connect } from './connect';


function Header(props) {
  return (
    <h1 style={{ color: props.themeColor }}>React.js 小书</h1>
  );
}

const mapStateToProps = (state) => ({
  themeColor: state.themeColor
});
const HeaderView = connect(mapStateToProps)(Header);

export default HeaderView;
