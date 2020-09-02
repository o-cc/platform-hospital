import React, { useState } from 'react';
import {
  Paper,
  Tabs,
  Tab,
  Box,
  Typography,
  Link,
  CssBaseline,
  Avatar
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TabPanel from './Child/TabPanel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Slider from 'pages/components/Slider';
import Register from './Child/register';
import Forgot from './Child/forgot';
import BackHeader from 'pages/components/BackHeader';
import { withRouter } from 'react-router-dom';
import useWidth from '@/hooks/useWidth';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit">Your Website</Link> {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    paddingTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  input: {
    maxWidth: '180px'
  },
  root: {
    marginTop: theme.spacing(1)
  }
}));

const MAP = {
  register: Register,
  forgot: Forgot
};
export default withRouter(function SignIn(props) {
  const classes = useStyles();
  const [tabIdx, setTabIdx] = useState(0);
  const [modal, setModal] = useState({ show: false, type: 'register' });

  const toggleLink = type => {
    setModal({ show: true, type });
  };

  const Comp = MAP[modal.type] || Copyright;
  const screen = useWidth();
  return (
    <>
      <BackHeader
        title=""
        back={() => props.history.push('/')}
        withoutHome={true}
        bgColor={'none'}
      />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Paper className={classes.root}>
            <Tabs
              value={tabIdx}
              onChange={(e, val) => {
                setTabIdx(val);
              }}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="手机登录" />
              <Tab label="账号登录" />
            </Tabs>
          </Paper>
          <TabPanel tabIdx={tabIdx} classes={classes} onLink={toggleLink} />
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>

        <Slider open={modal.show}>
          <Comp
            inLogin={screen === 'xs' ? undefined : true}
            onClose={() => {
              setModal({ show: false });
            }}
          />
        </Slider>
      </Container>
    </>
  );
});
