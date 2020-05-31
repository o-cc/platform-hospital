export default {
  'onGet:/index/': {
    contents: [
      {
        id: 1,
        name: '轮播图',
        key: 'index-banner',
        contents: [
          {
            content_id: 2,
            title: '从你的全世界路过',
            url: 'http://www.baidu.com',
            image:
              'http://qb2ljz0fe.bkt.clouddn.com/FhsAoQyZV6ep-BdCLmen3Emi33vi',
            text: ''
          },
          {
            content_id: 1,
            title: '测试广告',
            url: 'http://www.baidu.com',
            image:
              'http://qb2ljz0fe.bkt.clouddn.com/FqF5ZWsuR4gfxQQu3pTixE9XrTmi',
            text: ''
          }
        ]
      },
      {
        id: 2,
        name: '列表',
        key: 'index-list',
        contents: [
          {
            content_id: 4,
            title: '2001：太空漫游',
            url: 'http://www.baidu.com',
            image: null,
            text: ''
          },
          {
            content_id: 3,
            title: '从你的全世界路过',
            url: 'http://www.baidu.com',
            image: null,
            text: ''
          }
        ]
      }
    ],
    news: [
      {
        id: 3,
        name: '测试类别3',
        news: [
          {
            news_id: 3,
            title: '2001：太空漫游',
            username: 'admin',
            create_time: '2020/05/30',
            index_image_url: 'http://qb2ljz0fe.bkt.clouddn.com/ix.jpg',
            news_type: 'Video',
            video_long: '18:26'
          },
          {
            news_id: 2,
            title: '人个人',
            username: 'admin',
            create_time: '2020/05/30',
            index_image_url: 'http://qb2ljz0fe.bkt.clouddn.com/ix.jpg',
            news_type: 'Video',
            video_long: '18:30'
          },
          {
            news_id: 1,
            title: '金合欢花或',
            username: 'admin',
            create_time: '2020/05/30',
            index_image_url: 'http://qb2ljz0fe.bkt.clouddn.com/ix.jpg',
            news_type: 'Video',
            video_long: '00:07'
          }
        ]
      }
    ]
  },
  'onGet:/categories/': [
    {
      id: 8,
      name: '测试类别测试类别',
      sub_categories: [
        {
          sub_id: 9,
          name: '招牌干锅系列'
        }
      ]
    },
    {
      id: 1,
      name: '测试类别1',
      sub_categories: [
        {
          sub_id: 2,
          name: '测试类别2'
        }
      ]
    }
  ],
  [`onGet:${/\/categories\/\d+\/$/}`]: [
    {
      id: 2,
      name: '测试类别2',
      news: [
        {
          news_id: 4,
          title: '我思故我在',
          username: 'admin',
          create_time: '2020/05/30',
          index_image_url:
            'http://qb2ljz0fe.bkt.clouddn.com/FsD7HjnTT723g2zPhoYpN5e5oJrP',
          news_type: 'GraphText'
        }
      ]
    },
    {
      id: 3,
      name: '测试类别3',
      news: [
        {
          news_id: 3,
          title: '2001：太空漫游',
          username: 'admin',
          create_time: '2020/05/30',
          index_image_url: 'http://qb2ljz0fe.bkt.clouddn.com/ix.jpg',
          news_type: 'Video',
          video_long: '18:26'
        }
      ],
      next: 'http://192.168.1.105:8001/api/categories/3/news/?page=2'
    }
  ],
  [`onGet:${/\/categories\/\d+\/news/}`]: {
    count: 1,
    next: '',
    previous: '',
    results: [
      {
        news_id: 4,
        title: '我思故我在',
        username: 'admin',
        create_time: '2020/05/30',
        index_image_url:
          'http://qb2ljz0fe.bkt.clouddn.com/FsD7HjnTT723g2zPhoYpN5e5oJrP',
        news_type: 'GraphText'
      }
    ]
  },
  [`onGet:${/\/news\/\d+\/$/}`]: {
    id: 3,
    title: '2001：太空漫游',
    clicks: 0,
    comments_count: 0,
    video_long: '00:18:26',
    video_url: 'http://qb2ljz0fe.bkt.clouddn.com/2.mp4',
    video_desc: '而个体',
    create_time: '2020-05-3013:29',
    user_info: {
      user_id: 2,
      username: 'admin',
      company: '',
      departments: '',
      job: ''
    }
  },
  [`onGet:${/\/news\/\d+\/comments\/$/}`]: {
    count: 3,
    next: 'http://192.168.1.105:8001/api/news/1/comments/?page=2',
    previous: '',
    results: [
      {
        id: 2,
        user_id: 1,
        username: 'huang',
        content: 'cccc',
        like_count: 0,
        has_delete: true,
        sub_comment_count: 0,
        create_time: '2020-05-3100:34'
      }
    ]
  },
  [`onGet:${/\/news\/\d+\/comments\/\d+\/$/}`]: {
    count: 1,
    next: '',
    previous: '',
    results: [
      {
        id: 6,
        user_id: 1,
        username: 'huang',
        replay_username: 'admin',
        content: 'cshi 测试 ceshi',
        like_count: 0,
        has_delete: true,
        sub_comment_count: 0,
        create_time: '2020-05-3114:24'
      }
    ]
  }
};
