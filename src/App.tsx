import React from 'react';

class Test extends React.Component<{}, { a: number }> {
  state = {
    a: 1,
  };
  onClick = () => {
    this.setState(preState => {
      return {
        a: preState.a + 1,
      };
    });
  };
  render() {
    return (
      <React.Fragment>
        <div>
          this is a test demo {this.state.a} <button onClick={this.onClick}>asf</button>
        </div>
      </React.Fragment>
    );
  }
}
console.log(Test);

const App = () => {
  return (
    <React.Fragment>
      <div>this is a test demo</div>
    </React.Fragment>
  );
};
export default App;
