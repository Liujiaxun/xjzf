import {fakeSubmitForm, uploadFile, saveMerchantSubmit, getMerchantsInfo} from './service';

const Model = {
  namespace: 'merchantsAndApply',
  state: {
    current: 'info',
    step: {
      account_bank: '',
      account_number: '',
      address: '',
      bank_address_code: '',
      bank_name: '',
      contact_phone: '',
      id_card_name: '',
      id_card_number: '',
      id_card_valid_time: [],
      merchant_shortname: '',
      product_desc: '',
      store_address_code: '',
      id_card_copy: '',
      id_card_national: '',
      rate: 0.6
    },
    info: {}
  },
  effects: {
    * submitStepForm({payload}, {call, put}) {
      yield call(fakeSubmitForm, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put({
        type: 'saveCurrentStep',
        payload: 'result',
      });
    },
    *getMerchantsInfo({payload}, {call, put}) {
      const response = yield call(getMerchantsInfo, payload);
      if(response.status){
        yield put({
          type: 'saveInfo',
          payload: response.data,
        })
      }
      return response
    },
    * saveMerchantSubmit({payload}, {call, put}) {
      const response = yield call(saveMerchantSubmit, payload);
      if(response.status){
        yield put({
           type: 'saveCurrentStep',
           payload: 'pay',
        })
      }
      return response
    },
    * uploadFile({payload}, {call, put}) {
      yield call(uploadFile, payload);
    },
  },

  reducers: {
    saveInfo (state, {payload}){
      return {
        ...state,
        info: payload
      }
    },
    saveCurrentStep(state, {payload}) {
      return {...state, current: payload};
    },

    saveStepFormData(state, {payload}) {
      return {...state, step: {...state.step, ...payload}};
    },
    clearData(state, {payload}) {
      return {
        ...state,
        current: 'info',
        step: {
          account_bank: '',
          account_number: '',
          address: '',
          bank_address_code1: '',
          bank_address_code2: '',
          bank_address_code3: '',
          bank_name: '',
          contact_phone: '',
          id_card_name: '',
          id_card_number: '',
          id_card_valid_time: [],
          merchant_shortname: '',
          product_desc: '',
          store_address_code1: '',
          store_address_code2: '',
          store_address_code3: '',
          id_card_copy: '',
          id_card_national: '',
          rate: 0.6
        },
      };
    },
  },
};
export default Model;
