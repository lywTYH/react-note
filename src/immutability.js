import React from 'react';
import PropTypes from 'prop-types';
import store from './store';

class News extends React.Component {
  static defaultProps = {
    news: []
  };

  static propTypes = {
    news: PropTypes.arrayOf(PropTypes.object)
  };

  constructor(props) {
    super(props);
    this.inputRef = (element) => {
      this.input = element;
    };
  }

  onAddNewsItem = () => {
    store.dispatch({
      type: 'ADD_NEWS_ITEM',
      newsItem: {
        title: this.input.value
      }
    });
  };

  render() {
    const { news } = this.props;
    return (
      <div>
        <input ref={this.inputRef} />
        <button type="button" onClick={this.onAddNewsItem}>
          add
        </button>
        <ul>
          {news.map((item, index) => (
            <li key={`index${index * 2}`}>{item.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default News;
