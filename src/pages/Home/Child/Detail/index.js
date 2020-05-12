import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles, styled } from '@material-ui/core/styles';
import { vw } from '@/utils';

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
          作为今年最重要的Windows
          10更新，v2004还是很受用户关注的，当然它也是值得升级的。
          现在，外媒就提前给出了Win10
          v2004上改进的一些细节，其中系统对游戏性能上加强了不少，Windows显示驱动程序模型（WDDM）2.7，让多显示器设置提高刷新率，并且两个显示器之间的窗口移动似乎不会引起任何卡顿现象。
          此外，WDDM更新还增加了对硬件加速GPU调度的支持，并允许GPU显卡正确管理其视频内存，这也让视频播放更加流畅。
          Windows 10版本2004还增加了对DirectX Raytracing
          1.1的支持，其中包括新技术，包括线上光线追踪和间接射线执行。在1.1版中，光线追踪执行是在运行时确定的，并且它们不是预先定义的。
          如果你的电脑配备了HDD机械式硬盘，那么Windows 10
          5月2020更新实际上感觉会更快。
          对于SSD来说，你不太可能注意到任何明显的改进，因为你在它上加载的任何东西都已经可以更快地执行操作。固态硬盘的好处是，与HDD相比，它的等待时间已经大大减少。然而，在某些情况下，即使使用SSD固态硬盘，索引的工作仍然会影响到你的电脑性能，并占用CPU和磁盘资源。
          当你在传输文件、删除文件，以及你的SSD或HDD磁盘正在积极使用时，Windows
          10 2004版也会节流或完全停止任何索引活动。而Windows
          Search节流索引活动的能力，将避免在SSD和HDD上出现这样的减速现象。
          微软还在Windows
          Search上改进逻辑工作，这样它可以智能地判断何时对你的文件进行索引，提高系统的整体性能。
        </Grid>
      </Grid>
    </>
  );
};
