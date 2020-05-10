import { useState, useRef, useCallback } from 'react';
import { createContainer } from 'unstated-next';

const INIT_STATE = {
  menuLists: [
    { title: '首页', type: 'home' },
    {
      title: '医学直播',
      type: 'video',
      subTitle: [
        { id: 0, text: '正在直播' },
        { id: 1, text: '会议预告' },
        { id: 2, text: '往期回顾' }
      ]
    },
    {
      title: '医学文献',
      type: 'books',
      subTitle: [
        { id: 0, text: '原创作品' },
        { id: 1, text: '热门文章' },
        { id: 2, text: '分类' }
      ]
    },
    {
      title: '病例征集',
      type: 'case',
      subTitle: [
        { id: 0, text: '经典病例' },
        { id: 1, text: '疑难病例' },
        { id: 2, text: '分类' }
      ]
    },
    { title: '积分商城', type: 'store' }
  ]
};

function useCounter() {
  const [state, setState] = useState(INIT_STATE);
  const stateRef = useRef();
  function merge(cb) {
    setState(state => {
      stateRef.current = cb(state);
      return stateRef.current;
    });
    return stateRef.current;
  }
  const setMenuLists = useCallback(data => {
    merge(state => ({
      ...state,
      menuLists: data
    }));
  }, []);
  return { state, setMenuLists };
}

export default createContainer(useCounter);
