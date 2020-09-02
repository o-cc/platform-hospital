import React from 'react';
import Slider from 'pages/components/Slider';
import { Hidden } from '@material-ui/core';
import BackHeader from '@/pages/components/BackHeader';
import List from './List';
export default props => {
  const type = props.type;

  return (
    <Slider open={props.open}>
      <Hidden smUp>
        <BackHeader
          back={props.onClose}
          title={type === 'followers' ? '我的关注' : '我的粉丝'}
        />
      </Hidden>
      <List type={type} userId={props.userId} />
    </Slider>
  );
};
