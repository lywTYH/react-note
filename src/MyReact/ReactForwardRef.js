import { REACT_FORWARD_REF_TYPE } from 'ReactUtils/ReactSymbols';

export default function forwardRef(render) {
  const elementType = {
    $$typeof: REACT_FORWARD_REF_TYPE,
    render,
  };
  return elementType;
}
