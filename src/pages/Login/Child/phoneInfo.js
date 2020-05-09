import React from 'react';
import { Button, LinearProgress, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  input: {
    maxWidth: '180px'
  }
}));

/*
 <Field
            component={TextField}
            type="password"
            label="Password"
            name="password"
          />
          {isSubmitting && <LinearProgress />}
          <br />
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            onClick={submitForm}
          >
            Submit
          </Button>
*/
export default () => {
  const classes = useStyles();
  return (
    <Formik
      initialValues={{
        phone: '',
        code: ''
      }}
      validate={values => {
        const errors = {};
        console.log('value', values);

        if (!/^1\d{10}$/.test(values.phone)) {
          errors.phone = 'Invalid phone number';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          alert(JSON.stringify(values, null, 2));
        }, 500);
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form className={classes.form}>
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
              autoFocus
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
        </Form>
      )}
    </Formik>
  );
};
