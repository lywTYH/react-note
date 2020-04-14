import ReactCurrentDispatcher from './ReactCurrentDispatcher';

function resolveDispatcher() {
  const dispatcher = ReactCurrentDispatcher.current;
  return dispatcher;
}

export function useRef(initialValue) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useRef(initialValue);
}

export function useContext(Context, unstable_observedBits) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useContext(Context, unstable_observedBits);
}

export function useState(initialState) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}

export function useReducer(reducer, initialArg, init) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useReducer(reducer, initialArg, init);
}

export function useEffect(create, deps) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useEffect(create, deps);
}

export function useLayoutEffect(create, deps) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useLayoutEffect(create, deps);
}

export function useCallback(callback, deps) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useCallback(callback, deps);
}

export function useMemo(create, deps) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useMemo(create, deps);
}

export function useImperativeHandle(ref, create, deps) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useImperativeHandle(ref, create, deps);
}

export function useDebugValue(value, formatterFn) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useDebugValue(value, formatterFn);
}

export const emptyObject = {};

export function useResponder(responder, listenerProps) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useResponder(responder, listenerProps || emptyObject);
}

export function useTransition(config) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useTransition(config);
}

export function useDeferredValue(value, config) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useDeferredValue(value, config);
}

export function useOpaqueIdentifier() {
  const dispatcher = resolveDispatcher();
  return dispatcher.useOpaqueIdentifier();
}

export function useMutableSource(source, getSnapshot, subscribe) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useMutableSource(source, getSnapshot, subscribe);
}
