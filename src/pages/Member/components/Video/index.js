import React, { useEffect, useCallback, useState } from 'react';
import Slider from 'pages/components/Slider';
import {
  makeStyles,
  IconButton,
  Grid,
  Button,
  Card,
  CardMedia,
  styled,
  Typography,
  Hidden
} from '@material-ui/core';
import BackHeader from 'pages/components/BackHeader';
import ImagePicker from '@/tools/ImagePicker';
import { requestApi } from '@/utils';
import AppCont from 'container';
import MenuItem from '@material-ui/core/MenuItem';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import useRunning from '@/hooks/useRunning';
import Se from '@material-ui/core/Select';
import * as qiniu from 'qiniu-js';
import { CloudUpload } from '@material-ui/icons';
import useWidth from '@/hooks/useWidth';
import Nav from '@/pages/components/Header/Nav';

const useStyles = makeStyles(t => ({
  editor: {
    height: 'calc(80vh - 49px)'
  },
  release: {
    fontSize: 14,
    color: '#666'
  },
  form: {
    width: '100%',
    maxWidth: '800px',
    margin: 'auto',
    padding: `30px 0`,
    background: '#fff',
    marginBottom: 60
  },
  inputs: {
    margin: t.spacing(0, 0, 3, 0),
    padding: t.spacing(1)
  },
  input: {
    display: 'none'
  },
  inputWrap: {
    marginTop: t.spacing(1),
    fontSize: 18
  },
  video: {
    width: '100%',
    height: t.spacing(25)
  },
  img: {
    width: t.spacing(12),
    height: 'auto'
  },
  button: {
    margin: t.spacing(0, 1)
  },
  label: {
    lineHeight: '40px',
    fontSize: 15,
    color: '#888'
  },
  pcBtn: {
    position: 'fixed',
    bottom: '3%',
    right: 0,
    left: 0,
    margin: 'auto',
    textAlign: 'center',
    height: 48
  }
}));
const ProgressUI = styled(({ progress, ...other }) => <div {...other} />)({
  background: '#ccc',
  borderRadius: 4,
  width: '100%',
  height: 8,
  position: 'relative',
  overflowY: 'hidden',
  '& .child': {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    margin: 'auto',
    width: p => p.progress + '%',
    height: '100%',
    background: '#669966'
  }
});

function Editor(props) {
  const classes = useStyles();
  const { setError } = AppCont.useContainer();
  const [posterName, setPosterName] = useState('');
  const [categoryData, setCategoryData] = useState([]);
  const [topCateIdx, setTopCateIdx] = useState('');
  const [subCateIdx, setSubCateIdx] = useState('');
  const [endCateIdx, setEndCateIdx] = useState('');
  const [currSelectCate, setCurrSelect] = useState({});
  const [imgUrl, setImgUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [progress, setProgress] = useState(0);
  const [videoInfo, setVideoInfo] = useState({});
  const [isComplete, setIsComplete] = useState({});
  const [imgState, setImgState] = useState('请先上传封面图片');
  useEffect(() => {
    async function getCategory() {
      let { result, error } = await requestApi('getCategories');
      if (error) return setError(error);
      setCategoryData(result);
    }
    getCategory();
  }, [setError]);

  const uploadImg = useCallback(
    async file => {
      let fd = new FormData();
      fd.append('file', file);
      let { result, error } = await requestApi('postImg', { blob: fd });
      if (error) return setError(error);
      return result;
    },
    [setError]
  );

  const release = useRunning(async values => {
    if (!currSelectCate.id && !currSelectCate.sub_id)
      return setError('请选择视频分类', 'warning');
    if (!posterName) return setError('请先上传文章封面', 'warning');
    if (topCateIdx === '' || subCateIdx === '')
      return setError('视频分类要求选择二级以上', 'warning');

    if (!videoInfo.key) return setError('请先上传视频', 'warning');
    if (Number(progress) < 100 && Number(progress) > 0)
      return setError('请等待视频上传完成噢', 'warning');

    let { error } = await requestApi('postNews', {
      category: currSelectCate.id || currSelectCate.sub_id,
      title: values.title,
      index_image_name: posterName,
      video_desc: values.desc,
      type: 'Video',
      video_name: videoInfo.key
    });
    if (error) return setError(error);
    setError('操作成功', 'success');
    props.onClose && props.onClose();
  });

  const uploadPoster = async (canvas, data, file) => {
    setImgState('封面上传中...');
    let result = await uploadImg(file);
    if (!result) return setImgState('上传失败, 请重试!');
    setImgState('封面上传成功');
    setPosterName(result.image_name);
    setImgUrl(result.image_url);
  };

  const putExtra = {
    fname: '',
    params: {},
    mimeType: [] || null
  };
  const config = {
    useCdnDomain: true,
    region: null
  };
  const observer = {
    next(res) {
      if (res.total && res.total.percent) {
        setProgress(Math.floor(res.total.percent * 100) / 100);
      }
    },
    error(err) {
      setError('上传失败，请重试');
    },
    complete(res) {
      setIsComplete(true);
    }
  };

  const selectVideo = async e => {
    let file = e.target.files[0];
    if (!file) return setError('未获取到视频文件！', 'warning');
    let { result, error } = await requestApi('getQiNiuToken');
    if (error) return setError(error);
    let { token, key, video_url } = result || {};
    if (!token || !key || !video_url) {
      return setError('错误，缺少关键信息', 'warning');
    }
    setVideoInfo(result);
    setVideoUrl(video_url);
    setIsComplete(false);
    setProgress(0);
    var observable = qiniu.upload(file, key, token, putExtra, config);
    var subscription = observable.subscribe(observer);
    console.log('subscription: ', subscription);
  };
  const screen = useWidth();
  return (
    <Slider open={screen !== 'xs' ? true : props.open} pcPage={screen !== 'xs'}>
      <Hidden smDown>
        <Nav />
      </Hidden>
      <Grid container className={classes.inputs}>
        <Formik
          initialValues={{
            title: '',
            desc: ''
          }}
          validate={values => {
            const errors = {};
            if (!values.title) {
              errors.title = '标题不能为空';
            }
            return errors;
          }}
          onSubmit={release}
        >
          {({ submitForm, isSubmitting, values }) => (
            <>
              <Hidden smUp>
                <BackHeader
                  title="发布视频"
                  back={props.onClose}
                  homeComponent={() => (
                    <IconButton
                      className={classes.release}
                      onClick={submitForm}
                    >
                      发布
                    </IconButton>
                  )}
                />
              </Hidden>

              <Form className={classes.form}>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  spacing={1}
                  className={classes.inputWrap}
                >
                  <Hidden xsDown>
                    <Grid item xs={11}>
                      <Typography variant="body1" style={{ fontWeight: 700 }}>
                        上传视频
                      </Typography>
                    </Grid>
                  </Hidden>
                  <Grid item xs={11}>
                    <span
                      style={{
                        lineHeight: '40px',
                        fontSize: 14,
                        color: '#888'
                      }}
                    >
                      温馨提示：选择2:1的图片作为封面最合适噢
                    </span>
                  </Grid>

                  {imgUrl && (
                    <Grid item xs={11}>
                      <img className={classes.img} src={imgUrl} alt="封面" />
                    </Grid>
                  )}
                  <Grid item xs={11}>
                    <Grid container>
                      <span className={classes.label}>选择封面：</span>
                      <div>
                        <ImagePicker
                          className={classes.input}
                          id="poster"
                          onPick={(canvas, data, file) => {
                            uploadPoster(canvas, data, file);
                          }}
                        />
                        <label htmlFor="poster">
                          <Button
                            variant="contained"
                            color="primary"
                            component="span"
                          >
                            Upload
                          </Button>
                        </label>
                      </div>
                      <span
                        className={classes.label}
                        style={{
                          paddingLeft: 15,
                          color: '#ccc'
                        }}
                      >
                        {imgState}
                      </span>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}></Grid>

                  <Grid item xs={11}>
                    <Grid container>
                      <span className={classes.label}>视频分类：</span>
                      <Se
                        style={{ width: '28%', marginRight: 8 }}
                        value={topCateIdx}
                        onChange={e => setTopCateIdx(e.target.value)}
                        id="grouped-select"
                      >
                        {categoryData.map((item, idx) => (
                          <MenuItem key={item.id} value={idx}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Se>
                      {categoryData[topCateIdx] && (
                        <>
                          <Se
                            style={{ width: '28%', marginRight: 8 }}
                            value={subCateIdx}
                            onChange={e => {
                              let idx = e.target.value;
                              setSubCateIdx(idx);
                              setCurrSelect(
                                categoryData[topCateIdx].sub_categories[idx]
                              );
                            }}
                            id="grouped-select-1"
                          >
                            {categoryData[topCateIdx].sub_categories.map(
                              (item, idx) => (
                                <MenuItem key={item.id} value={idx}>
                                  {item.name}
                                </MenuItem>
                              )
                            )}
                          </Se>
                          <Se
                            style={{ width: '28%', marginRight: 8 }}
                            value={endCateIdx}
                            onChange={e => {
                              let idx = e.target.value;
                              setEndCateIdx(idx);
                              if (idx === '') {
                                //恢复到2级
                                return setCurrSelect(
                                  categoryData[topCateIdx].sub_categories[
                                    subCateIdx
                                  ]
                                );
                              }
                              setCurrSelect(
                                categoryData[topCateIdx].sub_categories[
                                  subCateIdx
                                ].sub_categories[idx]
                              );
                            }}
                            id="grouped-select-2"
                          >
                            <MenuItem value="">None</MenuItem>

                            {categoryData[topCateIdx].sub_categories[
                              subCateIdx
                            ] &&
                              categoryData[topCateIdx].sub_categories[
                                subCateIdx
                              ].sub_categories.map((item, idx) => (
                                <MenuItem key={item.sub_id} value={idx}>
                                  {item.name}
                                </MenuItem>
                              ))}
                          </Se>
                        </>
                      )}
                    </Grid>
                  </Grid>
                  <Grid item xs={11}>
                    <Grid container>
                      <span className={classes.label}>视频标题：</span>
                      <Field
                        component={TextField}
                        name="title"
                        style={{ width: '93%', marginLeft: 8 }}
                        inputProps={{
                          id: 'title'
                        }}
                      ></Field>
                    </Grid>
                  </Grid>

                  <Grid item xs={11}>
                    <Grid container>
                      <span className={classes.label}>视频介绍：</span>
                      <Field
                        component={TextField}
                        name="desc"
                        multiline={true}
                        style={{ width: '93%', marginLeft: 8 }}
                        inputProps={{
                          id: 'desc'
                        }}
                      ></Field>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={11}
                    style={{
                      marginTop: 8,
                      pointerEvents: !isComplete ? 'none' : null
                    }}
                  >
                    <Grid container>
                      <span className={classes.label}>视频上传:</span>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={selectVideo}
                        id="video_upload_d"
                        className={classes.input}
                      />

                      <label htmlFor="video_upload_d">
                        <Button
                          variant="contained"
                          className={classes.button}
                          component="span"
                          color="primary"
                          disabled={!isComplete}
                          startIcon={<CloudUpload />}
                        >
                          Upload
                        </Button>
                      </label>
                      {Number(progress) > 0 && (
                        <>
                          <Typography
                            variant="body2"
                            align="center"
                            color="textSecondary"
                            style={{ display: 'flex', alignItems: 'center' }}
                          >
                            {Number(progress) < 100
                              ? progress + '%'
                              : '恭喜你上传成功!'}
                          </Typography>
                          <ProgressUI progress={progress}>
                            <div className="child"></div>
                          </ProgressUI>
                        </>
                      )}
                    </Grid>
                  </Grid>

                  {videoUrl && isComplete && (
                    <Grid item xs={11}>
                      <Card>
                        <CardMedia
                          className={classes.video}
                          src={videoUrl}
                          title="Live from space album cover"
                          component="video"
                          controls="controls"
                          preload="true"
                          playsInline={true}
                          x5-video-player-type="h5-page"
                          webkit-playsinline="true"
                        />
                      </Card>
                    </Grid>
                  )}
                  {/* {isSubmitting && <LinearProgress />} */}

                  <Hidden xsDown>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={submitForm}
                        style={{ height: 36, padding: '0 40px', marginTop: 30 }}
                      >
                        发布
                      </Button>
                    </Grid>
                  </Hidden>
                </Grid>
              </Form>
            </>
          )}
        </Formik>
      </Grid>
    </Slider>
  );
}

export default Editor;
Editor.defaultProps = {
  content: ''
};
