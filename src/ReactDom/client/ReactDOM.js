import './ReactDOMClientInjection';
import { findDOMNode, render, hydrate, unmountComponentAtNode } from './ReactDOMLegacy';
import { createRoot, createBlockingRoot } from './ReactDOMRoot';

import {
  batchedEventUpdates,
  batchedUpdates,
  discreteUpdates,
  flushDiscreteUpdates,
  flushSync,
  attemptSynchronousHydration,
  attemptUserBlockingHydration,
  attemptContinuousHydration,
  attemptHydrationAtCurrentPriority,
} from 'react-reconciler/src/ReactFiberReconciler';
import { createPortal as createPortalImpl } from 'react-reconciler/src/ReactPortal';
import { restoreControlledState } from './ReactDOMComponent';
import {
  setAttemptSynchronousHydration,
  setAttemptUserBlockingHydration,
  setAttemptContinuousHydration,
  setAttemptHydrationAtCurrentPriority,
} from '../events/ReactDOMEventReplaying';
import { setBatchingImplementation } from '../events/ReactDOMUpdateBatching';
import { setRestoreImplementation } from '../events/ReactDOMControlledComponent';

setAttemptSynchronousHydration(attemptSynchronousHydration);
setAttemptUserBlockingHydration(attemptUserBlockingHydration);
setAttemptContinuousHydration(attemptContinuousHydration);
setAttemptHydrationAtCurrentPriority(attemptHydrationAtCurrentPriority);

setRestoreImplementation(restoreControlledState);
setBatchingImplementation(
  batchedUpdates,
  discreteUpdates,
  flushDiscreteUpdates,
  batchedEventUpdates
);

function createPortal(children, container, key) {
  return createPortalImpl(children, container, null, key);
}

export {
  createPortal,
  flushSync,
  findDOMNode,
  hydrate,
  render,
  unmountComponentAtNode,
  createRoot,
  createBlockingRoot,
};
