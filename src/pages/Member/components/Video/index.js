import React, { useEffect, useCallback, useState } from 'react';
import Slider from 'pages/components/Slider';
import {
  makeStyles,
  IconButton,
  Grid,
  InputLabel,
  Button,
  Card,
  CardMedia,
  styled,
  Typography
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

const useStyles = makeStyles(t => ({
  editor: {
    height: 'calc(80vh - 49px)'
  },
  release: {
    fontSize: 14,
    color: '#666'
  },
  form: {
    width: '95%'
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
    maxWidth: '100%',
    height: 'auto'
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
    background: '#f1393a'
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
    let result = await uploadImg(file);
    if (!result) return;
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

  return (
    <Slider open={props.open}>
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
              <BackHeader
                title="发布视频"
                back={props.onClose}
                homeComponent={() => (
                  <IconButton className={classes.release} onClick={submitForm}>
                    发布
                  </IconButton>
                )}
              />
              <Form className={classes.form}>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  spacing={1}
                  className={classes.inputWrap}
                >
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
                    <Grid
                      item
                      xs={11}
                      style={{ height: '25vh', overflow: 'auto' }}
                    >
                      <img className={classes.img} src={imgUrl} alt="封面" />
                    </Grid>
                  )}

                  <Grid item style={{ lineHeight: '40px' }}>
                    <InputLabel htmlFor="file" style={{ fontSize: 14 }}>
                      选择封面：
                    </InputLabel>
                  </Grid>
                  <Grid item>
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
                  </Grid>
                  <Grid item xs={6}>
                    <span
                      style={{
                        lineHeight: '40px',
                        fontSize: 15,
                        paddingLeft: 15,
                        color: '#888'
                      }}
                    >
                      {imgUrl && '上传成功'}
                    </span>
                  </Grid>

                  <Grid item>
                    <InputLabel htmlFor="category" style={{ fontSize: 14 }}>
                      视频分类：
                    </InputLabel>
                  </Grid>
                  <Grid item xs={9}>
                    <Se
                      style={{ width: '30%', marginRight: 8 }}
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
                          style={{ width: '30%', marginRight: 8 }}
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
                          style={{ width: '30%', marginRight: 8 }}
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

                  <Grid item>
                    <InputLabel htmlFor="title" style={{ fontSize: 14 }}>
                      视频标题：
                    </InputLabel>
                  </Grid>
                  <Grid item xs={9}>
                    <Field
                      component={TextField}
                      name="title"
                      style={{ width: '93%', marginLeft: 8 }}
                      inputProps={{
                        id: 'title'
                      }}
                    ></Field>
                  </Grid>

                  <Grid item>
                    <InputLabel htmlFor="desc" style={{ fontSize: 14 }}>
                      视频介绍：
                    </InputLabel>
                  </Grid>

                  <Grid item xs={9}>
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

                  <Grid item style={{ marginTop: 8 }}>
                    <InputLabel htmlFor="video_upload" style={{ fontSize: 14 }}>
                      视频上传:
                    </InputLabel>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    style={{
                      marginTop: 8,
                      pointerEvents: !isComplete ? 'none' : null
                    }}
                  >
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
                  </Grid>
                  <Grid item xs={5}>
                    {Number(progress) > 0 && (
                      <>
                        <Typography
                          variant="body2"
                          align="center"
                          color="textSecondary"
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
                  {videoUrl && isComplete && (
                    <Grid item xs={11}>
                      <Card className={classes.root}>
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
