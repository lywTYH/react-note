// 优化渲染  共享结构的对象提高性能
import createStore from './createStore';

function renderTitle(newTitle, oldTitle = {}) {
  if (newTitle === oldTitle) return;
  const titleDOM = document.getElementById('title');
  titleDOM.innerHTML = newTitle.text;
  titleDOM.style.color = newTitle.color;
}

function renderContent(newContent, oldContent) {
  if (newContent === oldContent) return;
  const contentDOM = document.getElementById('content');
  contentDOM.innerHTML = newContent.text;
  contentDOM.style.color = newContent.color;
}
function renderApp(newappState, oldappState) {
  if (newappState === oldappState) return;
  renderTitle(newappState.title);
  renderContent(newappState.content);
}


function stateChanger(state, action) {
  if (!state) {
    return {
      title: {
        text: 'React.js 小书',
        color: 'red'
      },
      content: {
        text: 'React.js 小书内容',
        color: 'blue'
      }
    };
  }
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      return { // 构建新的对象并且返回
        ...state,
        title: {
          ...state.title,
          text: action.text
        }
      };
    case 'UPDATE_TITLE_COLOR':
      return { // 构建新的对象并且返回
        ...state,
        title: {
          ...state.title,
          color: action.color
        }
      };
    default:
      return state; // 没有修
  }
}

const store = createStore(stateChanger);
let old = store.getState();
store.subscribe(() => {
  const newstore = store.getState();
  renderApp(newstore, old);
  old = newstore;
});
renderApp(store.getState());
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }); // 修改标题文本
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }); // 修改标题颜色
