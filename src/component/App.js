import React from 'react';
import ButtonPanel from './ButtonPanel';
import Display from './Display';
import calculate from '../logic/calculate';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line
    this.state = {
      total: null,
      next: null,
      operation: null
    };
  }

  handleClick = (buttonName) => {
    console.log(this.state);
    const newState = calculate(this.state, buttonName);
    console.log(newState);
    this.setState(newState);
  };

  render() {
    const { next, total } = this.state;
    return (
      <div className="component-app">
        <Display value={next || total || '0'} />
        <ButtonPanel clickHandler={this.handleClick} />
      </div>
    );
  }
}

export default App;
