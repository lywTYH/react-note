import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Pokemon extends PureComponent {
  static defaultProps = {
    pokemon: {}
  };

  static propTypes = {
    pokemon: PropTypes.objectOf(Object)
  };

  render() {
    const { pokemon } = this.props;
    return (
      <div className="pokemon">
        <button
          type="button"
          className="pokemon__sprite"
          style={{
            backgroundImage: `url(${`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              pokemon.id
            }.png`})`
          }}
        />
        <p className="pokemon__name">{pokemon.name}</p>
      </div>
    );
  }
}

export default Pokemon;
