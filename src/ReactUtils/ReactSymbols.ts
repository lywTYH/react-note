const symbolFor = Symbol.for;

export const REACT_ELEMENT_TYPE = symbolFor('react.element');
export const REACT_PORTAL_TYPE = symbolFor('react.portal');
export const REACT_FRAGMENT_TYPE = symbolFor('react.fragment');
export const REACT_STRICT_MODE_TYPE = symbolFor('react.strict_mode');
export const REACT_PROFILER_TYPE = symbolFor('react.profiler');
export const REACT_PROVIDER_TYPE = symbolFor('react.provider');
export const REACT_CONTEXT_TYPE = symbolFor('react.context');
export const REACT_FORWARD_REF_TYPE = symbolFor('react.forward_ref');
export const REACT_SUSPENSE_TYPE = symbolFor('react.suspense');
export const REACT_SUSPENSE_LIST_TYPE = symbolFor('react.suspense_list');
export const REACT_MEMO_TYPE = symbolFor('react.memo');
export const REACT_LAZY_TYPE = symbolFor('react.lazy');
export const REACT_BLOCK_TYPE = symbolFor('react.block');
export const REACT_SERVER_BLOCK_TYPE = symbolFor('react.server.block');
export const REACT_FUNDAMENTAL_TYPE = symbolFor('react.fundamental');
export const REACT_RESPONDER_TYPE = symbolFor('react.responder');
export const REACT_SCOPE_TYPE = symbolFor('react.scope');
export const REACT_OPAQUE_ID_TYPE = symbolFor('react.opaque.id');
const MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
const FAUX_ITERATOR_SYMBOL = '@@iterator';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getIteratorFn(maybeIterable: any) {
  if (maybeIterable === null || typeof maybeIterable !== 'object') {
    return null;
  }
  const maybeIterator =
    (MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL]) ||
    maybeIterable[FAUX_ITERATOR_SYMBOL];
  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }
  return null;
}
