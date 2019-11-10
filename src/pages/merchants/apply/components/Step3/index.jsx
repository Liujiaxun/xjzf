import { Alert, Button, Descriptions, Divider, Statistic, Form, Input } from 'antd';
import React from 'react';
import { connect } from 'dva';
import qCode from '../../../../../assets/2code.png'
import styles from './index.less';
const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 19,
  },
};
const Step3 = props => {
  const { form, data, dispatch, submitting } = props;
  if (!data) {
    return null;
  }
  const { getFieldDecorator, validateFields, getFieldsValue } = form;
  const onPrev = () => {
    if (dispatch) {
      dispatch({
        type: 'merchantsAndApply/saveCurrentStep',
        payload: 'info',
      });
    }
  };

  const onValidateForm = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        if (dispatch) {
          dispatch({
            type: 'merchantsAndApply/saveCurrentStep',
            payload: 'qy',
          });
        }
      }
    });
  };

  const { payAccount, receiverAccount, receiverName, amount } = data;
  return (
    <Form layout="horizontal" className={styles.stepForm}>
      <Alert
        closable
        showIcon
        message="确认支付后，资金将直接打入对方账户。"
        style={{
          marginBottom: 24,
        }}
      />
      <Descriptions column={1} style={{textAlign:'center'}}>
        <Descriptions.Item label="付款金额">
          <Statistic value={500} suffix="元" />
        </Descriptions.Item>
        <Descriptions.Item style={{textAlign:'center'}}>
          <div >
            <img src={qCode} alt="" style={{width:'250px',height:'250px',margin: '0 auto'}}/>
          </div>
        </Descriptions.Item>
      </Descriptions>
      <Divider
        style={{
          margin: '24px 0',
        }}
      />
      <Form.Item
        style={{
          marginBottom: 8,
        }}
        wrapperCol={{
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: formItemLayout.wrapperCol.span,
            offset: formItemLayout.labelCol.span,
          },
        }}
        label=""
      >
        <Button
          onClick={onPrev}
          style={{
            marginLeft: 8,
          }}
        >
          上一步
        </Button>
        {/*<Button type="primary" onClick={onValidateForm} loading={submitting} style={{marginLeft: '20px'}}>*/}
        {/*  下一步*/}
        {/*</Button>*/}
      </Form.Item>
    </Form>
  );
};

export default connect(({ merchantsAndApply, loading }) => ({
  submitting: loading.effects['merchantsAndApply/submitStepForm'],
  data: merchantsAndApply.step,
}))(Form.create()(Step3));
