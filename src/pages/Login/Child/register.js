import React, { useState } from 'react';
import { Grid, makeStyles, LinearProgress, Button } from '@material-ui/core';
import BackHeader from '@/pages/components/BackHeader';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import useWidth from 'hooks/useWidth';
import { codeDownCount, storageKeys } from 'configs';
import AppCont from 'container';
import { requestApi, query } from '@/utils';
import useRunning from 'hooks/useRunning';
import { withRouter } from "react-router-dom";
const useStyles = makeStyles(theme => ({
  mr2: {
    marginRight: theme.spacing(1)
  },
  form: {
    width: '95%'
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));
export default withRouter(props => {
  const classes = useStyles();
  const width = useWidth();
  const [downCount, setDown] = useState(codeDownCount);

  const { setError } = AppCont.useContainer();
  const getCode = useRunning(async phone => {
    if (!/^1\d{10}$/.test(phone)) {
      return setError('请输入正确的手机号', 'warning');
    }

    let { result, error } = await requestApi('getSmsCode', {
      phone
    });

    if (error || result.message !== 'ok') {
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

  const onSubmit = useRunning(async values => {
    let { result, error } = await requestApi('register', values);
    if (error) return setError(error);
    if (!result.token) return setError('登录异常，请重新登录');
    window.localStorage.setItem(storageKeys.token, result.token);
    setTimeout(() => {
      props.history && props.history.push('/');
    }, 100);
  });

  return (
    <Grid container justify="center">
      <BackHeader title="注册" back={props.onClose} withoutHome={true} />
      <Formik
        initialValues={{
          phone: '',
          code: '',
          pwd: '',
          re_pwd: '',
          name: ''
        }}
        validate={values => {
          const errors = {};
          if (query.debug) {
            return errors;
          }

          if (!values.name) {
            errors.name = '请输入正确的用户名';
          } else if (values.pwd.length < 6) {
            errors.pwd = '请输入正确密码';
          } else if (values.pwd !== values.re_pwd) {
            errors.re_pwd = '两次密码不一致';
          } else if (!/^1\d{10}$/.test(values.phone)) {
            errors.phone = 'Invalid phone number';
          } else if (values.code.length <= 0) {
            errors.code = 'Invalid code number';
          }
          return errors;
        }}
        onSubmit={onSubmit}
      >
        {({ submitForm, isSubmitting, values }) => (
          <Form className={classes.form}>
            <Grid
              container
              justify={width === 'xs' ? 'center' : 'space-around'}
            >
              <Grid item xs={11} sm={5} md={4}>
                <Field
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="用户名"
                  name="name"
                  component={TextField}
                />
              </Grid>
              <Grid item xs={11} sm={6} md={4}>
                <Field
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="密码"
                  name="pwd"
                  type="password"
                  component={TextField}
                />
              </Grid>
              <Grid item xs={11} sm={5} md={4}>
                <Field
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="确认密码"
                  name="re_pwd"
                  type="password"
                  component={TextField}
                />
              </Grid>
              <Grid item xs={11} sm={5} md={4}>
                <Field
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="手机号码"
                  name="phone"
                  component={TextField}
                />
              </Grid>

              <Grid item xs={11} sm={6} md={4}>
                <Grid container justify="space-around">
                  <Field
                    variant="outlined"
                    margin="normal"
                    required
                    label="验证码"
                    name="code"
                    component={TextField}
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={downCount < codeDownCount}
                    onClick={() => getCode(values.phone)}
                  >
                    {downCount >= codeDownCount ? '获取验证码' : downCount}
                  </Button>
                </Grid>
              </Grid>

              <Grid item xs={11}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  className={classes.submit}
                  onClick={submitForm}
                >
                  立即注册
                </Button>
              </Grid>

              {isSubmitting && <LinearProgress />}
            </Grid>
          </Form>
        )}
      </Formik>
    </Grid>
  );
});
