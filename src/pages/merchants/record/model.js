import { fetchMerchantsList } from './service';

const Model = {
  namespace: 'merchantsAndRecord',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },
  effects: {
    *fetchMerchantsList({ payload }, { call, put }) {
      const response = yield call(fetchMerchantsList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      return response;
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload.list || [],
        pagination: action.payload.paginator || {},
      };
    },
  },
};
export default Model;
