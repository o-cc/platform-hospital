import React, { useEffect, useState } from 'react';
import Nav from '../components/Header/Nav';
import {
  makeStyles,
  Avatar,
  Divider,
  Grid,
  Typography,
  Button
} from '@material-ui/core';
import PCTemplate from '../components/PCTemplate';
import { defaultAvatar } from '@/configs';
import { ArrowForwardIos, Edit } from '@material-ui/icons';
import container from '@/container';
import { requestApi } from '@/utils';
import Tabs from 'pages/User/Tabs';
import PersonInfo from './components/PersonInfo/InfoList';
import UserList from './components/UserLists/List';
import Address from 'pages/components/Address/PC';
import Modal from 'pages/components/Modal';
import Order from './components/Order';
import History from './components/History';

const useStyled = makeStyles(theme => ({
  root: {
    margin: '30px auto',
    padding: theme.spacing(1, 2),
    '& .header': {
      marginBottom: 16,
      display: 'flex',
      '& .avatar': {
        width: 80,
        height: 80,
        marginRight: 30,
        marginTop: 20
      },
      '& .info': {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        position: 'relative',
        '& .title': {
          fontSize: 21,
          fontWeight: 700
        },
        '& .items': {
          display: 'flex',
          justifyContent: 'flex-start',
          marginTop: 16,
          fontSize: 14,
          color: '#969696',
          '& .item': {
            fontSize: 12,
            cursor: 'pointer',
            marginLeft: 8,
            '& p': {
              margin: `0`,
              fontSize: 15,
              marginBottom: 3,
              color: '#000',
              textAlign: 'center'
            },
            marginRight: 12
          }
        }
      }
    }
  },
  list: {
    fontSize: 14,
    color: '#333',
    lineHeight: 2.8,
    cursor: 'pointer'
  },
  arrow: {
    color: '#888',
    fontSize: 16
  },
  sign: {
    position: 'absolute',
    top: '42%',
    left: '65%'
  }
}));
const MAP = {
  home: Tabs,
  userDetail: PersonInfo,
  userList: UserList,
  order: Order,
  record: History
};
export default props => {
  const classes = useStyled();
  const { userInfo = {}, menuList = [], types, signState, signIn } = props;
  const { setError } = container.useContainer();
  const [authorInfo, setAuthorInfo] = useState({});
  const [currCom, setCurrCom] = useState('home');
  const [modal, setModal] = useState('');
  const [addressModal, setAddressModal] = useState(false);
  useEffect(() => {
    async function getAuthor(userId) {
      let { result, error } = await requestApi('getAuthorInfo', {
        author_id: userId
      });
      if (error) return setError(error);
      setAuthorInfo(result);
    }

    userInfo.user_id && getAuthor(userInfo.user_id);
  }, [userInfo.user_id, setError]);

  const ActiveCom = MAP[currCom];
  return (
    <>
      <Nav />
      <PCTemplate
        renderSide={() => (
          <Grid container>
            <Typography variant="subtitle2" color="textSecondary">
              更多操作
            </Typography>

            {menuList.map(list => (
              <Grid item xs={12} key={list.type}>
                <Grid
                  container
                  justify="space-between"
                  alignItems="center"
                  className={classes.list}
                  onClick={() => {
                    if (list.type === types.address) {
                      setAddressModal(true);
                    }
                    if (list.type === types.order) {
                      setCurrCom('order');
                    }
                    if (list.type === types.record) {
                      setCurrCom('record');
                    }
                  }}
                >
                  <Grid item>
                    <Typography>{list.title}</Typography>
                  </Grid>
                  <Grid item>
                    <ArrowForwardIos className={classes.arrow} />
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        )}
      >
        <div className={classes.root}>
          <div className="header">
            <Avatar src={userInfo.avatar || defaultAvatar} className="avatar" />
            <div className="info">
              <div className="title">
                {userInfo.username}
                <Button
                  variant="text"
                  color="secondary"
                  size="small"
                  style={{ cursor: 'pointer' }}
                  startIcon={<Edit />}
                  onClick={e => {
                    e.stopPropagation();
                    // props.select && props.select(list);
                    setCurrCom('userDetail');
                  }}
                >
                  修改个人资料
                </Button>
              </div>
              <div className="items">
                <div className="item" onClick={() => setCurrCom('home')}>
                  <p>{authorInfo.news_count}</p>文章
                </div>
                <Divider orientation="vertical" flexItem />
                <div
                  className="item"
                  onClick={() => {
                    setCurrCom('userList');
                    setModal(props.types.followers);
                  }}
                >
                  <p>{userInfo.followers}</p>关注{'>'}
                </div>
                <Divider orientation="vertical" flexItem />
                <div
                  className="item"
                  onClick={() => {
                    setCurrCom('userList');
                    setModal(props.types.fans);
                  }}
                >
                  <p>{userInfo.fans}</p>粉丝{'>'}
                </div>
                <Divider orientation="vertical" flexItem />
                <div className="item">
                  <p>{userInfo.integral}</p>积分{'>'}
                </div>
              </div>
              <p style={{ fontSize: 15 }}>{userInfo.intro}</p>
              <div className={classes.sign}>
                <Button
                  disabled={signState}
                  style={{ color: signState ? '#888' : '#f90' }}
                  size="small"
                  variant="outlined"
                  onClick={signIn}
                >
                  {signState ? '已签到' : '签到'}
                </Button>
              </div>
            </div>
          </div>
          <div style={{ minHeight: 400, marginBottom: 32 }}>
            {userInfo.user_id && (
              <ActiveCom
                open={true}
                userId={userInfo.user_id}
                userInfo={userInfo}
                setUserInfo={props.setUserInfo}
                setError={setError}
                type={modal}
                pcPage={true}
              />
            )}
          </div>
        </div>
        <Modal open={addressModal} onClose={() => setAddressModal(false)}>
          <Address />
        </Modal>
      </PCTemplate>
    </>
  );
};
