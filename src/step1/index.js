const appState = {
  title: {
    text: 'React.js 小书',
    color: 'red'
  },
  content: {
    text: 'React.js 小书内容',
    color: 'blue'
  }
};


function renderTitle(title) {
  const titleDOM = document.getElementById('title');
  titleDOM.innerHTML = title.text;
  titleDOM.style.color = title.color;
}

function renderContent(content) {
  const contentDOM = document.getElementById('content');
  contentDOM.innerHTML = content.text;
  contentDOM.style.color = content.color;
}
function renderApp(appState) {
  renderTitle(appState.title);
  renderContent(appState.content);
}

renderApp(appState);

function dispatch(action) {
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      appState.title.text = action.text;
      break;
    case 'UPDATE_TITLE_COLOR':
      appState.title.color = action.color;
      break;
    default:
      break;
  }
}
dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }); // 修改标题文本
dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }); // 修改标题颜色
renderApp(appState); // 把新的数据渲染到页面上


// 问题 目前所有数据都是共享，所有对共享状态的操作都是不可预料的，但同时我们需要共享数据
// 解决 把事情搞复杂一些，提高数据修改的门槛 即所有数据通过 dispatch 进行修改
