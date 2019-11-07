import {Button, DatePicker, Divider, Form, Input, Select, Row, Col, Checkbox} from 'antd';
import React, {Fragment, useState} from 'react';
import {connect} from 'dva';
import styles from './index.less';

const {Option} = Select;
const {RangePicker} = DatePicker;
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

class Step1 extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      c1: [],
      c2: [],
      q1: [],
      q2: []
    }
  }

  render() {
    const {form, dispatch, data, dict} = this.props;
    const {addressList} = dict

    if (!data) {
      return null;
    }
    const {
      account_bank,
      account_number,
      address,
      bank_address_code1,
      bank_address_code2,
      bank_address_code3,
      bank_name,
      contact_phone,
      id_card_name,
      id_card_number,
      id_card_valid_time,
      merchant_shortname,
      product_desc,
      store_address_code1,
      store_address_code2,
      store_address_code3,
    } = data;
    const {c1, c2, q1, q2} = this.state;
    const {getFieldDecorator, validateFields} = form;
    const rangeConfig = {};
    const onValidateForm = () => {
      validateFields((err, values) => {
        console.log(err, values);
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
    const onCity1Change = (v, c, i) => {
      this.setState({
        ['c' + i]: this.props.dict.addressList[c.key].children || [],
        ['q' + i]: []
      })
      if (i === 1) {
        this.props.form.setFieldsValue({store_address_code2: '', store_address_code3: ''})
      }
      if (i === 2) {
        this.props.form.setFieldsValue({bank_address_code2: '', bank_address_code3: ''})
      }
    }

    const onCChange = (v, c, i, d) => {
      const data = this.state[d];
      this.setState({
        ['q' + i]: data[c.key].children || []
      })
    }
    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Divider orientation="left"> 收款信息 </Divider>
          <div style={{maxWidth: '800px', margin: '0 auto'}}>
            <Form.Item {...formItemLayout} label="收款名称">
              {getFieldDecorator('merchant_shortname', {
                initialValue: merchant_shortname,
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
              {getFieldDecorator('product_desc', {
                initialValue: product_desc,
                rules: [
                  {
                    required: true,
                    message: '请选择所属行业',
                  },
                ],
              })(
                <Select
                >
                  <Option value="餐饮">餐饮</Option>
                  <Option value="线下零售">线下零售</Option>
                  <Option value="居民生活服务">居民生活服务</Option>
                  <Option value="休闲娱乐">休闲娱乐</Option>
                  <Option value="交通出行">交通出行</Option>
                  <Option value="其他">其他</Option>
                </Select>,
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="手机号码">
              {getFieldDecorator('contact_phone', {
                initialValue: contact_phone,
                rules: [
                  {
                    required: true,
                    message: '请输入手机号码',
                  },
                ],
              })(<Input placeholder="请输入手机号码"/>)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="详细地址">
              <Row gutter={24}>
                <Col sm={6}>
                  {getFieldDecorator('store_address_code1', {
                    initialValue: store_address_code1,
                    rules: [
                      {
                        required: true,
                        message: '请选择省',
                      },
                    ],
                  })(<Select onChange={(v, c) => onCity1Change(v, c, 1)}>
                    {
                      addressList && addressList.map((item, i) => (
                        <Option key={i} value={item.value}>{item.label}</Option>))
                    }
                  </Select>)}
                </Col>
                <Col sm={6}>
                  {getFieldDecorator('store_address_code2', {
                    initialValue: store_address_code2,
                    rules: [
                      {
                        required: true,
                        message: '请选择市',
                      },
                    ],
                  })(<Select onChange={(v, c) => onCChange(v, c, 1, 'c1')}>
                    {
                      c1 && c1.map((item, i) => (<Option key={i} value={item.value}>{item.label}</Option>))
                    }
                  </Select>)}
                </Col>
                <Col sm={6}>
                  {getFieldDecorator('store_address_code3', {
                    initialValue: store_address_code3,
                    rules: [
                      {
                        required: true,
                        message: '请选择县/区',
                      },
                    ],
                  })(<Select
                  >
                    {
                      q1 && q1.map((item, i) => (<Option key={i} value={item.value}>{item.label}</Option>))
                    }
                  </Select>)}
                </Col>
              </Row>
            </Form.Item>
            <Form.Item {...formItemLayout} label=" " colon={false}>
              {getFieldDecorator('address', {
                initialValue: address,
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
          <div style={{maxWidth: '800px', margin: '0 auto'}}>
            <Form.Item {...formItemLayout} label="身份证姓名">
              {getFieldDecorator('id_card_name', {
                initialValue: id_card_name,
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
              {getFieldDecorator('id_card_number', {
                initialValue: id_card_number,
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
              {getFieldDecorator('id_card_valid_time', {
                initialValue:id_card_valid_time,
                rules: [{type: 'array', required: true, message: '请选择时间'}],
              })(<RangePicker/>)}
              <Checkbox style={{marginLeft: '20px'}}>
                长期
              </Checkbox>
            </Form.Item>
          </div>
          <Divider orientation="left"> 结算信息 </Divider>
          <div style={{maxWidth: '800px', margin: '0 auto'}}>
            <Form.Item {...formItemLayout} label="开户银行">
              {getFieldDecorator('account_bank', {
                initialValue: account_bank,
                rules: [
                  {
                    required: true,
                    message: '请输入开户银行',
                  },
                ],
              })(
                <Input
                  placeholder="请输入开户银行"
                />
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="银行卡号">
              {getFieldDecorator('account_number', {
                initialValue: account_number,
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
              {getFieldDecorator('bank_name', {
                initialValue: bank_name,
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
                  {getFieldDecorator('bank_address_code1', {
                    initialValue: bank_address_code1,
                    rules: [
                      {
                        required: true,
                        message: '请选择省',
                      },
                    ],
                  })(<Select onChange={(v, c) => onCity1Change(v, c, 2)}>
                    {
                      addressList && addressList.map((item, i) => (
                        <Option key={i} value={item.value}>{item.label}</Option>))
                    }
                  </Select>)}
                </Col>
                <Col sm={6}>
                  {getFieldDecorator('bank_address_code2', {
                    initialValue: bank_address_code2,
                    rules: [
                      {
                        required: true,
                        message: '请选择市',
                      },
                    ],
                  })(<Select onChange={(v, c) => onCChange(v, c, 2, 'c2')}>
                    {
                      c2 && c2.map((item, i) => (<Option key={i} value={item.value}>{item.label}</Option>))
                    }
                  </Select>)}
                </Col>
                <Col sm={6}>
                  {getFieldDecorator('bank_address_code3', {
                    initialValue: bank_address_code3,
                    rules: [
                      {
                        required: true,
                        message: '请选择县/区',
                      },
                    ],
                  })(<Select
                  >
                    {
                      q2 && q2.map((item, i) => (<Option key={i} value={item.value}>{item.label}</Option>))
                    }
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
  }

}

export default connect(({merchantsAndApply, dict}) => ({
  data: merchantsAndApply.step,
  dict
}))(Form.create()(Step1));
