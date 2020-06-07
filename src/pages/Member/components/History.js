import React, { useEffect, useState } from 'react';
import ItemList from 'pages/components/ListItem';
import Slider from 'pages/components/Slider';
import BackHeader from '@/pages/components/BackHeader';
import { requestApi } from '@/utils';
import AppCont from 'container';

export default props => {
  const { setError } = AppCont.useContainer();
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function getHistories() {
      let { result, error } = await requestApi('getHistories');
      if (error) return setError(error);
      setNews(result);
    }

    if (props.open) {
      getHistories();
    }
  }, [setError, props.open]);

  return (
    <Slider open={props.open}>
      <BackHeader back={props.onClose} title="历史阅读" withoutHome={true} />

      <ItemList list={news} />
    </Slider>
  );
};
