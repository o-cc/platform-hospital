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
const useStyles = makeStyles(t => ({
  editor: {
    height: 'calc(80vh - 49px)'
  },
  release: {
    fontSize: 14,
    color: '#666'
  },
  form: {
    width: '100%'
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
  img: {
    maxWidth: '100%',
    height: 'auto'
  }
}));

const toolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  ['image'],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
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

  useEffect(() => {
    if (!props.open) return;

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
  }, [props.open, props.content]);

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
  const imgPick = async (canvas, data, file) => {
    let result = await uploadImg(file);
    const range = quillRef.current.getSelection();
    quillRef.current.insertEmbed(range.index, 'image', result.image_url);
  };

  const release = useRunning(async values => {
    const quill = quillRef.current;
    let inner = quill.container.firstChild.innerHTML;
    if (!currSelectCate.id && !currSelectCate.sub_id)
      return setError('请选择文章分类', 'warning');
    if (!posterName) return setError('请先上传文章封面', 'warning');
    if (/<p><br><\/p>/.test(inner))
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
    let result = await uploadImg(file);
    setPosterName(result.image_name);
    setImgUrl(result.image_url);
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
                title="写文章"
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
                    <Grid
                      item
                      xs={11}
                      style={{ height: '25vh', overflow: 'auto' }}
                    >
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
                            color: '#888'
                          }}
                        >
                          {imgUrl && '上传成功'}
                        </span>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container alignItems="center">
                      <Grid item xs={2}>
                        <InputLabel
                          htmlFor="category"
                          style={{ fontSize: 12, whiteSpace: 'nowrap' }}
                        >
                          文章分类：
                        </InputLabel>
                      </Grid>
                      <Grid item xs={10}>
                        <Grid container justify="flex-start">
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
                </Grid>
              </Form>
            </>
          )}
        </Formik>
      </Grid>
      <Grid
        container
        direction="column"
        wrap="nowrap"
        className={classes.editor}
      >
        <Typography variant="body2" color="textSecondary">
          文章内容：
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
    </Slider>
  );
}

export default Editor;
Editor.defaultProps = {
  content: ''
};
