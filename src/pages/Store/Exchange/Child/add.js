import React, { useState } from 'react';
import {
  Grid,
  Button,
  makeStyles,
  Divider,
  LinearProgress,
  Switch
} from '@material-ui/core';
import BackHeader from '@/pages/components/BackHeader';
import Slider from '@/pages/components/Slider';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import { vw } from '@/utils';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';

const useStyles = makeStyles(theme => ({
  button: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    padding: `${vw(15)} ${vw(22.5)}`,
    color: '#778'
  },
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
  const [addModal, setAddModal] = useState(false);
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
    <Grid container>
      <BackHeader title="选择地址" back={props.onClose} />

      <Grid item xs={12}>
        <Button
          variant="text"
          className={classes.button}
          endIcon={<ArrowForwardIosRoundedIcon />}
          onClick={() => setAddModal(true)}
        >
          添加收货地址
        </Button>
        <Divider />
      </Grid>
      <Slider open={addModal} bgColor="#f8f8f8">
        <BackHeader
          title="新增地址"
          back={() => {
            setAddModal(false);
          }}
        />
        <Grid
          container
          justify="center"
          style={{ background: '#fff', margin: `${vw(7)} 0` }}
        >
          <Grid item xs={11}>
            <Formik
              initialValues={initialValues}
              validate={validate}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  setSubmitting(false);
                  setAddModal(false);
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
                        name="address"
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
      </Slider>
    </Grid>
  );
};
