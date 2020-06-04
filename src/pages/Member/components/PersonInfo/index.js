import React, { useState, Fragment } from 'react';
import Slider from 'pages/components/Slider';
import { Grid, makeStyles, Avatar, Divider } from '@material-ui/core';
import BackHeader from '@/pages/components/BackHeader';
import { getObjKey, requestApi } from '@/utils';
import { format } from 'date-fns';
import EditorModal from './EditorModal';
import Area from 'pages/components/Area';
import AppCont from 'container';
import { storageKeys } from 'configs';
import useRunning from 'hooks/useRunning';
import ImagePicker from 'tools/ImagePicker';
import ForgotPwd from "pages/Login/Child/forgot";

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
  avatar: '更换头像',
  username: '更换昵称',
  sex: '修改性别',
  area: '更改区域',
  addr: '详细地址',
  pwd: '修改密码',
  intro: '编辑个人简介'
};
const info = {
  avatar: require('assets/imgs/test_avatar.jpg'),
  username: '',
  birthday: format(new Date(), 'yyyy-MM-dd'),
  intro: '有的人活着,但他已经死了.有的人已经死了,但他还活着.',
  addr: '',
  area: '',
  pwd: '',
  sex: ''
};

export default props => {
  const classes = useStyles();
  const [modal, setModal] = useState({ show: false, type: '' });
  const [resetPwd, setResetPwd] = useState(false);
  const userInfo = props.userInfo || {};
  const [area, setArea] = useState(false);
  const { setError } = AppCont.useContainer();

  const updateUserInfo = async data => {
    let { result, error } = requestApi('putUserInfo', data);
    if (error) return setError(error);
    setError('操作成功.', 'success');
    if (result.token)
      window.localStorage.setItem(storageKeys.token, result.token);
    return result;
  };

  const handleOk = useRunning(async picks => {
    await updateUserInfo({ area: picks.join(' ') });
  });
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
              if (item === 'avatar') return;
              if (item === 'area') return setArea(true);
              if (item === "pwd") return setResetPwd(true);
              setModal({
                show: true,
                type: item
              });
            }}
          >
            {item === 'avatar' && (
              <Grid item xs={12}>
                <ImagePicker
                  className={classes.input}
                  id="contained-button-file"
                  onPick={(canvas, data) => {
                    canvas.toBlob(bin => {
                      //upload
                      console.log('upload');
                    });
                  }}
                />
                <label htmlFor="contained-button-file">
                  <div className={classes.inputWrap}></div>
                </label>
              </Grid>
            )}
            <Grid item>{infoList[item]}</Grid>
            <Grid item>
              {item === 'avatar' ? (
                <Avatar size="small" src={userInfo[item]} />
              ) : item === 'intro' ? (
                ''
              ) : (
                userInfo[item] || info[item]
              )}
            </Grid>
          </Grid>
          <Divider />
        </Fragment>
      ))}

      <EditorModal
        userInfo={userInfo}
        info={modal}
        onClose={() => setModal({ show: false })}
        onConfirm={() => setModal({ show: false })}
      />
      <Area open={area} onClose={() => setArea(false)} onHandleOk={handleOk} />
      <Slider open={resetPwd}>
        <ForgotPwd onClose={() => setResetPwd(false)} />
      </Slider>
    </Slider>
  );
};
