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
import { formatArray2Obj } from '@/utils';
import VideocamRoundedIcon from '@material-ui/icons/VideocamRounded';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withRouter } from 'react-router-dom';
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
  },
  icons: {
    padding: '0px 16px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    '& .item': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 14,
      cursor: 'pointer',
      '& .icon': {
        fontSize: 16,
        color: '#ff9900',
        padding: 10,
        marginBottom: 8,
        background: 'rgba(255, 150, 7, 0.1)',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }
    }
  }
});

function OutlinedCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const preventDefault = event => event.preventDefault();
  const { state } = AppCont.useContainer();
  const [homeData, setHomeData] = useState({ contents: [] });

  useEffect(() => {
    const list = state.homeData;
    if (list) {
      setHomeData(list);
    }

  }, [state.homeData]);

  const { contents: commendList = [] } =
    formatArray2Obj(homeData.contents)['index-list'] || {};

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <div className={classes.icons}>
            <div
              className="item"
              onClick={() => {
                let url = `${window.location.origin}${window.location.pathname}#/upload-video`;
                window.open(url, '_blank');
              }}
            >
              <div className="icon">
                <VideocamRoundedIcon style={{ fontSize: 28 }} />
              </div>
              发视频
            </div>
            <div
              className="item"
              onClick={() => {
                let url = `${window.location.origin}${window.location.pathname}#/write`;
                window.open(url, '_blank');
              }}
            >
              <div className="icon" style={{ color: 'rgb(244, 200, 7)' }}>
                <BorderColorIcon style={{ fontSize: 28 }} />
              </div>
              写文章
            </div>
          </div>
        </CardContent>
        <CardActions>
          {/* <Button size="small">查看更多</Button> */}
        </CardActions>
      </Card>
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
            <Typography variant="subtitle2" color="textSecondary">
              热门推荐
            </Typography>
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

export default withRouter(OutlinedCard);
