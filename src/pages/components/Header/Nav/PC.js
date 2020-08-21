import React, { useState, useEffect } from 'react';
import { makeStyles, styled } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {
  Button,
  Avatar,
  Divider,
  Grid,
  InputBase,
  List,
  ListItem,
  ListItemText,
  IconButton
} from '@material-ui/core';
import { defaultAvatar } from '@/configs';
import useInput from '@/hooks/useInput';
import { vw } from 'utils';
import { Search, ExpandMore } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';

const Arrow = styled(({ down, ...other }) => (
  <ExpandMore {...other} fontSize="inherit" />
))(({ theme, down }) => {
  let angle;
  if (down) {
    angle = 180;
  } else {
    angle = 0;
  }
  return {
    transition: 'transform 0.3s',
    transform: `rotate(${angle}deg)`
  };
});

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    minHeight: theme.spacing(6),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: 'none',
    background: '#fff',
    zIndex: 2,
    border: `1px solid #ccc`,
    minWidth: '1000px'
  },
  central: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    margin: theme.spacing(0, 1),
    color: 'rgba(198,40, 40, 0.9)',
    fontSize: 'bold'
  },
  avatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  nav: {
    paddingLeft: theme.spacing(2)
  },
  subList: {
    position: 'absolute',
    top: '95%',
    left: 0,
    border: '1px solid #ccc',
    background: '#fff',
    minWidth: '110%',
    borderRadius: theme.spacing(0.4),
    zIndex: 10
  },
  input: {
    marginLeft: theme.spacing(2),
    border: '1px solid #ddd',
    background: '#fff',
    color: '#1a1a1a',
    padding: '0 16px',
    textAlign: 'center',
    fontSize: theme.spacing(1.5),
    width: theme.spacing(30),
    paddingRight: theme.spacing(1)
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
  }
}));

function NavInPC({ menuData, ...props }) {
  const classes = useStyles();
  const { value, onChange } = useInput();
  const [down, setDown] = useState([]);
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
            <div className={classes.logo}>logo</div>
            <Divider orientation="vertical" flexItem />
          </Button>
          <Grid container>
            <List className={classes.listRoot}>
              <ListItem button key={'home'}>
                <ListItemText
                  align="center"
                  primary={'首页'}
                  onClick={() => {
                    props.history && props.history.push('/');
                  }}
                />
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
                      <Arrow down={down[idx]} style={{ marginLeft: '10px' }} />
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
            </List>
          </Grid>
          <InputBase
            className={classes.input}
            placeholder="搜索热门文章/作者"
            value={value}
            onChange={onChange}
            inputProps={{ 'aria-label': '搜索热门文章/作者' }}
          />
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
            onClick={e => {
              props.search(e, value);
            }}
          >
            <Search style={{ color: '#888' }} />
          </IconButton>
          <Avatar
            onClick={clickAvatar}
            src={defaultAvatar}
            className={classes.avatar}
          />
        </nav>
      </Paper>
    </>
  );
}

NavInPC.defaultProps = {
  menuData: [],
  search: () => {}
};
export default withRouter(NavInPC);
