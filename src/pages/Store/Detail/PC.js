import React, { useState, useEffect } from 'react';
import Nav from '@/pages/components/Header/Nav';
import { makeStyles, styled } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  Divider,
  TextField,
  Button,
  Switch
} from '@material-ui/core';
import Swiper from 'react-id-swiper';
import { useParams } from 'react-router-dom';
import AppCont from '@/container';
import { requestApi } from '@/utils';
import AddressItem from '@/pages/components/Address/Child/item';
import Modal from 'pages/components/Modal';
import EditorAddress from 'pages/components/Address/Child/editor';
import useRunning from '@/hooks/useRunning';
import Dialog from 'pages/components/Dialog';
const MyDiv = styled(({ src, ...other }) => (
  <img src={src} alt="商品介绍" {...other} />
))({
  color: 'white',
  maxWidth: '100%',
  height: 'auto'
});
const useStyles = makeStyles(theme => ({
  root: {
    width: 1000,
    margin: '20px auto 0',
    padding: theme.spacing(4),
    backgroundColor: '#fff'
  },
  slideInfo: {
    width: '100%',
    padding: theme.spacing(1, 2),
    marginLeft: 20,
    fontSize: 14,
    '& h2': {
      margin: theme.spacing(1, 0, 0),
      lineHeight: '40px',
      color: '#212121',
      fontWeight: 400
    },
    '& .sale-desc': {
      color: '#b0b0b0',
      margin: 0,
      padding: 0,
      paddingTop: theme.spacing(1),
      lineHeight: 1.5,
      marginBottom: 8
    },
    '& .sale-price': {
      color: '#fff',
      height: 52,
      marginTop: 20,
      width: '95%',
      display: 'flex',
      paddingLeft: theme.spacing(2),
      flexDirection: 'column',
      justifyContent: 'center',
      borderRadius: 4,
      background: `linear-gradient(to right, #ff5f04, #ff2914)`,

      '& .integral': {
        fontSize: 22,
        marginBottom: 4
      }
    }
  },
  count: {
    display: 'flex',
    alignItems: 'center',
    '& >span': {
      marginRight: 8
    }
  },
  detail: {
    fontSize: 16,
    height: 52,
    lineHeight: 1.5,
    background: '#f5f5f5f5',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 16,
    margin: theme.spacing(4, 0)
  },
  address: {
    marginTop: 35,
    lineHeight: 1.5
  },
  btn: {
    background: `#ff6700`,
    padding: theme.spacing(1, 10),
    fontSize: 16,
    color: '#fff',
    '&:hover': {
      background: `#ff6700`
    }
  },
  central: {
    padding: '30px 20px 20px',
    background: '#fff',
    minHeight: 350,
    maxHeight: '80vh',
    overflowY: 'auto',
    width: 660,
    margin: 'auto',

    '& .title': {
      color: '#b0b0b0',
      fontSize: 16,
      marginBottom: 10
    },
    '& .address-add': {
      margin: theme.spacing(0, 2, 2),
      '& .add-items': {
        width: '80%'
      }
    },
    '& .address-select': {
      margin: theme.spacing(0, 2),

      '& .address-list': {}
    }
  }
}));
function getObjInArrayByKey(arr, objKey, value) {
  return arr.filter(item => item[objKey] === value)[0];
}
export default () => {
  const classes = useStyles();
  const { id } = useParams();
  const { state, setError } = AppCont.useContainer();
  let params = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true
    },
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    }
  };
  const goodsItem = state.goods[id] || {};

  const [count, setCount] = useState(0);
  const [addressInfo, setAddressInfo] = useState({ addresses: [] });
  const [currAddress, setCurrAddress] = useState({});
  const [openAdd, setOpenAdd] = useState(false);
  const [addressModal, setAddressModal] = useState(false);
  useEffect(() => {
    async function getAddresses() {
      let { result, error } = await requestApi('getAddress');
      if (error) {
        return;
      }
      let defaultId = result.default_address_id;
      if (defaultId) {
        setCurrAddress(getObjInArrayByKey(result.addresses, 'id', defaultId));
      }
      setAddressInfo(result);
    }
    getAddresses();
  }, [setError]);

  const addAddress = useRunning(async values => {
    let { result, error } = await requestApi('postAddress', values);
    if (error) return setError(error);
    setAddressInfo(lists => ({
      ...lists,
      addresses: lists.addresses.concat(result)
    }));
    setTimeout(() => {
      setOpenAdd(false);
    }, 10);
  });

  const [submitConfirm, setConfirm] = useState(false);
  const submitOrder = useRunning(async () => {
    const goods_id = goodsItem.id;
    let { error } = await requestApi('postOrder', {
      goods_id,
      count,
      address_id: currAddress.id
    });
    if (error) return setError(error);
    setError('交易成功啦！请到个人中心查看订单交易状态', 'success', 8000);
    setConfirm(false);
    setCount(0);
  });
  return (
    <>
      <Nav />

      <Grid className={classes.root} container>
        {!goodsItem.id ? (
          <Typography variant="subtitle2">
            当前商品不存在,请重新选择商品
          </Typography>
        ) : (
          <>
            <Grid item xs={6}>
              <Swiper {...params}>
                {goodsItem.images &&
                  goodsItem.images.map((item, idx) => (
                    <MyDiv key={idx} src={item} />
                  ))}
              </Swiper>
            </Grid>
            <Grid item xs={6}>
              <Grid container className={classes.slideInfo} direction="column">
                <Grid item xs={12}>
                  <h2 className="h2">{goodsItem.name}</h2>
                  <Divider />
                  <div className="sale-price">
                    <div>
                      积分: <em>￥</em>
                      <span className="integral"> {goodsItem.integral}</span>
                    </div>
                    <div>
                      市场价: <em>￥</em>
                      <del> {goodsItem.price}</del>
                    </div>
                  </div>
                  <p style={{ marginBottom: 30 }}>
                    库存:
                    <span style={{ fontSize: 20, marginLeft: 6 }}>
                      {goodsItem.stock}
                    </span>
                    个
                  </p>
                  <div className={classes.count}>
                    <span style={{ marginRight: 6 }}>数量: </span>
                    <TextField
                      type="number"
                      value={count}
                      variant="outlined"
                      size="small"
                      inputProps={{
                        min: 0
                      }}
                      onChange={e => setCount(e.target.value)}
                    />
                  </div>
                  <div className={classes.address}>
                    {currAddress.id ? (
                      <>
                        收获地址
                        <AddressItem
                          addressItem={currAddress}
                          hasLocation={true}
                          isModify={true}
                          select={() => setAddressModal(true)}
                        />
                      </>
                    ) : (
                      <Button onClick={() => setAddressModal(true)}>
                        请选择收获地址
                      </Button>
                    )}
                  </div>
                </Grid>
                <Grid container alignItems="center" style={{ marginTop: 30 }}>
                  <Button
                    variant="contained"
                    disableElevation
                    disabled={count <= 0 || goodsItem.stock <= 0}
                    className={classes.btn}
                    onClick={() => {
                      const goods_id = goodsItem.id;
                      if (!currAddress.id)
                        return setError('请先选择地址', 'warning');
                      if (!goods_id)
                        return setError('该商品不存在,换个商品吧', 'warning');
                      setConfirm(true);
                    }}
                  >
                    确认支付
                  </Button>
                  {count > 0 && (
                    <span
                      style={{
                        color: '#ff6700',
                        fontSize: 24,
                        paddingLeft: 20
                      }}
                    >
                      总计: {goodsItem.integral * count}分
                    </span>
                  )}
                </Grid>
              </Grid>
            </Grid>

            <Grid xs={12} item>
              <h2 className={classes.detail}>商品详情</h2>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ paddingLeft: 16 }}
              >
                {goodsItem.desc}
              </Typography>
            </Grid>
          </>
        )}
      </Grid>

      {addressModal && (
        <Modal open={addressModal} onClose={() => setAddressModal(false)}>
          <div className={classes.central}>
            <div className="address-add">
              <div className="title">
                添加收获地址
                <Switch
                  checked={openAdd}
                  onChange={e => setOpenAdd(e.target.checked)}
                  color="primary"
                  name="checkedB"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              </div>
              <div className="add-items">
                {openAdd && (
                  <EditorAddress
                    isDefault={false}
                    initValue={{}}
                    onSubmit={addAddress}
                  />
                )}
              </div>
              <Divider />
            </div>
            <div className="address-select">
              <div className="title">我的收货地址</div>
              <div className="address-list">
                <Grid container spacing={1}>
                  {addressInfo.addresses.map(item => (
                    <Grid item xs={6} key={item.id} className="address">
                      <AddressItem
                        addressItem={item}
                        click={list => {
                          setCurrAddress(list);
                          setAddressModal(false);
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
          </div>
        </Modal>
      )}

      <Dialog
        open={submitConfirm}
        text={`本次交易将花费${goodsItem.integral * count}积分`}
        onClose={() => setConfirm(false)}
        handleOk={submitOrder}
      />
    </>
  );
};
