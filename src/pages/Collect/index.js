import React, { useEffect, useState } from 'react';
import {
  Grid,
  Paper,
  makeStyles,
  Typography,
  Divider,
  FormControlLabel,
  Button
} from '@material-ui/core';
import { requestApi, getObjKey } from '@/utils';
import { useParams } from 'react-router-dom';
import container from '@/container';
import { Formik, Form, Field } from 'formik';
import { TextField, CheckboxWithLabel, RadioGroup } from 'formik-material-ui';
import StyledRadio from './Child/styleRadio';
import useRunning from '@/hooks/useRunning';
import Dialog from '@/pages/components/Dialog';
const useStyles = makeStyles(theme => ({
  root: {
    overflow: 'auto',
    padding: theme.spacing(0, 1),
    height: '100%'
  },
  title: {
    color: '#11a8cd',
    fontSize: 18,
    fontWeight: 600,
    textAlign: 'center',
    whiteSpace: 'nowrap'
  },
  subtitle: {
    paddingBottom: theme.spacing(3)
  },
  question: {
    fontSize: '14px',
    fontWeight: 'bold',
    display: 'flex'
  },
  score: {
    color: 'red',
    paddingLeft: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  formWrap: {
    marginBottom: theme.spacing(3)
  }
}));

function Write({ item, answer = {} }) {
  return (
    <>
      <Field
        variant="outlined"
        required
        size="small"
        name={item.qid.toString()}
        fullWidth
        disabled={!!answer.standard_write}
        component={TextField}
      ></Field>

      {answer.standard_write && (
        <Typography
          variant="body2"
          color="error"
          style={{ marginTop: 10, marginLeft: 15 }}
        >
          正确答案：{answer.standard_write}
        </Typography>
      )}
    </>
  );
}

function Single({ item, isSubmitting, answer = {} }) {
  const showAnswer =
    answer.standard_choices && answer.standard_choices.length > 0;
  return (
    <div style={{ width: '90%', margin: 'auto' }}>
      <Field component={RadioGroup} name={item.qid.toString()}>
        {item.answers.map((op, idx) => (
          <FormControlLabel
            key={idx}
            value={`${getObjKey(op, 0)}`}
            control={<StyledRadio disabled={!!showAnswer} />}
            label={`${getObjKey(op, 0)}. ${op[getObjKey(op, 0)]}`}
            disabled={!!showAnswer}
          />
        ))}
      </Field>
      {showAnswer && (
        <Typography variant="body2" color="error" style={{ marginTop: 10 }}>
          正确答案：{answer.standard_choices.join('、')}
        </Typography>
      )}
    </div>
  );
}
function Multiple({ item, answer = {} }) {
  const showAnswer =
    answer.standard_choices && answer.standard_choices.length > 0;
  return (
    <div
      style={{
        width: '90%',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {item.answers.map((op, idx) => (
        <Field
          key={idx}
          type="checkbox"
          value={`${getObjKey(op, 0)}`}
          component={CheckboxWithLabel}
          color="primary"
          disabled={!!showAnswer}
          name={`${item.qid}_${idx}`}
          Label={{ label: `${getObjKey(op, 0)}. ${op[getObjKey(op, 0)]}` }}
        />
      ))}

      {showAnswer && (
        <Typography variant="body2" color="error" style={{ marginTop: 10 }}>
          正确答案：{answer.standard_choices.join('、')}
        </Typography>
      )}
    </div>
  );
}

const typeMap = {
  w: 'write',
  s_c: 'single_choice',
  m_c: 'multiple_choice'
};
export default () => {
  const classes = useStyles();
  const { id } = useParams();
  const { setError } = container.useContainer();
  const [questions, setQuestions] = useState({});
  const [initVal, setInitVal] = useState({});
  const [answers, setAnswers] = useState({});
  const [dialog, setDialog] = useState(false);
  useEffect(() => {
    async function getTest() {
      let { result, error } = await requestApi('getTest', { id });
      if (error) {
        return setError(error);
      }
      setQuestions(result);
      console.log(result.questions);
      const initialValues = result.questions.reduce((prev, next) => {
        let key = next.qid;
        if (next.type !== typeMap.m_c) {
          prev[key] = '';
        }
        return prev;
      }, {});
      setInitVal(initialValues);
    }
    getTest();
  }, [id, setError]);
  const getQuestion = qid => {
    const lists = questions.questions || [];
    for (let i = 0; i <= lists.length - 1; i++) {
      // eslint-disable-next-line eqeqeq
      if (lists[i].qid == qid) {
        return lists[i];
      }
    }
  };

  const onSubmit = useRunning(async values => {
    let finalVal = getObjKey(values).reduce((prev, next) => {
      if (/_/.test(next)) {
        let first = next.split('_')[0];
        let final = Array.isArray(prev[first]) ? prev[first] : [];
        prev[first] = final.concat(values[next]);
      } else {
        prev[next] = values[next];
      }
      return prev;
    }, {});

    let finalArr = getObjKey(finalVal);
    for (let i = 0; i < finalArr.length; i++) {
      let item = finalArr[i];
      if (typeof finalVal[item] !== 'object' && !finalVal[item]) {
        return setError('请先回答问题再提交~', 'warning', 2000);
      }

      if (typeof finalVal[item] === 'object') {
        if (finalVal.length <= 0) {
          return setError('请先回答问题再提交~', 'warning', 2000);
        }
        for (let j = 0; j < finalVal[item].length; j++) {
          if (!finalVal[item][j]) {
            return setError('请先回答问题再提交~', 'warning', 2000);
          }
        }
      }
    }

    let data = finalArr.map(key => {
      let obj = {
        qid: key
      };
      // console.log(key);
      let question = getQuestion(key);
      // console.log(question);
      if (question.type !== typeMap.w) {
        obj.answers = question.answers;
        obj.choices = finalVal[key];
      } else {
        obj.write = finalVal[key];
      }
      return obj;
    });
    let { result, error } = await requestApi('postTestAnswers', {
      questions: data
    });

    if (error) {
      return setError(error);
    }
    //显示正确答案
    let finalRes = result.questions.reduce((prev, next) => {
      prev[next.qid] = next;
      prev.total = (prev.total >> 0) + next.integral;
      return prev;
    }, {});

    setAnswers(finalRes);
    if (finalRes.total > 0) {
      setDialog(true);
    }
  });
  const { desc, name, questions: lists = [] } = questions;
  return (
    <Paper className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={12} md={6}>
          <p className={classes.title}>{name}</p>
          <Typography variant="body2" className={classes.subtitle}>
            {desc}
          </Typography>
          <Divider />
          <br />
          {answers.total && (
            <Typography>
              恭喜你完成本次答题，得到
              <span style={{ color: 'red' }}>{answers.total}</span>积分~
            </Typography>
          )}

          <br />
          {getObjKey(initVal).length > 0 && (
            <Formik
              initialValues={initVal}
              validate={values => {
                const errors = {};
                return errors;
              }}
              onSubmit={onSubmit}
            >
              {({ submitForm, isSubmitting, values }) => (
                <Form>
                  {lists.map(item => (
                    <div key={item.qid} className={classes.formWrap}>
                      <p className={classes.question}>
                        <span>
                          {item.content}
                          {item.type === typeMap.m_c && '(多选)'}
                        </span>
                        {answers[item.qid] &&
                          answers[item.qid].integral > 0 && (
                            <span className={classes.score}>
                              +{answers[item.qid] && answers[item.qid].integral}
                            </span>
                          )}
                      </p>

                      {item.type === typeMap.w && (
                        <Write item={item} answer={answers[item.qid]} />
                      )}

                      {item.type === typeMap.s_c && (
                        <Single
                          item={item}
                          isSubmitting={isSubmitting}
                          answer={answers[item.qid]}
                        />
                      )}

                      {item.type === typeMap.m_c && (
                        <Multiple item={item} answer={answers[item.qid]} />
                      )}
                    </div>
                  ))}
                  {getObjKey(answers).length <= 0 && (
                    <Grid
                      container
                      justify="center"
                      style={{ margin: `20px 0` }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        onClick={submitForm}
                      >
                        提交
                      </Button>
                    </Grid>
                  )}
                </Form>
              )}
            </Formik>
          )}
        </Grid>
      </Grid>

      <Dialog
        open={dialog}
        title=" "
        isCancel={true}
        text={`恭喜本次答题获得了${answers.total >> 0}积分`}
        handleOk={() => setDialog(false)}
      ></Dialog>
    </Paper>
  );
};
