import React, { useRef, useEffect, useCallback, useState } from 'react';
import Slider from 'pages/components/Slider';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import {
  makeStyles,
  IconButton,
  Grid,
  InputLabel,
  Button,
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
import useWidth from '@/hooks/useWidth';
import Nav from '@/pages/components/Header/Nav';

const useStyles = makeStyles(t => ({
  editor: {
    height: 'calc(70vh - 49px)',
    width: '100%',
    maxWidth: '800px',
    margin: 'auto',
    paddingTop: 16,
    background: '#fff',
    marginBottom: 68,
    '& .ql-container': {
      height: '92%'
    },
    '& .ql-snow .ql-editor img': {
      maxWidth: '50%'
    }
  },
  release: {
    fontSize: 14,
    color: '#666'
  },
  form: {
    width: '100%',
    maxWidth: '800px',
    margin: 'auto',
    background: '#fff'
  },
  inputs: {
    margin: t.spacing(0, 0, 0, 0),
    padding: t.spacing(1)
  },
  input: {
    display: 'none'
  },
  inputWrap: {
    marginTop: t.spacing(1),
    fontSize: 18,
    padding: `30px`
  },
  img: {
    maxWidth: '350px',
    height: 'auto'
  },
  pcBtn: {
    position: 'fixed',
    bottom: '3%',
    right: 0,
    left: 0,
    margin: 'auto',
    textAlign: 'center',
    height: 48,
    zIndex: 9999
  }
}));

const toolbarOptions = [
  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ align: [] }],
  ['image'],
  ['clean']
];

function Editor(props) {
  const textRef = useRef();
  const quillRef = useRef(null);
  const classes = useStyles();
  const { setError } = AppCont.useContainer();
  const [posterName, setPosterName] = useState('');
  const [categoryData, setCategoryData] = useState([]);
  const [topCateIdx, setTopCateIdx] = useState('');
  const [subCateIdx, setSubCateIdx] = useState('');
  const [endCateIdx, setEndCateIdx] = useState('');
  const [currSelectCate, setCurrSelect] = useState({});
  // const [selectImgName, setImgName] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const screen = useWidth();
  const [imgState, setImgState] = useState('请选择封面图片');
  useEffect(() => {
    if (!props.open && screen === 'xs') return;
    setTimeout(() => {
      quillRef.current = new Quill(textRef.current, {
        modules: {
          toolbar: toolbarOptions
        },
        placeholder: '说点什么吧...',
        theme: 'snow'
      });
      quillRef.current.setContents(props.content);
      let toolbar = quillRef.current.getModule('toolbar');
      toolbar.addHandler('image', () => {
        document.getElementById('contained-button-file').click();
      });
    }, 10);
    return () => {
      quillRef.current = null;
    };
  }, [props.open, props.content, screen]);

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

  const [contentImgState, setContentImgState] = useState('');
  const imgPick = async (canvas, data, file) => {
    setContentImgState('图片上传中...');
    let result = await uploadImg(file);
    if (!result) return setContentImgState('上传失败, 请重试!');
    const range = quillRef.current.getSelection();
    quillRef.current.insertEmbed(range.index, 'image', result.image_url);
    setContentImgState('');
  };

  const release = useRunning(async values => {
    const quill = quillRef.current;
    let inner = quill.container.firstChild.innerHTML;
    if (!currSelectCate.id && !currSelectCate.sub_id)
      return setError('请选择文章分类', 'warning');
    if (!posterName) return setError('请先上传文章封面', 'warning');
    if (/^<p><br><\/p>$/.test(inner))
      return setError('文本内容不能为空', 'warning');
    if (topCateIdx === '' || subCateIdx === '')
      return setError('文章分类要求选择二级以上', 'warning');

    let { error } = await requestApi('postNews', {
      category: currSelectCate.id || currSelectCate.sub_id,
      title: values.title,
      index_image_name: posterName,
      content: inner,
      digest: values.desc
    });
    if (error) return setError(error);
    setError('操作成功', 'success');

    props.onClose && props.onClose();
  });

  const uploadPoster = async (canvas, data, file) => {
    setImgState('图片上传中...');
    let result = await uploadImg(file);
    if (!result) return setImgState('上传失败, 请重试!');
    setImgState('完成上传');
    setPosterName(result.image_name);
    setImgUrl(result.image_url);
  };

  return (
    <Slider open={screen !== 'xs' ? true : props.open} pcPage={screen !== 'xs'}>
      <Hidden xsDown>
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
                  title="写文章"
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
                  style={{ padding: screen === 'xs' ? 0 : undefined }}
                >
                  <Hidden xsDown>
                    <Grid item xs={12}>
                      <Typography variant="body1" style={{ fontWeight: 700 }}>
                        写文章
                      </Typography>
                    </Grid>
                  </Hidden>
                  <Grid item xs={12}>
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

                  <Grid item xs={12}>
                    <Grid container alignItems="center">
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
                      <Grid item>
                        <span
                          style={{
                            lineHeight: '40px',
                            fontSize: 15,
                            paddingLeft: 15,
                            color: '#ccc'
                          }}
                        >
                          {imgState}
                        </span>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container alignItems="center">
                      <Grid item>
                        <InputLabel
                          htmlFor="category"
                          style={{ fontSize: 14, whiteSpace: 'nowrap' }}
                        >
                          文章分类：
                        </InputLabel>
                      </Grid>
                      <Grid style={{ flex: 1 }} container justify="flex-start">
                        <Se
                          style={{ width: '28%', marginLeft: 8 }}
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
                              style={{ width: '28%', marginLeft: 8 }}
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
                              style={{ width: '28%', marginLeft: 8 }}
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
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container alignItems="center">
                      <Grid item>
                        <InputLabel htmlFor="title" style={{ fontSize: 14 }}>
                          文章标题：
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
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container alignItems="center">
                      <Grid item>
                        <InputLabel htmlFor="desc" style={{ fontSize: 14 }}>
                          文章摘要：
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
                    </Grid>
                  </Grid>
                  {/* {isSubmitting && <LinearProgress />} */}

                  <Grid
                    container
                    direction="column"
                    wrap="nowrap"
                    className={classes.editor}
                    style={{ padding: screen === 'xs' ? '8px' : undefined }}
                  >
                    <Typography variant="body2" color="textSecondary">
                      文章内容：{' '}
                      <span
                        style={{
                          lineHeight: '40px',
                          fontSize: 15,
                          paddingLeft: 15,
                          color: '#ccc'
                        }}
                      >
                        {contentImgState}
                      </span>
                    </Typography>
                    <div ref={textRef}></div>
                    <Grid item>
                      <ImagePicker
                        style={{ opacity: 0 }}
                        id="contained-button-file"
                        onPick={imgPick}
                      />
                    </Grid>
                  </Grid>

                  <Hidden xsDown>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={submitForm}
                        style={{ height: 36, padding: '0 30px' }}
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
