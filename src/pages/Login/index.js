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
import useRunning from '@/hooks/useRunning';
import AppCont from 'container';
import { codeDownCount } from 'configs';
import { requestApi } from 'utils';

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
export default function SignIn(props) {
  const classes = useStyles();
  const { setError } = AppCont.useContainer();
  const [tabIdx, setTabIdx] = useState(0);
  const [modal, setModal] = useState({ show: false, type: 'register' });
  const [downCount, setDown] = useState(codeDownCount);

  const toggleLink = type => {
    setModal({ show: true, type });
  };

  const getCode = useRunning(async phone => {
    if (!/^1\d{10}$/.test(phone)) {
      return setError('请输入正确的手机号', 'warning');
    }

    let { result, error } = await requestApi('getSmsCode', {
      phone
    });

    if (error || result.message !== 'OK') {
      return setError(error || result.message);
    }
    setError('验证码发送成功', 'success');
    //开始倒计时
    codeDown();
  });

  const codeDown = () => {
    setDown(count => {
      if (count <= 0) return codeDownCount;
      setTimeout(() => {
        codeDown();
      }, 1000);
      return --count;
    });
  };

  const Comp = MAP[modal.type] || Copyright;

  return (
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
          getCode={getCode}
          downCount={downCount}
          onClose={() => {
            setModal({ show: false });
          }}
        />
      </Slider>
    </Container>
  );
}
