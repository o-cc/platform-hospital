import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '../Drawer';
import SearchIcon from '@material-ui/icons/Search';
import { vw, requestApi } from 'utils';
import useRunning from '@/hooks/useRunning';
import useInput from '@/hooks/useInput';
import container from '@/container';
import { withRouter } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';
import PC from './PC';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    boxShadow: 'none',
    backgroundImage: 'linear-gradient(0deg,#f1503b,#c82519 50%)',
    zIndex: 2
  },
  input: {
    marginLeft: theme.spacing(2),
    flex: 1,
    border: '1px solid #ddd',
    background: '#fff',
    color: '#1a1a1a',
    borderRadius: '16px',
    padding: '0 16px',
    textAlign: 'center',
    fontSize: vw(22.5)
  },
  iconButton: {
    padding: 10,
    fontSize: vw(18),
    color: 'white'
  },
  divider: {
    height: 28,
    margin: 4
  },
  logo: {
    width: 100,
    height: 48,
    background: `url(${require('assets/imgs/logo.png')}) no-repeat center/100%`
  }
}));

export default withWidth()(
  withRouter(function CustomizedInputBase(props) {
    const classes = useStyles();
    const { value, onChange } = useInput();
    const { setError, setSearchData } = container.useContainer();
    const [menuData, setMenuData] = React.useState([]);

    const search = useRunning(async (e, val) => {
      e.preventDefault();
      if (!val) {
        return;
      }
      let { result, error } = await requestApi('getSearch', { search: val });
      if (error) {
        return setError(error);
      }
      setSearchData(result);
      setTimeout(() => {
        props.history && props.history.push('/search');
      }, 100);
    });

    useEffect(() => {
      async function getMenuData() {
        let { result, error } = await requestApi('getMenu', { cache: true });
        if (error) {
          return setError(error);
        }
        setMenuData(result);
      }
      getMenuData();
    }, [setError]);

    return (
      <>
        <Hidden smUp>
          <Paper component="form" className={classes.root}>
            {/* <div className={classes.logo}></div> */}

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
              onClick={e => search(e, value)}
            >
              <SearchIcon />
            </IconButton>
            <Divider className={classes.divider} orientation="vertical" />
            <Drawer menuData={menuData} {...props} />
          </Paper>
        </Hidden>
        <Hidden xsDown>
          <PC menuData={menuData} search={search} />
        </Hidden>
      </>
    );
  })
);
