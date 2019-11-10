import { getUserInfo } from '@/services/user';
import { routerRedux } from 'dva/router';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {
      member_info:{}
    },
  },
  effects: {
    *getUserInfo(_, { call, put }) {
      try {
        const response = yield call(getUserInfo);
        yield put({
          type: 'saveCurrentUser',
          payload: response.data,
        });
        return response;
      } catch (e) {}
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
