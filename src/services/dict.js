import request from '@/utils/request';
import { baseUrl } from '@/config/baseConfig';

export async function fetchAddressList() {
  return request(`${baseUrl}/area/options`);
}
export async function fetchSettingData() {
  return request(`${baseUrl}/setting/data`);
}

export async function fetchUserSta() {
  return request(`${baseUrl}/user/sta`);
}
export async function fetchStaOrderDaily(params) {
  return request(`${baseUrl}/sta/order_daily`,{
    params
  });
}

export async function fetchStaOrderHour(params) {
  return request(`${baseUrl}/sta/order_hour`,{
    params
  });
}

export async function fetchContrastList(params) {
  return request(`${baseUrl}/merchant/contrast`,{
    params
  });
}




