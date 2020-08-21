import { useState, useRef, useCallback } from 'react';
import { createContainer } from 'unstated-next';

const INIT_STATE = {
  searchData: {},
  homeData: null
};

function useCounter() {
  const [state, setState] = useState(INIT_STATE);
  const stateRef = useRef();
  const [error, setErrorData] = useState({});
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
  const setHomeData = useCallback(data => {
    merge(state => ({
      ...state,
      homeData: data
    }));
  }, []);

  const setError = useCallback((error, type = 'error', timeout, no_show) => {
    if (type === 'error' && error) console.error('###error###', error);
    if (typeof error === 'string' && /timeout/.test(error))
      error = '网络请求超时，请检查网络是否畅通';
    if (no_show) return error;
    return setErrorData({ error, type, timeout });
  }, []);

  const setSearchData = useCallback(data => {
    return merge(state => ({
      ...state,
      searchData: data
    }));
  }, []);

  return {
    state,
    setMenuLists,
    setError,
    error,
    setSearchData,
    setHomeData
  };
}

export default createContainer(useCounter);
