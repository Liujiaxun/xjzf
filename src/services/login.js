import request from '@/utils/request';
import { baseUrl } from '@/config/baseConfig';

export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function getLoginWeChatCode() {
  return request(`${baseUrl}/user/qrlogin`, {
    method: 'GET',
  });
}

export async function postCheckLoginStatus(data) {
  return request(`${baseUrl}/user/wechatlogin`, {
    method: 'POST',
    data,
  });
}

export async function postGetVCode(data) {
  return request(`${baseUrl}/authencode/send`, {
    method: 'POST',
    data,
  });
}

export async function postSubmitRegisterPhone(data) {
  return request(`${baseUrl}/user/bind`, {
    method: 'POST',
    data,
  });
}
