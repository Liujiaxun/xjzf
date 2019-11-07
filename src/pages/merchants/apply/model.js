import { fakeSubmitForm, uploadFile } from './service';

const Model = {
  namespace: 'merchantsAndApply',
  state: {
    current: 'info',
    step: {
      account_bank: "",
      account_number: "",
      address: "",
      bank_address_code1: "",
      bank_address_code2: "",
      bank_address_code3: "",
      bank_name: "",
      contact_phone: "",
      id_card_name: "",
      id_card_number: "",
      id_card_valid_time:[],
      merchant_shortname: "",
      product_desc: "",
      store_address_code1: "",
      store_address_code2: "",
      store_address_code3: "",
    },
  },
  effects: {
    *submitStepForm({ payload }, { call, put }) {
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
    *uploadFile({payload},{call, put}){
      yield call(uploadFile, payload);
    },
  },

  reducers: {
    saveCurrentStep(state, { payload }) {
      return { ...state, current: payload };
    },

    saveStepFormData(state, { payload }) {
      return { ...state, step: { ...state.step, ...payload } };
    },
  },
};
export default Model;
