import React, { useState, Fragment } from 'react';
import Slider from 'pages/components/Slider';
import { Grid, makeStyles, Avatar, Divider } from '@material-ui/core';
import BackHeader from '@/pages/components/BackHeader';
import { getObjKey } from '@/utils';
import { format } from 'date-fns';
import EditorModal from './EditorModal';
const useStyles = makeStyles(theme => ({
  root: {
    padding: `${theme.spacing(1)}px ${theme.spacing(1.5)}px`,
    fontSize: 17,
    minHeight: 56,
    position: 'relative'
  },
  arrow: {
    color: '#888',
    fontSize: 16
  },
  input: {
    display: 'none'
  },
  inputWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
}));

const infoList = {
  img: '更换头像',
  name: '更换昵称',
  sex: '更改性别',
  birthday: '更改生日',
  introduce: '编辑个人简介'
};
const info = {
  img: require('assets/imgs/test_avatar.jpg'),
  name: '胖虎张无忌',
  sex: '男',
  birthday: format(new Date(), 'yyyy-MM-dd'),
  introduce: '有的人活着,但他已经死了.有的人已经死了,但他还活着.'
};

export default props => {
  const classes = useStyles();
  const [modal, setModal] = useState({ show: false, type: '' });
  return (
    <Slider open={props.open}>
      <Grid container>
        <BackHeader withoutHome={true} title="我的信息" back={props.onClose} />
      </Grid>
      {getObjKey(infoList).map(item => (
        <Fragment key={item}>
          <Grid
            container
            alignItems="center"
            justify="space-between"
            className={classes.root}
            onClick={() => {
              if (item === 'img') return;
              setModal({
                show: true,
                type: item
              });
            }}
          >
            {item === 'img' && (
              <Grid item xs={12}>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  type="file"
                />
                <label htmlFor="contained-button-file">
                  <div className={classes.inputWrap}></div>
                </label>
              </Grid>
            )}
            <Grid item>{infoList[item]}</Grid>
            <Grid item>
              {item === 'img' ? (
                <Avatar size="small" src={info[item]} />
              ) : item === 'introduce' ? (
                ''
              ) : (
                info[item]
              )}
            </Grid>
          </Grid>
          <Divider />
        </Fragment>
      ))}

      <EditorModal
        info={modal}
        onClose={() => setModal({ show: false })}
        onConfirm={() => setModal({ show: false })}
      />
    </Slider>
  );
};
