import {routerRedux} from 'dva/router';
import {stringify} from 'querystring';
import {getLoginWeChatCode, postCheckLoginStatus, postGetVCode, postSubmitRegisterPhone} from '@/services/login';
import {setAuthority} from '@/utils/authority';
import {getPageQuery} from '@/utils/utils';
import {tokenKey} from '../config/baseConfig'

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
    data: {},
    isLogin: false,
    user: {},
  },
  effects: {
    * getLoginWeChatCode({payload}, {call, put}) {
      try {
        const response = yield call(getLoginWeChatCode, payload);
        yield put({
          type: 'changeLoginData',
          payload: response.data,
        });
        return response;
      } catch (e) {
        console.log(e)
      }
    },
    * postGetVCode({payload}, {call, put}) {
      try {
        const response = yield call(postGetVCode, payload);
        return response;
      } catch (e) {
        console.log(e)
      }
    },
    * postSubmitRegisterPhone({payload}, {call, put}) {
      try {
        const response = yield call(postSubmitRegisterPhone, payload);
        if (response && response.status) {
          yield put({
            type: 'changeLoginData',
            payload: response.data,
          });
        }
        return response;
        // amount: "0.00"
        // appid: "wx381c786fd6004313"
        // company: ""
        // credit: "0"
        // ctime: "1573041492"
        // email: ""
        // from_uid: "0"
        // gender: "0"
        // headurl: ""
        // id: "4"
        // invite_num: "0"
        // invite_total_credit: "0"
        // invitecode: "62279"
        // lastlogin: "1573042950"
        // lastlogin_ip: "163.125.123.119"
        // member_endtime: "0"
        // member_level: "0"
        // nickname: "Felix"
        // openid: ""
        // phone: "18598270580"
        // phone_authen: 1
        // realname: "陶小兰"
        // source: "pc"
        // status: 1
        // total_consume: "0.00"
        // total_recharge: "0.00"
        // unionid: "o52dVwPC3lmaG6hbT62eYG1LIVhk"
      } catch (e) {

      }
    }
    ,
    * checkLoginStatus({payload}, {call, put}) {
      try {
        const response = yield call(postCheckLoginStatus, payload);
        if (response && response.data && response.data.token) {
          yield put({
            type: 'changeLoginRegisterPhone',
            payload: response.data,
          });
        }
        return response

        // amount: "0.00"
        // appid: "wx381c786fd6004313"
        // company: ""
        // credit: "0"
        // ctime: "1572960589"
        // email: ""
        // from_uid: "0"
        // gender: 0
        // headurl: ""
        // id: "3"
        // invite_num: "0"
        // invite_total_credit: "0"
        // invitecode: ""
        // lastlogin: 1572960680
        // lastlogin_ip: "182.97.168.66"
        // member_endtime: "0"
        // member_level: "0"
        // nickname: "青鸟"
        // openid: ""
        // phone: ""
        // phone_authen: "0"
        // realname: ""
        // source: "pc"
        // status: "1"
        // token: "a8f232632eeea872eebbdaae4f13244240b2b43c"
        // total_consume: "0.00"
        // total_recharge: "0.00"
        // unionid: "o52dVwM_b0Bf9MxMIw_gPfnqtL6k"
      } catch (e) {

      }
    }
    ,
    * login({payload}, {call, put}) {
      // const response = yield call(fakeAccountLogin, payload);
      // yield put({
      //   type: 'changeLoginStatus',
      //   payload: response,
      // }); // Login successfully
      //
      // if (response.status === 'ok') {
      //   const urlParams = new URL(window.location.href);
      //   const params = getPageQuery();
      //   let {redirect} = params;
      //
      //   if (redirect) {
      //     const redirectUrlParams = new URL(redirect);
      //
      //     if (redirectUrlParams.origin === urlParams.origin) {
      //       redirect = redirect.substr(urlParams.origin.length);
      //
      //       if (redirect.match(/^\/.*#/)) {
      //         redirect = redirect.substr(redirect.indexOf('#') + 1);
      //       }
      //     } else {
      //       window.location.href = '/';
      //       return;
      //     }
      //   }
      //
      //   yield put(routerRedux.replace(redirect || '/'));
      // }
    }
    ,

    * getCaptcha({payload}, {call}) {
      yield call(getFakeCaptcha, payload);
    }
    ,

    * logout(_, {put}) {
      const {redirect} = getPageQuery(); // redirect

      if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
      }
    }
    ,
  },
  reducers: {
    changeLoginStatus(state, {payload}) {
      setAuthority(payload.currentAuthority);
      return {...state, status: payload.status, type: payload.type};
    },
    changeLoginData(state, {payload}) {
      return {...state, data: payload};
    },
    changeLoginRegisterPhone(state, {payload}) {
      return {
        ...state,
        isLogin: payload.phone !== '' ? false : true,
        user: payload,
      }
    }
  },
};
export default Model;
