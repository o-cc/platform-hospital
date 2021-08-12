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
import Collapse from '@material-ui/core/Collapse';
import withWidth from '@material-ui/core/withWidth';
import PC from './PC';
import { Typography } from '@material-ui/core';
import { TITLE_MAP } from '@/configs';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    // backgroundImage: 'linear-gradient(0deg,#f1503b,#c82519 50%)',
    zIndex: 2
  },
  titleText: {
    position: 'absolute',
    left: vw(130),
    top: '50%',
    background: '#fff',
    width: '58%',
    transform: 'translateY(-50%)'
  },
  input: {
    border: '1px solid rgb(0, 102, 255)',
    background: '#fff',
    color: '#1a1a1a',
    borderRadius: '16px',
    padding: '0 16px',
    textAlign: 'center',
    fontSize: vw(22.5),
    transition: 'width',
    width: vw(100),
    animation: '$inputEffect .2s linear forwards'
  },
  iconButton: {
    padding: 10,
    fontSize: vw(18),
    color: 'rgb(0, 102, 255)'
  },
  divider: {
    height: 28
  },
  logo: {
    width: vw(80),
    height: vw(80),
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '50%',
    marginLeft: vw(15),
    background: `url(${require('assets/imgs/logo.jpeg')}) no-repeat center/auto 100%`
  },
  form: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  '@keyframes inputEffect': {
    '0%': {
      width: vw(100)
    },
    '100%': {
      width: vw(375)
    }
  }
});

export default withWidth()(
  withRouter(function CustomizedInputBase(props) {
    const classes = useStyles();
    const { value, onChange } = useInput();
    const { setError } = container.useContainer();
    const [menuData, setMenuData] = React.useState([]);
    const [search, setSearch] = React.useState(false);
    // title text
    const [titleText, setTitleText] = React.useState(TITLE_MAP[0]);
    const [titleTextToggle, setTitleTextToggle] = React.useState(false);
    const searchEvent = useRunning(async (e, val) => {
      e.preventDefault();
      setSearch(sta => !sta);

      // autofocus

      // if (!val) {
      //   return;
      // }
      // let { result, error } = await requestApi('getSearch', { search: val });
      // if (error) {
      //   return setError(error);
      // }
      // setSearchData(result);
      // setTimeout(() => {
      //   props.history && props.history.push('/search');
      // }, 100);
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

    useEffect(() => {
      // 5s刷新一次
      let timer2,
        timer = setInterval(() => {
          setTitleTextToggle(sta => !sta);
        }, 5000);

      if (TITLE_MAP.length > 1) {
        let flag = 0;
        timer2 = setInterval(() => {
          flag++;
          if (flag >= TITLE_MAP.length) {
            flag = 0;
          }
          setTitleText(TITLE_MAP[flag]);
        }, 10000);
      }

      return () => {
        clearInterval(timer);
        clearInterval(timer2);
        timer = null;
        timer2 = null;
      };
    }, []);

    return (
      <>
        <Hidden smUp>
          <Paper className={classes.root} elevation={1} square={true}>
            <div className={classes.logo}></div>
            <Paper elevation={0} component="form" className={classes.form}>
              {search ? (
                <InputBase
                  autoFocus={true}
                  className={classes.input}
                  placeholder="搜索热门文章/作者"
                  value={value}
                  onChange={onChange}
                  inputProps={{ 'aria-label': '搜索热门文章/作者' }}
                />
              ) : (
                <>
                  <Collapse in={!titleTextToggle} className={classes.titleText}>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      style={{ marginRight: vw(75), whiteSpace: 'nowrap' }}
                    >
                      {titleText[0].text}
                    </Typography>
                  </Collapse>
                  <Collapse in={titleTextToggle} className={classes.titleText}>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      style={{ marginRight: vw(75), whiteSpace: 'nowrap' }}
                    >
                      {titleText[1].text}
                    </Typography>
                  </Collapse>
                </>
              )}

              <IconButton
                type="submit"
                className={classes.iconButton}
                aria-label="search"
                onClick={e => searchEvent(e, value)}
              >
                <SearchIcon />
              </IconButton>
            </Paper>
            <Divider className={classes.divider} orientation="vertical" />
            <Drawer menuData={menuData} {...props} />
          </Paper>
        </Hidden>
        <Hidden xsDown>
          <PC menuData={menuData} search={searchEvent} />
        </Hidden>
      </>
    );
  })
);
