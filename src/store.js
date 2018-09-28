function news(state = [], action) {
  switch (action.type) {
    case 'ADD_NEWS_ITEM': {
      return [...state, action.newsItem];
    }
    default: {
      return state;
    }
  }
}

function createStore(reducer) {
  let state;
  let listeners = [];
  function subscribe(listener) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(cb => cb !== listener);
    };
  }
  function getState() {
    return state;
  }
  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach(cb => cb());
  }
  // init store
  dispatch({});

  return {
    subscribe,
    getState,
    dispatch
  };
}
export default createStore(news);
