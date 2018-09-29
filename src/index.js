import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Page from './containers/page';
import configureStore from './redux/store/configure-store';
import './style/main.css';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Page />
  </Provider>,
  document.getElementById('root')
);
