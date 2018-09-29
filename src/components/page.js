import React from 'react';
import PropTypes from 'prop-types';
import Pokemon from './pokemon';
import Search from './search';

class Page extends React.Component {
  static propTypes = {
    getPokemons: PropTypes.func,
    filterPokemons: PropTypes.func,
    displayedPokemons: PropTypes.arrayOf(Object),
    isFetched: PropTypes.bool,
    error: PropTypes.string
  };

  static defaultProps = {
    getPokemons: () => {},
    filterPokemons: () => {},
    displayedPokemons: [],
    isFetched: false,
    error: ''
  };

  componentDidMount() {
    this.props.getPokemons();
  }

  handleSearch = (event) => {
    this.props.filterPokemons(event.currentTarget.value);
  };

  render() {
    const { displayedPokemons, isFetched, error } = this.props;
    const pokemons = displayedPokemons.map(pokemon => (
      <li className="pokemons__item" key={pokemon.id}>
        <Pokemon pokemon={pokemon} />
      </li>
    ));
    return (
      <div className="page">
        {error && <div className="page__error">{error}</div>}
        <div className="page__search">
          <Search onChange={this.handleSearch} />
        </div>
        {isFetched ? <p>Loading...</p> : <ul className="pokemons">{pokemons}</ul>}
      </div>
    );
  }
}

export default Page;
