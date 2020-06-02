import React, { useState } from 'react';
import { Button, LinearProgress, Grid } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { Formik, Form, Field, useField } from 'formik';
import { TextField } from 'formik-material-ui';
import { requestApi } from '@/utils';
import AppCont from 'container';
import useRunning from '@/hooks/useRunning';
import { storageKeys } from '@/configs';
import { withRouter } from 'react-router-dom';

const codeDownCount = 10;
const LoginType = ({ downCount, classes, tabIdx, ...props }) => {
  const phones = useField('phone');
  if (tabIdx !== 0) {
    return (
      <>
        <Grid container justify={'space-between'}>
          <Field
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="用户名/手机号码"
            name="name"
            autoComplete="name"
            component={TextField}
          />
          <Field
            component={TextField}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="pwd"
            type="password"
            label="密码"
          />
        </Grid>
        {props.children}
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              忘记密码？
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {'没有账号？去注册'}
            </Link>
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid container justify={'space-between'}>
        <Field
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="phone"
          label="手机号码"
          name="phone"
          autoComplete="phone"
          component={TextField}
        />
        <Grid item>
          <Field
            component={TextField}
            variant="outlined"
            margin="normal"
            required
            name="code"
            label="验证码"
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={downCount < codeDownCount}
            onClick={() => props.getCode(phones)}
          >
            {downCount >= codeDownCount ? '获取验证码' : downCount}
          </Button>
        </Grid>
      </Grid>
      {props.children}
    </>
  );
};
export default withRouter(({ tabIdx, classes, ...props }) => {
  const { setError } = AppCont.useContainer();
  const [downCount, setDown] = useState(codeDownCount);

  const onSubmit = useRunning(async (values, { setSubmitting }) => {
    let apiName = 'loginByMobile';
    if (tabIdx === 1) apiName = 'login';
    let { result, error } = await requestApi(apiName, values);
    setSubmitting(false);
    if (error) {
      return setError(error);
    }

    if (!result.token) return setError('登录异常，请重新登录');
    window.localStorage.setItem(storageKeys.token, result.token);
    setTimeout(() => {
      props.history && props.history.push('/');
    }, 100);
  });

  const getCode = useRunning(async phones => {
    const [, phoneInfo] = phones;

    if (!phoneInfo.value || phoneInfo.error) {
      return setError('请填写正确手机号码.', 'warning');
    }

    let { result, error } = await requestApi('getSmsCode', {
      phone: phoneInfo.value
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

  return (
    <Formik
      initialValues={{
        phone: '',
        code: '',
        pwd: '',
        name: ''
      }}
      validate={values => {
        const errors = {};
        if (tabIdx === 0) {
          if (!/^1\d{10}$/.test(values.phone)) {
            errors.phone = 'Invalid phone number';
          } else if (values.code.length <= 0) {
            errors.code = 'Invalid code number';
          }
        } else {
          if (values.pwd.length < 6) {
            errors.pwd = '请输入正确密码';
          }
        }

        return errors;
      }}
      onSubmit={onSubmit}
    >
      {({ submitForm, isSubmitting }) => (
        <Form className={classes.form}>
          {/* 手机验证码 */}
          <LoginType
            tabIdx={tabIdx}
            classes={classes}
            downCount={downCount}
            getCode={getCode}
          >
            {isSubmitting && <LinearProgress />}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isSubmitting}
              onClick={submitForm}
            >
              登录
            </Button>
          </LoginType>
        </Form>
      )}
    </Formik>
  );
});
