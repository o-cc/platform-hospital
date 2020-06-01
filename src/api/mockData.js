export default {
  'onPost:/users/': {
    token:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6Imh1YW5nIiwiZXhwIj oxNjIyMzg5ODc5LCJlbWFpbCI6IiIsImxhc3RfbG9naW4iOjE1OTA4ODI2Nzl9.XBL7ScjcU4r5N4Z0xHR qm7j-FiSJU18PLtMbjxXiAMU',
    user_id: 1,
    username: 'huang'
  },
  'onPost:/users/login/': {
    token:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6Imh1YW5nIiwiZXhwIj oxNjIyMzg5ODc5LCJlbWFpbCI6IiIsImxhc3RfbG9naW4iOjE1OTA4ODI2Nzl9.XBL7ScjcU4r5N4Z0xHR qm7j-FiSJU18PLtMbjxXiAMU',
    user_id: 1,
    username: 'huang'
  },
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
    // id: 3,
    // title: '2001：太空漫游',
    // clicks: 0,
    // comments_count: 0,
    // video_long: '00:18:26',
    // video_url: 'http://qb2ljz0fe.bkt.clouddn.com/2.mp4',
    // video_desc: '而个体',
    // create_time: '2020-05-30 13:29',
    // user_info: {
    //   user_id: 2,
    //   username: 'admin',
    //   company: '',
    //   departments: '',
    //   job: ''
    // }
    id: 5,
    title: '测试图文测试图文',
    digest: '测试照耀测试摘要',
    content:
      '<p>\r\n新京报快讯（记者 裴剑飞）明年起，北京拟向无车家庭优先配置小客车指标。今天（6月1日）下午，《北京市小客车数量调控暂行规定（修订草案征求意见稿）》《〈北京市小客车数量调控暂行规定〉实施细则（修订征求意见稿）》发布，计划于明年起开始实行摇号新政，无车家庭可以家庭为单位参与摇号，其中签概率要明显高于个人申请者，能够优先获得指标。新能源车方面，每年将有80%的指标向&ldquo;无车家庭&rdquo;优先配置。\r\n\r\n此外，指标配置由现行每两月配置一次，改为每年5月配置新能源指标，6月和12月配置普通指标。\r\n\r\n《征求意见稿》首先明确了无车家庭的定义。一个&ldquo;无车家庭&rdquo;由主申请人和他的家庭成员组成，总人数至少为2人，可以共同申请指标的家庭成员范围限定在配偶、子女及双方父母。所有的成员及其配偶名下不能有北京市牌照的小客车。主申请人代表整个家庭来申请指标，并且作为指标的持有人。\r\n\r\n据了解，申请&ldquo;以家庭为单位&rdquo;配置指标的无车家庭主申请人及其他家庭成员须满足以下条件：主申请人执行目前的规定，应为北京户籍或持北京市工作居住证或有北京市有效居住证且近五年连续在北京缴纳社会保险和个人所得税，名下无京牌车、有驾照；其他的家庭成员应为北京户籍或持北京市工作居住证或有北京市有效居住证且近五年连续在北京缴纳社会保险和个人所得税，可以无驾照。\r\n\r\n需要特别强调的是，申请以家庭为单位进行摇号后，所有参与的家庭成员及其配偶就不能同时再以任何形式申请指标（如果主申请人与儿子一起组成&ldquo;无车家庭&rdquo;申请配置指标，那么主申请人的儿媳妇就不能同时申请指标）。另外，&ldquo;无车家庭&rdquo;获得指标后，所有成员十年之内不得再参加指标配置。\r\n\r\n本次新政还增加了家庭积分的概念并合理设置了积分规则。在普通指标配置时，通过家庭积分赋予&ldquo;无车家庭&rdquo;远高于个人的中签概率；在新能源指标配置时，除分配给单位和营运车的指标配额外，首先拿出80%的指标根据家庭积分高低向&ldquo;无车家庭&rdquo;优先配置。\r\n\r\n据了解，所有申请参与指标配置的&ldquo;无车家庭&rdquo;都将按照一定测算方式得出一个家庭总积分，影响因素包括参与无车家庭指标申请的总人数、此前参与摇号的时长以及家庭成员的代际数。最后所得出的分数即为相较于首次参与个人摇号者的中签倍率。总的来说，作为一个家庭来申请时，家庭申请人越多，家庭总积分就越高，获得指标的概率也更高。\r\n\r\n根据家庭积分规则，以及当前个人摇号平均阶梯积分为5进行测算，举例说明以家庭为单位申请指标的优势如下：\r\n\r\n案例1 三代同堂大家庭\r\n\r\n家庭申请人包括主申请人、主申请人配偶、2名子女及双方父母共三代8人，其中有4人正参加摇号，个人阶梯数均为5。</p>\r\n\r\n<p><img src="http://qb2ljz0fe.bkt.clouddn.com/Fs_ugC6LO5idXmEq6jXufBtVKzO8" style="height:277px; width:640px" /></p>\r\n\r\n<p>即该家庭如参加摇号，中签倍率是个人首次参加摇号中签率的126倍，是主申请人个人参加摇号中签率的25倍多。</p>\r\n\r\n<p>案例2 一家三口</p>\r\n\r\n<p>家庭申请人由主申请人、主申请人配偶、一名子女组成共两代3人，夫妻均在摇号，个人阶梯数均为5。</p>\r\n\r\n<p><img src="http://qb2ljz0fe.bkt.clouddn.com/FkjNy6HuDS2DcpTy2uZ_phzVn3I0" style="height:277px; width:640px" /></p>\r\n\r\n<p>即该家庭如参加摇号，中签倍率是个人首次参加摇号中签率的54倍，是主申请人个人参加摇号中签率的10倍多。</p>\r\n\r\n<p>案例3 夫妻两人小家庭</p>\r\n\r\n<p>家庭申请人由主申请人及其配偶2人组成，只有主申请人在摇号，个人阶梯数为5。</p>\r\n\r\n<p>&nbsp;</p>',
    clicks: 0,
    comments_count: 0,
    create_time: '2020-06-01 21:02',
    user_info: {
      user_id: 1,
      avatar: '',
      username: 'huang',
      company: '',
      departments: '',
      job: ''
    },
    collected: false,
    is_followed: false,
    has_follow: true
  },
  [`onGet:${/\/news\/\d+\/comments\/$/}`]: {
    count: 1,
    next: '',
    previous: '',
    results: [
      {
        id: 12,
        user_id: 1,
        avatar: 'http://qb2ljz0fe.bkt.clouddn.com/FqF5ZWsuR4gfxQQu3pTixE9XrTmi',
        username: 'huang3',
        content: 'ceshi测试测试评论ceshi',
        like_count: 0,
        has_delete: false,
        sub_comment_count: 0,
        create_time: '2020-06-01 21:14'
      }
    ]
  },
  [`onGet:${/\/news\/\d+\/comments\/\d+\/$/}`]: {
    count: 0,
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
        create_time: '2020-05-31 14:24'
      }
    ]
  }
};
