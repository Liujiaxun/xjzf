import { fetchMerchantsList } from '@/services/business';

const Model = {
  namespace: 'merchantsAndBusiness1',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },
  effects: {
    *fetchMerchantsList({ payload }, { call, put }) {
      try {
        const response = yield call(fetchMerchantsList, payload);
        yield put({
          type: 'save',
          payload: response.data,
        });
        return response;
      } catch (e) {}
    },

    // *add({ payload, callback }, { call, put }) {
    //   const response = yield call(addRule, payload);
    //   yield put({
    //     type: 'save',
    //     payload: response,
    //   });
    //   if (callback) callback();
    // },
    //
    // *remove({ payload, callback }, { call, put }) {
    //   const response = yield call(removeRule, payload);
    //   yield put({
    //     type: 'save',
    //     payload: response,
    //   });
    //   if (callback) callback();
    // },
    //
    // *update({ payload, callback }, { call, put }) {
    //   const response = yield call(updateRule, payload);
    //   yield put({
    //     type: 'save',
    //     payload: response,
    //   });
    //   if (callback) callback();
    // },
  },
  reducers: {
    save(state, action) {
      return { ...state, data: action.payload };
    },
  },
};
export default Model;
