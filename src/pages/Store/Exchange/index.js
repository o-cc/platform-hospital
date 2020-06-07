import React, { useState, useEffect } from 'react';
import {
  Grid,
  Button,
  makeStyles,
  Divider,
  Paper,
  Typography,
  IconButton
} from '@material-ui/core';
import BackHeader from '@/pages/components/BackHeader';
import Slider from '@/pages/components/Slider';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import { vw, requestApi } from '@/utils';
import AddressItem from 'pages/components/Address/Child/item';
import EditorAddress from '@/pages/components/Address/Child/editor';
import Address from 'pages/components/Address';
import AddIcon from '@material-ui/icons/Add';
import { Remove } from '@material-ui/icons';
import AppCont from 'container';
import useRunning from '@/hooks/useRunning';
import { withRouter } from 'react-router-dom';
import Dialog from 'pages/components/Dialog';

const useStyles = makeStyles(theme => ({
  button: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    padding: `${vw(15)} ${vw(22.5)}`,
    color: '#778'
  },
  img: {
    width: '90%',
    height: 'auto',
    maxWidth: '100%'
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(1)
  },
  confirm: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    left: 0
  },
  pay: {
    borderRadius: 20
  }
}));

function getObjInArrayByKey(arr, objKey, value) {
  return arr.filter(item => item[objKey] === value)[0];
}

const myCount = 19900;
export default withRouter(props => {
  const classes = useStyles();
  const [addressModal, setAddressModal] = useState(false);
  const [editorModal, setEditorModal] = useState(false);
  const [count, setCount] = useState(1);
  const [currAddress, setCurrAddress] = useState({});
  const { setError } = AppCont.useContainer();
  const [isSubmit, setSubmit] = useState();
  const [submitConfirm, setConfirm] = useState(false);
  useEffect(() => {
    async function getAddresses() {
      let { result, error } = await requestApi('getAddress');
      if (error) return setError(error);
      let defaultId = result.default_address_id;
      if (defaultId) {
        setCurrAddress(getObjInArrayByKey(result.addresses, 'id', defaultId));
      }
    }
    if (props.open) {
      getAddresses();
    }
  }, [setError, props.open]);

  const submitOrder = useRunning(async () => {
    const goods_id = props.goodsItem.id;
    if (!currAddress.id) return setError('请先选择地址', 'warning');
    if (!goods_id) return setError('该商品不存在,换个商品吧', 'warning');
    let { error } = await requestApi('postOrder', {
      goods_id,
      count,
      address_id: currAddress.id
    });
    if (error) return setError(error);
    setError('交易成功啦！请到个人中心查看订单交易状态', 'success', 8000);
    setSubmit(true);
    setConfirm(false);
    props.successExchange();
  });

  const { goodsItem: goods = {}, open } = props;

  return (
    <Slider bgColor="#f8f8f8" open={open}>
      <Grid container>
        <BackHeader title="商品兑换" back={props.onClose} />

        {currAddress.receiver ? (
          <AddressItem
            addressItem={currAddress}
            hasLocation={true}
            click={() => setAddressModal(true)}
            onEditor={() => {
              setEditorModal(true);
            }}
            onDelete={() => {
              setCurrAddress({});
            }}
          />
        ) : (
          <Grid item xs={12}>
            <Button
              variant="text"
              className={classes.button}
              endIcon={<ArrowForwardIosRoundedIcon />}
              onClick={() => setAddressModal(true)}
            >
              选择收货地址
            </Button>
            <Divider />
          </Grid>
        )}

        <Grid item xs={12}>
          <Paper variant="outlined" className={classes.paper}>
            <Grid container>
              <Grid item xs={4}>
                <img
                  src={goods.images && goods.images[0]}
                  className={classes.img}
                  alt=""
                />
              </Grid>
              <Grid item xs={8}>
                <Grid
                  container
                  direction="column"
                  justify="space-between"
                  style={{ height: '100%' }}
                >
                  <Grid item>{goods.name}</Grid>
                  <Grid item>
                    <Grid container justify="space-between">
                      <Typography>{goods.integral}积分</Typography>
                      <Grid container alignItems="center" justify="flex-end">
                        <IconButton
                          color="primary"
                          aria-label="picture"
                          component="span"
                          disabled={count <= 1}
                          onClick={() => setCount(count => count - 1)}
                        >
                          <Remove color="action" />
                        </IconButton>
                        <Typography align="right">{count}</Typography>
                        <IconButton
                          color="primary"
                          aria-label="picture2"
                          component="span"
                          onClick={() => setCount(count => count + 1)}
                        >
                          <AddIcon color="action" />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Paper variant="outlined" className={classes.confirm}>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            style={{ padding: 8 }}
          >
            <Grid item style={{ fontSize: 15 }}>
              合计：
              <span style={{ color: 'red' }}>{goods.integral * count}积分</span>
            </Grid>
            <Grid item>
              <Grid container alignItems="center">
                {goods.integral * count > myCount && (
                  <Typography variant="body2" color="textSecondary">
                    积分不足
                  </Typography>
                )}
                <Button
                  color="secondary"
                  variant="contained"
                  className={classes.pay}
                  onClick={() => setConfirm(true)}
                  disabled={isSubmit || goods.integral * count > myCount}
                >
                  确认支付
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        {/* 添加地址 */}

        <Address
          open={addressModal}
          onClose={() => setAddressModal(false)}
          title="选择地址"
          onClick={list => {
            setCurrAddress(list);
            setAddressModal(false);
          }}
        />

        <Slider open={editorModal} bgColor="#f8f8f8">
          <EditorAddress
            back={() => {
              setEditorModal(false);
            }}
            initValue={currAddress}
            onSubmit={values => {
              setEditorModal(false);
              console.log(values);
            }}
          />
        </Slider>
      </Grid>
      <Dialog
        open={submitConfirm}
        text={`本次交易将花费${goods.integral * count}积分`}
        onClose={() => setConfirm(false)}
        handleOk={submitOrder}
      />
    </Slider>
  );
});
