import React from 'react';
import { Grid, makeStyles, LinearProgress, Button } from '@material-ui/core';
import BackHeader from '@/pages/components/BackHeader';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import useWidth from 'hooks/useWidth';
import { codeDownCount, storageKeys } from 'configs';
import AppCont from 'container';
import { requestApi, query } from '@/utils';
import useRunning from 'hooks/useRunning';
import { withRouter } from 'react-router-dom';
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
export default withRouter(({ downCount, getCode, ...props }) => {
  const classes = useStyles();
  const width = useWidth();
  const { setError } = AppCont.useContainer();
  const onSubmit = useRunning(async values => {
    let { result, error } = await requestApi('forgot', values);
    if (error) return setError(error);
    if (!result.token) return setError('登录异常，请重新登录');
    window.localStorage.setItem(storageKeys.token, result.token);
    setTimeout(() => {
      props.history && props.history.push('/');
    }, 100);
  });

  return (
    <Grid container justify="center">
      <BackHeader title="密码找回" withoutHome={true} />
      <Formik
        initialValues={{
          phone: '',
          code: '',
          pwd: '',
          re_pwd: ''
        }}
        validate={values => {
          const errors = {};
          if (query.debug) {
            return errors;
          }
          if (!/^1\d{10}$/.test(values.phone)) {
            errors.phone = 'Invalid phone number';
          } else if (values.code.length <= 0) {
            errors.code = 'Invalid code number';
          } else if (values.pwd.length < 6) {
            errors.pwd = '请输入正确密码';
          } else if (values.pwd !== values.re_pwd) {
            errors.re_pwd = '两次密码不一致';
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
              <Grid item xs={11} sm={5}>
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

              <Grid item xs={11} sm={5}>
                <Grid container justify="space-between">
                  <Grid item xs={7}>
                    <Field
                      variant="outlined"
                      margin="normal"
                      required
                      label="验证码"
                      name="code"
                      component={TextField}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      disabled={downCount < codeDownCount}
                      onClick={() => getCode(values.phone)}
                    >
                      {downCount >= codeDownCount ? '验证码' : downCount}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={11} sm={5}>
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
              <Grid item xs={11} sm={5}>
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

              <Grid item xs={11}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  className={classes.submit}
                  onClick={submitForm}
                >
                  确定
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
