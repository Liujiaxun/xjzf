import { fetchAddressList } from '@/services/dict';

const DictModel = {
  namespace: 'dict',
  state: {
    addressList: [],
  },
  effects: {
    *fetchAddressList(_, { call, put }) {
      try {
        const response = yield call(fetchAddressList);
        if (response.status) {
          yield put({ type: 'changeAddressList', payload: response.data });
        }
        return response;
      } catch (e) {
        console.log(e);
      }
    },
  },
  reducers: {
    changeAddressList(state, { payload }) {
      return {
        ...state,
        addressList: payload,
      };
    },
    changeLayoutCollapsed(
      state = {
        notices: [],
        collapsed: true,
      },
      { payload },
    ) {
      return { ...state, collapsed: payload };
    },
  },
  subscriptions: {},
};
export default DictModel;
