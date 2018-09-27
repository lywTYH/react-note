import React from 'react';
import PropTypes from 'prop-types';

function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function BoilingVerdict(props) {
  const { celsius } = props;
  return <p> the water wold {celsius >= 100 ? ' ' : ' not '} boil </p>;
}
BoilingVerdict.propTypes = {
  celsius: PropTypes.number
};
BoilingVerdict.defaultProps = {
  celsius: 0
};

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: ''
    };
  }

  handleOnChange = (e) => {
    this.setState({
      temperature: e.target.value
    });
  };

  render() {
    const { temperature } = this.state;
    const { scale } = this.props;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input type="text" value={temperature} onChange={this.handleOnChange} />
        <BoilingVerdict celsius={parseFloat(temperature)} />
      </fieldset>
    );
  }
}
TemperatureInput.propTypes = {
  scale: PropTypes.string
};
TemperatureInput.defaultProps = {
  scale: 'f'
};

// class Calculator extends React.Component {
//   render() {
//     return (
//       <div>
//         <TemperatureInput />
//         <TemperatureInput />
//       </div>
//     );
//   }
// }

function Calculator() {
  return (
    <div>
      <TemperatureInput scale="c" />
      <TemperatureInput scale="f" />
    </div>
  );
}
export default Calculator;
