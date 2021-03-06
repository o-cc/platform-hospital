import React, { useEffect, useState } from 'react';
import ItemList from 'pages/components/ListItem';
import Slider from 'pages/components/Slider';
import BackHeader from '@/pages/components/BackHeader';
import { requestApi } from '@/utils';
import AppCont from 'container';
import { Typography, Hidden, Divider } from '@material-ui/core';

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
    <Slider open={props.open} pcPage={props.pcPage}>
      <Hidden smUp>
        <BackHeader back={props.onClose} title="历史阅读" withoutHome={true} />
      </Hidden>

      <Hidden xsDown>
        <Typography
          variant="body1"
          color="textSecondary"
          align="left"
          style={{ paddingLeft: 30 }}
        >
          历史阅读
        </Typography>
        <Divider />
      </Hidden>

      <div
        style={{
          width: '100%',
          height: '100%',
          overflowX: 'hidden',
          maxWidth: 1000,
          margin: 'auto'
        }}
      >
        <ItemList list={news} />
        <Typography variant="body2" align="center" color="textSecondary">
          没有更多啦
        </Typography>
      </div>
    </Slider>
  );
};
