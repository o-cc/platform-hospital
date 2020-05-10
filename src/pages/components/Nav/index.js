import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { vw } from 'utils';
const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0
  },
  input: {
    marginLeft: theme.spacing(2),
    flex: 1,
    border: '1px solid #ebebeb',
    background: 'hsla(0,0%,92.2%,.72)',
    color: '#1a1a1a',
    borderRadius: '16px',
    padding: '0 16px',
    textAlign: 'center',
    fontSize: vw(18)
  },
  iconButton: {
    padding: 10,
    fontSize: vw(18)
  },
  divider: {
    height: 28,
    margin: 4
  },
  logo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    margin: 0
  }
}));

export default function CustomizedInputBase(props) {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      <Button aria-label="menu">
        <div className={classes.logo}>logo</div>
      </Button>

      <InputBase
        className={classes.input}
        placeholder="搜索热门文章/作者"
        inputProps={{ 'aria-label': '搜索热门文章/作者' }}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      {/* <Button
        color="primary"
        className={classes.iconButton}
        aria-label="directions"
        onClick={props.login}
      >
        注册或登录
      </Button> */}
      <IconButton className={classes.iconButton} aria-label="menu">
        <MenuIcon />
      </IconButton>
    </Paper>
  );
}
