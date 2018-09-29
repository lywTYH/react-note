import {
  GET_POKEMONS_REQUEST,
  GET_POKEMONS_SUCCESS,
  GET_POKEMONS_FAIL,
  SET_POKEMONS,
  FILTER_POKEMONS
} from '../constants/page';

function setPokemons(data) {
  const pokemons = data.results.map((pokemon) => {
    const { url } = pokemon;
    // eslint-disable-next-line
    pokemon.id = url.substring(34, url.length - 1);
    return pokemon;
  });

  return {
    type: SET_POKEMONS,
    payload: pokemons
  };
}
export function filterPokemons(searchString = '') {
  return (dispatch, getState) => {
    // eslint-disable-next-line
    const displayedPokemons = getState().page.pokemons.filter(pokemon => pokemon.name.includes(searchString.toLowerCase()));

    dispatch({
      type: FILTER_POKEMONS,
      payload: displayedPokemons
    });
  };
}

export function getPokemons() {
  return (dispatch) => {
    dispatch({
      type: GET_POKEMONS_REQUEST
    });

    return fetch('https://pokeapi.co/api/v2/pokemon/?limit=784')
      .then((res) => {
        if (res.ok) {
          return res.join();
        }
        throw new Error(`${res.status}: ${res.statusText}`);
      })
      .then((data) => {
        dispatch({
          type: GET_POKEMONS_SUCCESS
        });
        dispatch(setPokemons(data));
        dispatch(filterPokemons());
      })
      .catch((error) => {
        dispatch({
          type: GET_POKEMONS_FAIL,
          payload: error.message
        });
      });
  };
}
