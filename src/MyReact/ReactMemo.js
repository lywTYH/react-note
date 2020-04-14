import { REACT_MEMO_TYPE } from '../ReactUtils/ReactSymbols';
import isValidElementType from '../ReactUtils/isValidElementType';

// memo 仅仅是给个 REACT_MEMO_TYPE
export default function memo(type, compare) {
  if (!isValidElementType(type)) {
    console.error(
      `memo: The first argument must be a component. Instead received: %s`,
      type === null ? 'null' : typeof type
    );
  }
  const elementType = {
    $$typeof: REACT_MEMO_TYPE,
    type,
    compare: compare === undefined ? null : compare,
  };
  return elementType;
}
