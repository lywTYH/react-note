const didWarnStateUpdateForUnmountedComponent = {};
function warnNoop(publicInstance, callerName) {
  const _constructor = publicInstance.constructor;
  const componentName =
    (_constructor && (_constructor.displayName || _constructor.name)) || 'ReactClass';
  const warningKey = componentName + '.' + callerName;

  if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
    return;
  }

  console.error(
    "Can't call %s on a component that is not yet mounted. " +
      'This is a no-op, but it might indicate a bug in your application. ' +
      'Instead, assign to `this.state` directly or define a `state = {};` ' +
      'class property with the desired state in the %s component.',
    callerName,
    componentName
  );
  didWarnStateUpdateForUnmountedComponent[warningKey] = true;
}
const ReactNoopUpdateQueue = {
  isMounted: function(publicInstance) {
    return false;
  },
  enqueueForceUpdate: function(publicInstance) {
    warnNoop(publicInstance, 'forceUpdate');
  },
  enqueueReplaceState: function(publicInstance) {
    warnNoop(publicInstance, 'replaceState');
  },
  enqueueSetState: function(publicInstance) {
    warnNoop(publicInstance, 'setState');
  },
};
export default ReactNoopUpdateQueue;
