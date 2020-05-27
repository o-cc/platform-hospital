import React, { useState } from 'react';
import {
  Grid,
  Button,
  makeStyles,
  LinearProgress,
  Switch
} from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import BackHeader from '@/pages/components/BackHeader';
import { vw } from 'utils';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    marginTop: vw(15),
    '& input': {
      paddingLeft: vw(30),
      fontSize: 16
    },
    fontSize: 16
  },
  btnWrap: {
    margin: 16
  }
}));
const initialValues = {
  phone: '',
  city: '',
  address: '',
  name: '',
  post: ''
};

export default props => {
  const classes = useStyles();

  const [checkedB, setCheckedB] = useState(false);

  const validate = values => {
    const errors = {};

    if (!/^1\d{10}$/.test(values.phone)) {
      errors.phone = 'Invalid phone number';
    } else if (values.post.toString().length < 6) {
      errors.post = '无效的邮政编码';
    }
    return errors;
  };
  return (
    <>
      <BackHeader
        title="新增地址"
        back={() => {
          props.back && props.back();
        }}
        withoutHome={true}
      />
      <Grid
        container
        justify="center"
        style={{ background: '#fff', margin: `${vw(7)} 0` }}
      >
        <Grid item xs={11}>
          <Formik
            initialValues={props.initValue || initialValues}
            validate={validate}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false);
                props.onSubmit && props.onSubmit(values);
              }, 500);
            }}
          >
            {({ submitForm, isSubmitting }) => (
              <Form className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Field
                      required
                      fullWidth
                      id="name"
                      label="收货人姓名"
                      name="name"
                      autoComplete="name"
                      variant="standard"
                      component={TextField}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Field
                      component={TextField}
                      variant="standard"
                      required
                      fullWidth
                      type="number"
                      name="phone"
                      label="手机号码"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Field
                      component={TextField}
                      variant="standard"
                      required
                      fullWidth
                      name="city"
                      label="所在城市"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Field
                      component={TextField}
                      variant="standard"
                      required
                      fullWidth
                      name="detail"
                      label="详细地址"
                      multiline={true}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Field
                      component={TextField}
                      variant="standard"
                      required
                      name="post"
                      type="number"
                      fullWidth
                      label="邮政编码"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <p>
                    设为默认地址
                    <Switch
                      value={checkedB}
                      onChange={e => setCheckedB(e.target.checked)}
                      color="primary"
                      name="checkedB"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  </p>
                </Grid>
                <Grid container justify="center" className={classes.btnWrap}>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick={submitForm}
                  >
                    保存并使用
                  </Button>
                </Grid>
                {isSubmitting && <LinearProgress />}
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </>
  );
};
