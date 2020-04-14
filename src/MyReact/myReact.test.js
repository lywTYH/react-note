import forwardRef from './ReactForwardRef';
import { REACT_FORWARD_REF_TYPE } from 'ReactUtils/ReactSymbols';

it('forwardRef', () => {
  const ref = forwardRef(() => {});
  expect(ref.$$typeof).toStrictEqual(REACT_FORWARD_REF_TYPE);
});
