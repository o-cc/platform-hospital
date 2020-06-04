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
import { vw, getObjKey, query, requestApi } from 'utils';
import useRunning from '@/hooks/useRunning';
import AppCont from 'container';

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
  mobile: '',
  area: '',
  address: '',
  receiver: ''
};

export default props => {
  const classes = useStyles();
  const { setError } = AppCont.useContainer();
  const [checkedB, setCheckedB] = useState(props.isDefault);
  const validate = values => {
    const errors = {};
    if (query.debug) {
      return errors;
    }
    if (values.receiver.length < 5) {
      errors.receiver = '用户名必须5个字符';
    } else if (!/^1\d{10}$/.test(values.mobile)) {
      errors.mobile = 'Invalid phone number';
    }
    return errors;
  };

  const switchChange = useRunning(async e => {
    let { error } = await requestApi('putDefaultAddress', {
      address_id: props.initValue.id
    });
    if (error) return setError(error);
    setCheckedB(e.target.checked);
  });

  const init =
    getObjKey(props.initValue).length > 0 ? props.initValue : initialValues;

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
            initialValues={init}
            validate={validate}
            onSubmit={async (values, { setSubmitting }) => {
              props.onSubmit && (await props.onSubmit(values));
              setSubmitting(false);
            }}
          >
            {({ submitForm, isSubmitting }) => (
              <Form className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Field
                      required
                      fullWidth
                      label="收货人姓名"
                      name="receiver"
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
                      name="mobile"
                      label="手机号码"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Field
                      component={TextField}
                      variant="standard"
                      required
                      fullWidth
                      name="area"
                      label="所在城市"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Field
                      component={TextField}
                      variant="standard"
                      required
                      fullWidth
                      name="address"
                      label="详细地址"
                      multiline={true}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <p>
                    设为默认地址
                    <Switch
                      checked={checkedB}
                      onChange={switchChange}
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
