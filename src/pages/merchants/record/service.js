import request from '@/utils/request';
import { baseUrl } from '@/config/baseConfig';

export async function fetchMerchantsList(data) {
  return request(`${baseUrl}/merchant/list`, {
    method: 'GET',
    params: data,
  });
}
