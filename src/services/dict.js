import request from '@/utils/request';
import { baseUrl } from '@/config/baseConfig';

export async function fetchAddressList() {
  return request(`${baseUrl}/area/options`);
}
