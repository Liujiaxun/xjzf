import { fetchAddressList, fetchSettingData, fetchUserSta, fetchStaOrderDaily, fetchStaOrderHour, fetchContrastList } from '@/services/dict';

const DictModel = {
  namespace: 'dict',
  state: {
    addressList: [],
    settingData: {
      kefu:{}, invite:{}
    },
    userSta:{},
    StaOrderHour:[],
    StaOrderDaily: [],
    contrast:{
      map_rate:[],
      map_bank:[]
    }
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
    *fetchContrastList(_, { call, put }) {
      try {
        const response = yield call(fetchContrastList);
        if (response.status) {
          yield put({ type: 'changeContrastList', payload: response.data });
        }
        return response;
      } catch (e) {
        console.log(e);
      }
    },
    *fetchSettingData(_, { call, put }) {
      try {
        const response = yield call(fetchSettingData);
        if (response.status) {
          yield put({ type: 'changeSettingData', payload: response.data });
        }
        return response;
      } catch (e) {
        console.log(e);
      }
    },
    *fetchUserSta(_, { call, put }) {
      try {
        const response = yield call(fetchUserSta);
        if (response.status) {
          yield put({ type: 'changeUserSta', payload: response.data });
        }
        return response;
      } catch (e) {
        console.log(e);
      }
    },

    *fetchStaOrderDaily({payload}, { call, put }) {
      try {
        const response = yield call(fetchStaOrderDaily,payload);
        if (response.status) {
          yield put({ type: 'changeStaOrderDaily', payload: response.data.list });
        }
        return response;
      } catch (e) {
        console.log(e);
      }
    },
    *fetchStaOrderHour({payload}, { call, put }) {
      try {
        const response = yield call(fetchStaOrderHour,payload);
        if (response.status) {
          yield put({ type: 'changeStaOrderHour', payload: response.data.list });
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
    changeStaOrderDaily(state, { payload }) {
      return {
        ...state,
        StaOrderDaily: payload,
      };
    },
    changeStaOrderHour(state, { payload }) {
      return {
        ...state,
        StaOrderHour: payload,
      };
    },
    changeUserSta(state, { payload }) {
      return {
        ...state,
        userSta: payload,
      };
    },
    changeSettingData(state, { payload }) {
      return {
        ...state,
        settingData: payload,
      };
    },
    changeContrastList(state, { payload }) {
      return {
        ...state,
        contrast: payload,
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
