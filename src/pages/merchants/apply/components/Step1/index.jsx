import { Button, DatePicker, Divider, Form, Input, Select, Row,Col, Checkbox } from 'antd';
import React, { Fragment } from 'react';
import { connect } from 'dva';
import styles from './index.less';
const { Option } = Select;
const { RangePicker } = DatePicker;
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const Step1 = props => {
  const { form, dispatch, data } = props;

  if (!data) {
    return null;
  }

  const { getFieldDecorator, validateFields } = form;
  const rangeConfig = {

  };
  const onValidateForm = () => {
    validateFields((err, values) => {
      console.log(err,values);
      if (!err && dispatch) {
        dispatch({
          type: 'merchantsAndApply/saveStepFormData',
          payload: values,
        });
        dispatch({
          type: 'merchantsAndApply/saveCurrentStep',
          payload: 'upload',
        });
      }
    });
  };

  return (
    <Fragment>
      <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
        <Divider orientation="left"> 收款信息 </Divider>
        <div style={{maxWidth: '800px',margin:'0 auto'}}>
        <Form.Item {...formItemLayout} label="收款名称">
          {getFieldDecorator('payAccount', {
            initialValue: data.payAccount,
            rules: [
              {
                required: true,
                message: '请输入收款名称',
              },
            ],
          })(
            <Input
              placeholder="请输入收款名称"
            />,
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="所属行业">
            {getFieldDecorator('receiverAccount', {
              initialValue: data.receiverAccount,
              rules: [
                {
                  required: true,
                  message: '请选择所属行业',
                },
              ],
            })(
              <Select
              >
                <Option value="alipay">支付宝</Option>
                <Option value="bank">银行账户</Option>
              </Select>,
            )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="手机号码">
          {getFieldDecorator('receiverName', {
            initialValue: data.receiverName,
            rules: [
              {
                required: true,
                message: '请输入手机号码',
              },
            ],
          })(<Input placeholder="请输入手机号码" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="详细地址">
          <Row gutter={24}>
            <Col sm={6}>
              {getFieldDecorator('amount', {
                initialValue: data.amount,
                rules: [
                  {
                    required: true,
                    message: '请选择省',
                  },
                ],
              })(<Select
              >
                <Option value="alipay">支付宝</Option>
                <Option value="bank">银行账户</Option>
              </Select>)}
            </Col>
            <Col sm={6}>
              {getFieldDecorator('amount2', {
                initialValue: data.amount,
                rules: [
                  {
                    required: true,
                    message: '请选择市',
                  },
                ],
              })(<Select
              >
                <Option value="alipay">支付宝</Option>
                <Option value="bank">银行账户</Option>
              </Select>)}
            </Col>
            <Col sm={6}>
              {getFieldDecorator('amount1', {
                initialValue: data.amount,
                rules: [
                  {
                    required: true,
                    message: '请选择县/区',
                  },
                ],
              })(<Select
              >
                <Option value="alipay">支付宝</Option>
                <Option value="bank">银行账户</Option>
              </Select>)}
            </Col>
          </Row>
        </Form.Item>
          <Form.Item {...formItemLayout} label=" " colon={false}>
            {getFieldDecorator('amount1', {
              initialValue: data.amount,
              rules: [
                {
                  required: true,
                  message: '请选择填写地址',
                },
              ],
            })(<Input
              placeholder="请输入详细地址"
            />)}
          </Form.Item>
        </div>
        <Divider orientation="left"> 基本信息 </Divider>
        <div style={{maxWidth: '800px',margin:'0 auto'}}>
          <Form.Item {...formItemLayout} label="身份证姓名">
            {getFieldDecorator('amount12', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '请填写姓名',
                },
              ],
            })(<Input
              placeholder="请输入真实姓名"
            />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="身份证号码">
            {getFieldDecorator('amount123', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '请填写身份证号码',
                },
              ],
            })(<Input
              placeholder="请输入身份证号码"
            />)}

          </Form.Item>
          <Form.Item {...formItemLayout} label="证件有效期">
            {getFieldDecorator('range-picker', {
              rules: [{ type: 'array', required: true, message: '请选择时间' }],
            })(<RangePicker />)}
            <Checkbox style={{marginLeft:'20px'}}>
              长期
            </Checkbox>
          </Form.Item>
        </div>
        <Divider orientation="left"> 结算信息 </Divider>
        <div style={{maxWidth: '800px',margin:'0 auto'}}>
          <Form.Item {...formItemLayout} label="开户银行">
            {getFieldDecorator('amount123', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '请选择开户银行',
                },
              ],
            })(
              <Select
                placeholder="请选择开户银行"
              >
                <Option value="alipay">支付宝</Option>
                <Option value="bank">银行账户</Option>
              </Select>
            )}

          </Form.Item>
          <Form.Item {...formItemLayout} label="银行卡号">
            {getFieldDecorator('amount123', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '请填写银行卡号',
                },
              ],
            })(<Input
              placeholder="请输入银行卡号"
            />)}

          </Form.Item>
          <Form.Item {...formItemLayout} label="开户支行">
            {getFieldDecorator('amount123', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '请填写开户支行',
                },
              ],
            })(<Input
              placeholder="请输入开户支行"
            />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="银行所在城市">
            <Row gutter={24}>
              <Col sm={6}>
                {getFieldDecorator('amount', {
                  initialValue: data.amount,
                  rules: [
                    {
                      required: true,
                      message: '请选择省',
                    },
                  ],
                })(<Select
                >
                  <Option value="alipay">支付宝</Option>
                  <Option value="bank">银行账户</Option>
                </Select>)}
              </Col>
              <Col sm={6}>
                {getFieldDecorator('amount2', {
                  initialValue: data.amount,
                  rules: [
                    {
                      required: true,
                      message: '请选择市',
                    },
                  ],
                })(<Select
                >
                  <Option value="alipay">支付宝</Option>
                  <Option value="bank">银行账户</Option>
                </Select>)}
              </Col>
              <Col sm={6}>
                {getFieldDecorator('amount1', {
                  initialValue: data.amount,
                  rules: [
                    {
                      required: true,
                      message: '请选择县/区',
                    },
                  ],
                })(<Select
                >
                  <Option value="alipay">支付宝</Option>
                  <Option value="bank">银行账户</Option>
                </Select>)}
              </Col>
            </Row>
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
            <Button type="primary" onClick={onValidateForm}>
              下一步
            </Button>
          </Form.Item>
        </div>
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
}))(Form.create()(Step1));
