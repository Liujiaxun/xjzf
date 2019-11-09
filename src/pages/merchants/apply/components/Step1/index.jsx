import {
  Button,
  DatePicker,
  Divider,
  Cascader,
  Form,
  Input,
  Select,
  Row,
  Col,
  Checkbox,
  Upload,
  Icon,
  message
} from 'antd';
import React, {Fragment, useState} from 'react';
import {connect} from 'dva';
import styles from './index.less';
import moment from 'moment';
import request from "@/utils/request";
import {baseUrl} from "@/config/baseConfig";

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
      id_card_copy: props.data.id_card_copy,
      id_card_national: props.data.id_card_national,
    }
  }

  render() {
    const self = this;
    const {form, dispatch, data, dict} = this.props;
    const {addressList} = dict
    if (!data) {
      return null;
    }
    let {
      account_bank,
      account_number,
      address,
      bank_address_code,
      bank_name,
      contact_phone,
      id_card_name,
      id_card_number,
      id_card_valid_time,
      merchant_shortname,
      product_desc,
      store_address_code,
      id_card_copy,
      id_card_national,
      rate
    } = data;
    const {getFieldDecorator, validateFields} = form;
    const onValidateForm = () => {
      const self = this;
      if(self.state.id_card_copy === '' || self.state.id_card_national === ''){
        message.error('请上传身份证照片')
        return
      }
      validateFields((err, values) => {
        if (!err && dispatch) {
          dispatch({
            type: 'merchantsAndApply/saveMerchantSubmit',
            payload: {
              ...values,
              id_card_valid_time: values.id_card_valid_time.map(item => item.format('YYYY-MM-DD h:mm:ss')),
              id_card_copy: self.state.id_card_copy,
              id_card_national: self.state.id_card_national
            }
          }).then(r => {
            dispatch({
              type: 'merchantsAndApply/saveStepFormData',
              payload: {
                ...values,
                id_card_valid_time: values.id_card_valid_time.map(item => item.format('YYYY-MM-DD h:mm:ss')),
                id_card_copy: self.state.id_card_copy,
                id_card_national: self.state.id_card_national
              },
            })
          })
        }
      });
    };

    const onChange = (file, key) => {
      const formData = new FormData();
      formData.append('files', file.file);
      request(baseUrl + '/file/upload_img', {
        method: 'POST',
        data: formData,
      }).then(r => {
        if (r === 'empty') {
          file.onError();
          message.error('上传失败')
        } else {
          const url = r.files.url;
          file.onSuccess();
          message.success('上传成功')
          this.setState({
            [key]: url
          })
        }
      });
    };
    const handleDelete = key => {
      this.setState({
        [key]: ''
      })
    }
    let {id_card_copy: idCardCopy, id_card_national: idCardNational} = this.state
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
            <Form.Item {...formItemLayout} label="费率">
              {getFieldDecorator('rate', {
                initialValue: rate,
                rules: [
                  {
                    required: true,
                    message: '请输入手机号码',
                  },
                ],
              })(<Input placeholder="请输入手机号码" disabled={true}/>)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="详细地址">
              <Row gutter={24}>
                <Col sm={24}>
                  {getFieldDecorator('store_address_code', {
                    initialValue: store_address_code,
                    rules: [
                      {
                        required: true,
                        message: '请选择省市',
                      },
                    ],
                  })(
                    <Cascader
                      options={addressList}
                    />
                    //   <Select onChange={(v, c) => onCity1Change(v, c, 1)}>
                    //   {
                    //     addressList && addressList.map((item, i) => (
                    //       <Option key={i} value={item.value}>{item.label}</Option>))
                    //   }
                    // </Select>
                  )}
                </Col>
                {/*<Col sm={6}>*/}
                {/*  {getFieldDecorator('store_address_code2', {*/}
                {/*    initialValue: store_address_code2,*/}
                {/*    rules: [*/}
                {/*      {*/}
                {/*        required: true,*/}
                {/*        message: '请选择市',*/}
                {/*      },*/}
                {/*    ],*/}
                {/*  })(<Select onChange={(v, c) => onCChange(v, c, 1, 'c1')}>*/}
                {/*    {*/}
                {/*      c1 && c1.map((item, i) => (<Option key={i} value={item.value}>{item.label}</Option>))*/}
                {/*    }*/}
                {/*  </Select>)}*/}
                {/*</Col>*/}
                {/*<Col sm={6}>*/}
                {/*  {getFieldDecorator('store_address_code3', {*/}
                {/*    initialValue: store_address_code3,*/}
                {/*    rules: [*/}
                {/*      {*/}
                {/*        required: true,*/}
                {/*        message: '请选择县/区',*/}
                {/*      },*/}
                {/*    ],*/}
                {/*  })(<Select*/}
                {/*  >*/}
                {/*    {*/}
                {/*      q1 && q1.map((item, i) => (<Option key={i} value={item.value}>{item.label}</Option>))*/}
                {/*    }*/}
                {/*  </Select>)}*/}
                {/*</Col>*/}
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
                initialValue: id_card_valid_time.map(item => new moment(item)),
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
                <Col sm={24}>
                  {getFieldDecorator('bank_address_code', {
                    initialValue: bank_address_code,
                    rules: [
                      {
                        required: true,
                        message: '请选择省市',
                      },
                    ],
                  })(
                    <Cascader
                      options={addressList}
                    />
                  )}
                </Col>
                {/*<Col sm={6}>*/}
                {/*  {getFieldDecorator('bank_address_code2', {*/}
                {/*    initialValue: bank_address_code2,*/}
                {/*    rules: [*/}
                {/*      {*/}
                {/*        required: true,*/}
                {/*        message: '请选择市',*/}
                {/*      },*/}
                {/*    ],*/}
                {/*  })(<Select onChange={(v, c) => onCChange(v, c, 2, 'c2')}>*/}
                {/*    {*/}
                {/*      c2 && c2.map((item, i) => (<Option key={i} value={item.value}>{item.label}</Option>))*/}
                {/*    }*/}
                {/*  </Select>)}*/}
                {/*</Col>*/}
                {/*<Col sm={6}>*/}
                {/*  {getFieldDecorator('bank_address_code3', {*/}
                {/*    initialValue: bank_address_code3,*/}
                {/*    rules: [*/}
                {/*      {*/}
                {/*        required: true,*/}
                {/*        message: '请选择县/区',*/}
                {/*      },*/}
                {/*    ],*/}
                {/*  })(<Select*/}
                {/*  >*/}
                {/*    {*/}
                {/*      q2 && q2.map((item, i) => (<Option key={i} value={item.value}>{item.label}</Option>))*/}
                {/*    }*/}
                {/*  </Select>)}*/}
                {/*</Col>*/}
              </Row>
            </Form.Item>
          </div>

          <Divider orientation="left"> 材料上传 </Divider>
          <div style={{maxWidth: '800px', margin: '0 auto'}}>
            <Form.Item {...formItemLayout} label="身份证正面">
              {getFieldDecorator('id_card_copy', {
              })(
                idCardCopy ? (
                  <div>
                    <div style={{width: '300px', height: '200px', padding: '10px', border: '1px solid #f5f5f5'}}>
                      <img src={idCardCopy} alt="" style={{width: '100%', height: '100%'}}/>
                    </div>
                    <Button type="text" size='small' onClick={() => handleDelete('id_card_copy')}>重新上传</Button>
                  </div>) : (<Upload.Dragger name="files" customRequest={file => onChange(file, 'id_card_copy')}>
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox"/>
                  </p>
                  <p className="ant-upload-text"> 点击或者拖动图片到此上传 </p>
                </Upload.Dragger>),
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="身份证反面">
              {getFieldDecorator('id_card_national', {
              })(
                <div>
                  {
                    idCardNational ? (
                      <div>
                        <div style={{width: '300px', height: '200px', padding: '10px', border: '1px solid #f5f5f5'}}>
                          <img src={idCardNational} alt="" style={{width: '100%', height: '100%'}}/>
                        </div>
                        <Button type="text" size='small' onClick={() => handleDelete('id_card_national')}>重新上传</Button>
                      </div>) : (
                      <Upload.Dragger name="files" customRequest={file => onChange(file, 'id_card_national')}>
                        <p className="ant-upload-drag-icon">
                          <Icon type="inbox"/>
                        </p>
                        <p className="ant-upload-text"> 点击或者拖动图片到此上传 </p>
                      </Upload.Dragger>)
                  }
                </div>
              )}
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
