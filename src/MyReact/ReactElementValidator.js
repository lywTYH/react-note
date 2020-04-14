/* eslint-disable @typescript-eslint/no-explicit-any */
import { REACT_ELEMENT_TYPE } from 'ReactUtils/ReactSymbols';
import ReactCurrentOwner from './ReactCurrentOwner';
const RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true,
};

const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasValidRef(config) {
  return config.ref !== undefined;
}
function hasValidKey(config) {
  return config.key !== undefined;
}

function ReactElement(type, key, ref, owner, props) {
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type: type,
    key: key,
    ref: ref,
    props: props,
    _owner: owner,
  };
}

export function cloneAndReplaceKey(oldElement, newKey) {
  return ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._owner, oldElement.props);
}

export function createElement(type, config, children) {
  var propName; // Reserved names are extracted

  var props = {};
  var key = null;
  var ref = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }

    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  } // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.

  var childrenLength = arguments.length - 2;

  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);

    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }

    props.children = childArray;
  } // Resolve default props

  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;

    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  return ReactElement(type, key, ref, ReactCurrentOwner.current, props);
}

export function cloneElement(element, config, children) {
  let propName;
  // Original props are copied
  const props = Object.assign({}, element.props);
  let key = element.key;
  let ref = element.ref;
  let owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    } // Remaining properties override existing props

    let defaultProps;

    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }

    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }
  const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    const childArray = Array(childrenLength);
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, owner, props);
}
export function isValidElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
