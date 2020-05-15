import { format } from 'date-fns';

export const comment_list = [
  {
    id: 0,
    avatar: '',
    user_name: '清蒸罗非鱼',
    is_like: false,
    like_num: 0,
    reply: 0,
    comment_info:
      '作为今年最重要的Windows10更新，v2004还是很受用户关注的，当然它也是值得升级的',
    date: format(new Date(), 'MM-dd HH:mm')
  },
  {
    id: 1,
    avatar: '',
    user_name: '清蒸罗非鱼',
    is_like: false,
    reply: 2,
    like_num: 0,
    comment_info:
      '作为今年最重要的Windows10更新，v2004还是很受用户关注的，当然它也是值得升级的',
    date: format(new Date(), 'MM-dd HH:mm')
  }
];

export const comment_list_detail = [
  {
    id: 0,
    avatar: '',
    user_name: '清蒸罗非鱼',
    is_like: false,
    like_num: 0,
    comment_info:
      '作为今年最重要的Windows10更新，v2004还是很受用户关注的，当然它也是值得升级的',
    date: format(new Date(), 'MM-dd HH:mm')
  },
  {
    id: 1,
    avatar: '',
    user_name: '胖虎嘻嘻',
    is_like: false,
    like_num: 0,
    comment_info:
      '你多大了？ //@清蒸罗非鱼：作为今年最重要的Windows10更新，v2004还是很受用户关注的，当然它也是值得升级的',
    date: format(new Date(), 'MM-dd HH:mm')
  }
];
