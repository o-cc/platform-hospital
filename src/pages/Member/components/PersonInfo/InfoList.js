import React, { Fragment, useState } from 'react';
import {
  Grid,
  Avatar,
  Divider,
  makeStyles,
  Typography,
  Hidden
} from '@material-ui/core';
import ImagePicker from 'tools/ImagePicker';
import ForgotPwd from 'pages/Login/Child/forgot';
import { info, infoList } from './helper';
import { getObjKey, requestApi } from '@/utils';
import EditorModal from './EditorModal';
import Area from 'pages/components/Area';
import useRunning from '@/hooks/useRunning';
import { storageKeys } from '@/configs';
import AppCont from 'container';
import Modal from 'pages/components/Modal';
import Slider from 'pages/components/Slider';
const useStyles = makeStyles(theme => ({
  root: {
    padding: `${theme.spacing(1)}px ${theme.spacing(1.5)}px`,
    fontSize: 17,
    minHeight: 56,
    position: 'relative',
    cursor: 'pointer'
  },
  arrow: {
    color: '#888',
    fontSize: 16
  },
  input: {
    opacity: '0'
  },
  inputWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  resetPwd: {
    width: 660,
    padding: theme.spacing(3, 8),
    background: '#fff',
    borderRadius: 4
  }
}));
export default props => {
  const classes = useStyles();
  const [modal, setModal] = useState({ show: false, type: '' });
  const [resetPwd, setResetPwd] = useState(false);
  const userInfo = props.userInfo || {};
  const [area, setArea] = useState(false);
  const { setError } = AppCont.useContainer();

  const updateUserInfo = async data => {
    let { result, error } = await requestApi('putUserInfo', data);
    if (error) return setError(error);
    setError('操作成功.', 'success');
    if (result.token)
      window.localStorage.setItem(storageKeys.token, result.token);
    props.setUserInfo(result);
    setModal({ show: false, type: '' });

    return result;
  };

  const handleOk = useRunning(async picks => {
    await updateUserInfo({ area: picks.join(' ') });
    setArea(false);
  });

  const imgPick = async (canvas, data, file) => {
    let f = new FormData();
    f.append('file', file);
    let { result, error } = await requestApi('postImg', { blob: f });
    if (error) return setError(error);
    await updateUserInfo({ avatar_name: result.image_name });
  };

  return (
    <>
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
              if (item === 'pwd') {
                return setResetPwd(true);
              }
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
                  onPick={imgPick}
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
        updateUserInfo={updateUserInfo}
        onClose={() => setModal({ show: false })}
        onConfirm={() => setModal({ show: false })}
      />
      <Area open={area} onClose={() => setArea(false)} onHandleOk={handleOk} />
      <Hidden smUp>
        <Slider open={resetPwd}>
          <ForgotPwd onClose={() => setResetPwd(false)} />
        </Slider>
      </Hidden>
      <Hidden xsDown>
        <Modal open={resetPwd} onClose={() => setResetPwd(false)}>
          <div className={classes.resetPwd}>
            <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
              密码修改
            </Typography>
            <ForgotPwd onClose={() => setResetPwd(false)} />
          </div>
        </Modal>
      </Hidden>
    </>
  );
};
