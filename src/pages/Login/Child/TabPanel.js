import React from 'react';
import { Button, LinearProgress, Grid } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';

const LoginType = ({ classes, tabIdx, ...props }) => {
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
          >
            获取验证码
          </Button>
        </Grid>
      </Grid>
      {props.children}
    </>
  );
};
export default ({ tabIdx, classes, ...props }) => {
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
        console.log('value', values);

        if (tabIdx === 0) {
          if (!/^1\d{10}$/.test(values.phone)) {
            errors.phone = 'Invalid phone number';
          }
        } else {
          if (values.pwd.length < 6) {
            errors.pwd = '请输入正确密码';
          }
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          // await api res
          setSubmitting(false);
          props.login && props.login();
          // alert(JSON.stringify(values, null, 2));
        }, 500);
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form className={classes.form}>
          {/* 手机验证码 */}
          <LoginType tabIdx={tabIdx} classes={classes}>
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
};
