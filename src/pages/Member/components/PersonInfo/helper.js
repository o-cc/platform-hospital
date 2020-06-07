import { defaultAvatar } from 'configs';
import { format } from 'date-fns';

export const infoList = {
  avatar: '更换头像',
  username: '更换昵称',
  company: '单位名称',
  departments: '所属部门',
  job: '我的职位',
  area: '更改区域',
  addr: '详细地址',
  pwd: '修改密码',
  intro: '编辑个人简介'
};
export const info = {
  avatar: defaultAvatar,
  username: '',
  birthday: format(new Date(), 'yyyy-MM-dd'),
  intro: '',
  addr: '',
  area: '',
  pwd: '',
  company: '',
  departments: '',
  job: ''
};
