import Children from './ReactChildren';
import memo from './ReactMemo';
import { Component, PureComponent } from './ReactBaseClasses';
import {
  REACT_FRAGMENT_TYPE,
  REACT_PROFILER_TYPE,
  REACT_STRICT_MODE_TYPE,
} from '../ReactUtils/ReactSymbols';
import createRef from './ReactCreateRef';
import forwardRef from './ReactForwardRef';
import { createElement, cloneElement, isValidElement } from './ReactElementValidator';
import lazy from './ReactLazy';
import createContext from './ReactContext';
import {
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useDebugValue,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from './ReactHooks';

const React = {
  Children,
  Component,
  PureComponent,
  Fragment: REACT_FRAGMENT_TYPE,
  Profiler: REACT_PROFILER_TYPE,
  StrictMode: REACT_STRICT_MODE_TYPE,
  createRef,
  forwardRef,
  cloneElement,
  createElement,
  isValidElement,
  lazy,
  createContext,
  memo,
  useCallback,
  useContext,
  useDebugValue,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
};

export default React;
