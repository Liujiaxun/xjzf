import request from '@/utils/request';
import { baseUrl } from '../config/baseConfig'

export async function getUserInfo() {
  return request(`${baseUrl}/user/info`);
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

export async function queryNotices() {
  return request('/api/notices');
}
