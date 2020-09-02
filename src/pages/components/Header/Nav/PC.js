import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {
  Button,
  Avatar,
  Divider,
  Grid,
  InputBase,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import { defaultAvatar, storageKeys } from '@/configs';
import useInput from '@/hooks/useInput';
import { vw } from 'utils';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    minHeight: theme.spacing(6),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: 'none',
    background: '#fff',
    zIndex: 2
  },
  central: {
    ninWidth: '1000px',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  avatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    cursor: 'pointer',
    position: 'relative'
  },
  nav: {
    paddingLeft: theme.spacing(2)
  },
  subList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    borderColor: 'transparent',
    boxShadow: '0 2px 8px rgba(0,0,0,.1)',
    filter: `drop-shadow(0 2px 8px rgba(0,0,0,.1))`,
    background: '#fff',
    minWidth: '110%',
    borderRadius: theme.spacing(0, 0.5),
    zIndex: 10,
    fontWeight: 400,
    color: '#333',
    whiteSpace: 'nowrap',
    '& .MuiTypography-body1': {
      fontSize: 14
    }
  },
  input: {
    marginLeft: theme.spacing(2),
    border: '1px solid #ddd',
    background: '#fff',
    color: '#1a1a1a',
    padding: '2px 16px',
    textAlign: 'center',
    fontSize: theme.spacing(1.5),
    width: theme.spacing(30),
    paddingRight: theme.spacing(1),
    borderRadius: 4
  },
  iconButton: {
    padding: 10,
    fontSize: vw(18),
    color: 'white'
  },
  listRoot: {
    display: 'flex',
    whiteSpace: 'nowrap',
    padding: theme.spacing(0.5, 0)
  },
  navHolder: {
    height: 62
  },
  logo: {
    width: 100,
    height: 48,
    background: `url(${require('assets/imgs/logo.png')}) no-repeat center/100%`
  }
}));

function NavInPC({ menuData, ...props }) {
  const classes = useStyles();
  const { value, onChange } = useInput();
  const [down, setDown] = useState([]);
  const [member, setMember] = useState('');
  const token = window.localStorage.getItem(storageKeys.token);

  useEffect(() => {
    setDown(menuData.map(item => false));
  }, [menuData]);

  const toOther = idx => {
    setTimeout(() => {
      props.history && props.history.push('/other/' + idx);
    }, 10);
  };

  const clickAvatar = () => {
    props.history.push('/member');
  };
  return (
    <>
      <Paper elevation={2} className={classes.root}>
        <nav className={classes.central}>
          <Button aria-label="menu">
            <div className={classes.logo}></div>
            {/* <Divider orientation="vertical" flexItem /> */}
          </Button>
          <Grid container style={{ flex: 1 }}>
            <List className={classes.listRoot}>
              <ListItem
                button
                key={'home'}
                onClick={() => {
                  props.history && props.history.push('/');
                }}
              >
                <ListItemText align="center" primary={'首页'} />
              </ListItem>
              {menuData.map((item, idx) => (
                <ListItem
                  button
                  style={{ position: 'relative' }}
                  key={item.id}
                  onMouseOut={() => {
                    setDown(down => {
                      return down.map((tf, i) => {
                        if (i === idx) return false;
                        return tf;
                      });
                    });
                  }}
                  onMouseOver={() => {
                    setDown(down => {
                      return down.map((tf, i) => {
                        if (i === idx) return !tf;
                        return tf;
                      });
                    });
                  }}
                  onClick={() => {
                    //如果有下一级就不跳转
                    if (item.sub_categories.length > 0) return;
                    toOther(item.id);
                  }}
                >
                  <ListItemText align="center" primary={item.name} />
                  {item.sub_categories && item.sub_categories.length > 0 && (
                    <>
                      {/* <Arrow down={down[idx]} style={{ marginLeft: '10px' }} /> */}
                      <List
                        className={classes.subList}
                        style={{ display: !down[idx] ? 'none' : undefined }}
                      >
                        {item.sub_categories && item.sub_categories.length > 0 && (
                          <>
                            {item.sub_categories.map(subItem => (
                              <ListItem
                                button
                                key={subItem.sub_id}
                                onClick={() => {
                                  toOther(subItem.sub_id);
                                }}
                              >
                                <ListItemText primary={subItem.name} />
                              </ListItem>
                            ))}
                          </>
                        )}
                      </List>
                    </>
                  )}
                </ListItem>
              ))}
              <ListItem
                button
                key={'store'}
                onClick={() => {
                  props.history && props.history.push('/store');
                }}
              >
                <ListItemText align="center" primary={'积分商城'} />
              </ListItem>
            </List>
          </Grid>
          <InputBase
            className={classes.input}
            placeholder="搜索热门文章/作者"
            value={value}
            onChange={onChange}
            inputProps={{ 'aria-label': '搜索热门文章/作者' }}
          />
          <Button
            variant="contained"
            size="small"
            color="primary"
            style={{ marginLeft: 8 }}
            onClick={e => {
              props.search(e, value);
            }}
          >
            搜索
          </Button>
          {token ? (
            <div
              style={{ position: 'relative' }}
              onMouseOut={() => setMember(false)}
              onMouseOver={() => setMember(true)}
            >
              <Avatar src={defaultAvatar} className={classes.avatar}></Avatar>
              <List
                className={classes.subList}
                style={{
                  display: !member ? 'none' : undefined,
                  left: 15,
                  padding: '8px 16px'
                }}
              >
                <ListItem button onClick={clickAvatar}>
                  <ListItemText primary={'个人中心'} />
                </ListItem>
                <ListItem
                  button
                  onClick={() => {
                    if (token)
                      window.localStorage.setItem(storageKeys.token, '');
                    // props.history.push('/login');
                  }}
                >
                  <ListItemText primary={'退出'} />
                </ListItem>
              </List>
            </div>
          ) : (
            <Button
              style={{ marginLeft: 16, whiteSpace: 'nowrap' }}
              onClick={() => props.history.push('/login')}
            >
              登录/注册
            </Button>
          )}
        </nav>
        <Divider />
      </Paper>
      {/* <div className={classes.navHolder}></div> */}
    </>
  );
}

NavInPC.defaultProps = {
  menuData: [],
  search: () => {}
};
export default withRouter(NavInPC);
