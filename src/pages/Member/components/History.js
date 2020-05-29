import React from 'react';
import { homeTestData } from '@/pages/Home/helper';
import ItemList from 'pages/components/ListItem';
import Slider from 'pages/components/Slider';
import BackHeader from '@/pages/components/BackHeader';
export default props => {
  return (
    <Slider open={props.open}>
      <BackHeader back={props.onClose} title="历史阅读" withoutHome={true} />
      {homeTestData.map((item, idx) => (
        <ItemList
          key={idx}
        list={item.list}
        onClick={idx => {
          if (item.type === 'video') {
            props.history && props.history.push('/video/detail/' + idx);
          }
        }}
      />
      ))}
    </Slider>
  );
};
