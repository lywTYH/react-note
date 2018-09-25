import React from 'react';
import PropTypes from 'prop-types';

function formatDate(date) {
  return date.toLocaleDateString();
}
function Avatar(props) {
  // eslint-disable-next-line
  const { user } = props;
  return <img className="Avatar" src={user.avatarUrl} alt={user.name} />;
}

Avatar.defaultProps = {
  user: {}
};

function Comment(props) {
  const { author, text, date } = props;
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={author} />
        <div className="UserInfo-name">{author.name}</div>
      </div>
      <div className="Comment-text">{text}</div>
      <div className="Comment-date">{formatDate(date)}</div>
    </div>
  );
}

Comment.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string,
    avatarUrl: PropTypes.string
  }),
  text: PropTypes.string,
  date: PropTypes.instanceOf(Date)
};

Comment.defaultProps = {
  author: {},
  text: '',
  date: new Date()
};

export default Comment;
