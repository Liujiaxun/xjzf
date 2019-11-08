import request from '@/utils/request';
import {baseUrl} from "@/config/baseConfig";

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    data: params,
  });
}

export async function uploadFile(params) {
  return request(baseUrl + '/file/upload_img', {
    method: 'POST',
    data: params,
  });
}

export async function saveMerchantSubmit(data) {
  return request(baseUrl + '/merchant/submit', {
    method: 'POST',
    data,
  });
}

