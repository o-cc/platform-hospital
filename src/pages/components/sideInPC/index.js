import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from '@material-ui/core';
import Recommend from 'pages/Home/Child/Recommend';
import AppCont from 'container';
import { useState } from 'react';
import { requestApi, formatArray2Obj } from '@/utils';

const useStyles = makeStyles({
  root: {
    flex: '1 1',
    fontSize: '14px',
    paddingLeft: 8
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  card: {
    marginBottom: 8,
    marginLeft: -8,
    boxShadow: '0 2px 12px 0 rgba(0,0,0,.1)'
  }
});

export default function OutlinedCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const preventDefault = event => event.preventDefault();
  const { state } = AppCont.useContainer();
  const [homeData, setHomeData] = useState({ contents: [] });

  useEffect(() => {
    const list = state.homeData;
    if (!list) {
      getIndexData();
    } else {
      setHomeData(list);
    }

    async function getIndexData() {
      let { result, error } = await requestApi('getHomeData');

      if (error) {
        return;
      }
      setHomeData(result);
    }
  }, [state.homeData]);

  const { contents: commendList = [] } =
    formatArray2Obj(homeData.contents)['index-list'] || {};

  return (
    <div className={classes.root}>
      {props.children && (
        <Card className={classes.card}>
          <CardContent>{props.children}</CardContent>
          <CardActions>
            {/* <Button size="small">查看更多</Button> */}
          </CardActions>
        </Card>
      )}
      {commendList.length > 0 && (
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="subtitle1">热门推荐</Typography>
            <Recommend list={commendList} />
          </CardContent>
          <CardActions>
            {/* <Button size="small">查看更多</Button> */}
          </CardActions>
        </Card>
      )}
      {/* <Card  className={classes.card}>
        <CardContent></CardContent>
      </Card> */}
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        © 2020 会务平台{bull}All Rights Reserved
        <br />
        {bull}粤ICP备 xxx号-1 {bull}粤公网安备 xxxx号
      </Typography>
      {/* <Typography variant="h5" component="h2"></Typography> */}
      <Typography className={classes.pos} color="textSecondary"></Typography>
      <Typography
        variant="body2"
        component="p"
        color="textSecondary"
      ></Typography>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        {bull}
        <Link href="https://www.12377.cn/" onClick={preventDefault}>
          网上有害信息举报专区
        </Link>
        <br />
        {bull}
        联系我们: 020-123456
      </Typography>
    </div>
  );
}
