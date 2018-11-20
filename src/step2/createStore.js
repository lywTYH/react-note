export default function createStore(state, stateChanger) {
  const listeners = [];
  const subscribe = listener => listeners.push(listener);
  const getState = () => state;
  const dispatch = (action) => {
    stateChanger(action);
    listeners.forEach(listener => listener());
  };
  return {
    getState,
    dispatch,
    subscribe
  };
}
