import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles, styled } from '@material-ui/core/styles';
import { vw } from '@/utils';
import { test_html } from 'configs/test_detail_html';
const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(8),
    fontFamily: 'Microsoft Yahei',
    fontSize: vw(30),
    color: '#000000',
    paddingBottom: '10px'
  },
  date: {
    alignSelf: 'flex-start',
    fontSize: vw(20),
    textAlign: 'left',
    marginLeft: theme.spacing(2.5),
    margin: theme.spacing(-1)
  }
}));

const Img = styled(({ ...other }) => (
  <img
    src="https://s1.51cto.com/oss/202005/12/717c1a0270c188b7fba818cbc57c227c.jpeg"
    alt="图片"
    {...other}
  />
))({
  width: '100%',
  height: 'auto'
});

export default () => {
  const classes = useStyles();
  return (
    <>
      <Grid
        container
        spacing={3}
        className={classes.root}
        justify="center"
        direction="column"
        alignItems="center"
      >
        <Grid item xs={11}>
          微软改进Windows 10 v2004细节：整体游戏性能加强 支持光线追踪1.1
        </Grid>
        <Grid item className={classes.date}>
          2020年05月20日
        </Grid>

        <Grid item xs={11}>
          <Img />
        </Grid>

        <Grid item xs={11}>
          <div dangerouslySetInnerHTML={{ __html: test_html }}></div>
        </Grid>
      </Grid>
    </>
  );
};
