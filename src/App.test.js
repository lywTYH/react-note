import React from 'react';
import ReactDOM from 'react-dom';
import Comment from './App';

const comment = {
  date: new Date(),
  text: 'I hope you enjoy learning React!',
  author: {
    name: 'Hello Kitty',
    avatarUrl: 'http://placekitten.com/g/64/64'
  }
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Comment date={comment.date} text={comment.text} author={comment.author} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
