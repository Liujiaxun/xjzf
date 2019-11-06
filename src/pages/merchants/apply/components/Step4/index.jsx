import { Button, Divider, Form, Input, Select } from 'antd';
import React, { Fragment } from 'react';
import { connect } from 'dva';
import styles from './index.less';
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const Step4 = props => {
  const { form, dispatch, data } = props;

  if (!data) {
    return null;
  }

  const { getFieldDecorator, validateFields } = form;
  const onPrev = () => {
    dispatch({
      type: 'merchantsAndApply/saveCurrentStep',
      payload: 'pay',
    });
  }
  const onValidateForm = () => {
    validateFields((err, values) => {
      if (!err && dispatch) {
        dispatch({
          type: 'merchantsAndApply/saveStepFormData',
          payload: values,
        });
        dispatch({
          type: 'merchantsAndApply/saveCurrentStep',
          payload: 'result',
        });
      }
    });
  };

  return (
    <Fragment>
      <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
        <Form.Item {...formItemLayout} label="付款账户">
          {getFieldDecorator('payAccount', {
            initialValue: data.payAccount,
            rules: [
              {
                required: true,
                message: '请选择付款账户',
              },
            ],
          })(
            <Select placeholder="test@example.com">
              <Option value="ant-design@alipay.com">ant-design@alipay.com</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="收款账户">
          <Input.Group compact>
            <Select
              defaultValue="alipay"
              style={{
                width: 100,
              }}
            >
              <Option value="alipay">支付宝</Option>
              <Option value="bank">银行账户</Option>
            </Select>
            {getFieldDecorator('receiverAccount', {
              initialValue: data.receiverAccount,
              rules: [
                {
                  required: true,
                  message: '请输入收款人账户',
                },
                {
                  type: 'email',
                  message: '账户名应为邮箱格式',
                },
              ],
            })(
              <Input
                style={{
                  width: 'calc(100% - 100px)',
                }}
                placeholder="test@example.com"
              />,
            )}
          </Input.Group>
        </Form.Item>
        <Form.Item {...formItemLayout} label="收款人姓名">
          {getFieldDecorator('receiverName', {
            initialValue: data.receiverName,
            rules: [
              {
                required: true,
                message: '请输入收款人姓名',
              },
            ],
          })(<Input placeholder="请输入收款人姓名" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="转账金额">
          {getFieldDecorator('amount', {
            initialValue: data.amount,
            rules: [
              {
                required: true,
                message: '请输入转账金额',
              },
              {
                pattern: /^(\d+)((?:\.\d+)?)$/,
                message: '请输入合法金额数字',
              },
            ],
          })(<Input prefix="￥" placeholder="请输入金额" />)}
        </Form.Item>
        <Form.Item
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
          <Button onClick={onPrev}>上一步</Button>
          <Button type="primary" onClick={onValidateForm} style={{marginLeft:'20px'}}>
            下一步
          </Button>
        </Form.Item>
      </Form>
      <Divider
        style={{
          margin: '40px 0 24px',
        }}
      />
    </Fragment>
  );
};

export default connect(({ merchantsAndApply }) => ({
  data: merchantsAndApply.step,
}))(Form.create()(Step4));
