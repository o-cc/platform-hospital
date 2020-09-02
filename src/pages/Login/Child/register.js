import React from 'react';
import { Grid, makeStyles, LinearProgress, Button } from '@material-ui/core';
import BackHeader from '@/pages/components/BackHeader';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { codeDownCount, storageKeys } from 'configs';
import AppCont from 'container';
import { requestApi, query } from '@/utils';
import useRunning from 'hooks/useRunning';
import { withRouter } from 'react-router-dom';
import useGetCode from '@/hooks/useGetCode';
import useWidth from '@/hooks/useWidth';
const useStyles = makeStyles(theme => ({
  mr2: {
    marginRight: theme.spacing(1)
  },
  form: {
    width: '95%'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    height: 48,
    width: 250
  }
}));
export default withRouter(({ ...props }) => {
  const classes = useStyles();

  const { setError } = AppCont.useContainer();

  const onSubmit = useRunning(async values => {
    let { result, error } = await requestApi('register', values);
    if (error) return setError(error);
    if (!result.token) return setError('登录异常，请重新登录');
    window.localStorage.setItem(storageKeys.token, result.token);

    setTimeout(() => {
      props.history && props.history.go(-1);
    }, 100);
  });
  const { downCount, getCode } = useGetCode();
  const clickGetCode = useRunning(async values => {
    let error = await getCode(values.phone);
    error && setError(error[0], error[1]);
  });
  const screen = useWidth();
  return (
    <>
      <BackHeader title="注册" back={props.onClose} withoutHome={true} />

      <Grid
        container
        justify="center"
        style={{ maxWidth: screen === 'xs' ? undefined : 660, margin: 'auto' }}
      >
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
            } else if (values.pwd.length < 4) {
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
              <Grid container spacing={1} justify="center">
                <Grid item xs={11}>
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
                <Grid item xs={11}>
                  <Field
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="包含数字、大小写字母和特殊符号"
                    name="pwd"
                    type="password"
                    component={TextField}
                  />
                </Grid>
                <Grid item xs={11}>
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

                <Grid item xs={11}>
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
                        disabled={downCount < codeDownCount}
                        onClick={() => clickGetCode(values)}
                      >
                        {downCount >= codeDownCount ? '获取验证码' : downCount}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={11} style={{ textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
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
    </>
  );
});
