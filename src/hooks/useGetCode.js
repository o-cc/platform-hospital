import { useState } from 'react';
import { codeDownCount } from 'configs';
import { requestApi } from '@/utils';

export default () => {
  const [downCount, setDown] = useState(codeDownCount);

  const getCode = async phone => {
    console.log('11');

    if (!/^1\d{10}$/.test(phone)) {
      return ['请输入正确的手机号', 'warning'];
    }
    console.log('phone', phone);

    let { result, error } = await requestApi('getSmsCode', {
      phone
    });

    if (error || result.message !== 'OK') {
      return [error || result.message];
    }
    //开始倒计时
    codeDown();
    return ['获取验证码成功', 'success'];
  };

  const codeDown = () => {
    setDown(count => {
      if (count <= 0) return codeDownCount;
      setTimeout(() => {
        codeDown();
      }, 1000);
      return --count;
    });
  };

  return {
    downCount,
    getCode
  };
};
