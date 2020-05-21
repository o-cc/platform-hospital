import React, { useState } from 'react';
import { makeStyles, styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { flexAll } from '@/golbalStyles';
import { Grid, CardMedia, IconButton } from '@material-ui/core';
import BackHeader from '../components/BackHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import { vw } from '@/utils';
import { ArrowDownward } from '@material-ui/icons';
const useStyles = makeStyles(theme => ({
  root: {
    ...flexAll,
    flexDirection: 'column'
  },
  card: {
    width: '46%',
    marginLeft: '3%',
    float: 'left',
    marginBottom: '3%'
  },
  media: {
    height: 140
  },
  warp: {
    width: '100%',
    marginTop: theme.spacing(2),
    flex: 1
  },
  smallTxt: {
    fontSize: vw(25)
  },
  large: {
    fontSize: vw(35),
    paddingRight: vw(10)
  },
  iconBtn: {
    alignSelf: 'flex-end',
    transition: 'all 2s'
  }
}));

const booksList = [
  {
    id: 0,
    img: require('assets/imgs/test_books.jpg'),
    title: '隆江猪脚焖鸡',
    score: 190,
    price: 199
  },
  {
    id: 1,
    img: require('assets/imgs/test_books.jpg'),
    title: '隆江猪脚焖鸡',
    score: 190,
    price: 199
  },
  {
    id: 2,
    img: require('assets/imgs/test_books.jpg'),
    title: '隆江猪脚焖鸡',
    score: 190,
    price: 199
  },
  {
    id: 3,
    img: require('assets/imgs/test_books.jpg'),
    title: '隆江猪脚焖鸡',
    score: 190,
    price: 199
  },
  {
    id: 4,
    img: require('assets/imgs/test_books.jpg'),
    title: '隆江猪脚焖鸡',
    score: 190,
    price: 199
  }
];

const Arrow = styled(({ sort, ...other }) => (
  <ArrowDownward {...other} fontSize="inherit" />
))(({ theme, sort }) => {
  let angle;
  if (sort) {
    angle = 180;
  } else {
    angle = 0;
  }
  return {
    transition: 'transform 0.5s',
    transform: `rotate(${angle}deg)`
  };
});

export default function SimpleCard() {
  const classes = useStyles();
  const [sort, setSort] = useState(false);

  const sortList = () => {};

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <BackHeader title="积分商城" />
      <IconButton
        aria-label="delete"
        className={classes.iconBtn}
        onClick={() => {
          setSort(sort => !sort);
        }}
      >
        <Arrow sort={sort} onClick={sortList} />
      </IconButton>
      <div className={classes.warp}>
        <div style={{ maxHeight: '91vh', overflow: 'auto' }}>
          {booksList.map(item => (
            <Card key={item.id} className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={item.img}
                  title={item.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="subtitle1" component="h2">
                    {item.title}
                  </Typography>

                  <Typography component="span" color="secondary">
                    <span className={classes.large}>{item.score}</span>
                    <span className={classes.smallTxt}>积分</span>
                  </Typography>
                  <Typography
                    component="p"
                    variant="subtitle2"
                    color="textSecondary"
                  >
                    <span>市场价：</span>
                    {item.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </div>
    </Grid>
  );
}
