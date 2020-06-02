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

export default function SignIn(props) {
  const classes = useStyles();
  const [tabIdx, setTabIdx] = useState(0);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          登录
        </Typography>
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
        <TabPanel tabIdx={tabIdx} classes={classes} />
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
