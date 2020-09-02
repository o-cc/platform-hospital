import React from 'react';
import Slider from 'pages/components/Slider';
import { Grid } from '@material-ui/core';
import BackHeader from '@/pages/components/BackHeader';
import InfoList from './InfoList';

export default props => {
  return (
    <Slider open={props.open}>
      <Grid container>
        <BackHeader withoutHome={true} title="我的信息" back={props.onClose} />
      </Grid>
      <InfoList userInfo={props.userInfo} setUserInfo={props.setUserInfo} />
    </Slider>
  );
};
