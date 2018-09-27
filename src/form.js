import React from 'react';

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };
  }

  handleInputChange = (event) => {
    const target = event.target;
    const {
      name, type, checked, value
    } = target;
    this.setState({
      [name]: type === 'checkbox' ? checked : value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    const { isGoing, numberOfGuests } = this.state;
    return (
      <form>
        <label htmlFor="isGoing">
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={isGoing}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label htmlFor="numberOfGuests">
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={numberOfGuests}
            onChange={this.handleInputChange}
          />
        </label>
      </form>
    );
  }
}

export default NameForm;
