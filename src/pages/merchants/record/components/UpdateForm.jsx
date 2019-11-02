import { Button, Form, Input, Modal } from 'antd';
import React, { Component } from 'react';

const FormItem = Form.Item;
class UpdateForm extends Component {
  static defaultProps = {
    handleUpdate: () => {
    },
    handleUpdateModalVisible: () => {
    },
    values: {},
  };

  formLayout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 13,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      isUpdate: false,
      formVals: {
        name: props.values.name,
        desc: props.values.desc,
        key: props.values.key,
        target: '0',
        template: '0',
        type: '1',
        time: '',
        frequency: 'month',
      },
      currentStep: 3,
    };
  }

  handleNext = currentStep => {
    const {form, handleUpdate} = this.props;
    const {formVals: oldValue} = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formVals = {...oldValue, ...fieldsValue};
      this.setState(
        {
          formVals,
        },
        () => {
          if (currentStep < 2) {
            this.forward();
          } else {
            handleUpdate(formVals);
          }
        },
      );
    });
  };
  setIsUpdate = () => {
    this.setState({
      isUpdate: true
    })
  }
  renderContent = (formVals) => {
    const {isUpdate} = this.state
    const {form} = this.props;
    return (
      <div>
        <h4>微信支付商户信息</h4>
        <FormItem key="name" {...this.formLayout} label="收款名称" style={{marginBottom: '10px'}}>
          {form.getFieldDecorator('name', {
            initialValue: formVals.name,
          })(<Input disabled placeholder="请输入"/>)}
        </FormItem>
        <FormItem key="name" {...this.formLayout} label="支付商户号" style={{marginBottom: '10px'}}>
          {form.getFieldDecorator('name', {
            initialValue: formVals.name,
          })(<Input disabled placeholder="请输入"/>)}
        </FormItem>
        <FormItem key="name" {...this.formLayout} label="行业" style={{marginBottom: '10px'}}>
          {form.getFieldDecorator('name', {
            initialValue: formVals.name,
          })(<Input disabled placeholder="请输入"/>)}
        </FormItem>
        <FormItem key="name" {...this.formLayout} label="费率" style={{marginBottom: '10px'}}>
          {form.getFieldDecorator('name', {
            initialValue: formVals.name,
          })(<Input disabled placeholder="请输入"/>)}
        </FormItem>
        <h4>用户信息</h4>
        <FormItem key="name" {...this.formLayout} label="姓名" style={{marginBottom: '10px'}}>
          {form.getFieldDecorator('name', {
            initialValue: formVals.name,
          })(<Input disabled placeholder="请输入"/>)}
        </FormItem>
        <FormItem key="name" {...this.formLayout} label="联系电话" style={{marginBottom: '10px'}}>
          {form.getFieldDecorator('name', {
            initialValue: formVals.name,
          })(<Input disabled placeholder="请输入"/>)}
        </FormItem>
        <h4>用户信息 <a onClick={this.setIsUpdate} style={{fontSize: '12px'}}>修改</a></h4>
        <FormItem key="name" {...this.formLayout} label="银行" style={{marginBottom: '10px'}}>
          {form.getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请填写银行'
              }
            ],
            initialValue: formVals.name,
          })(<Input disabled={!isUpdate} placeholder="请输入"/>)}
        </FormItem>
        <FormItem key="name" {...this.formLayout} label="银行卡号" style={{marginBottom: '10px'}}>
          {form.getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请填写银行卡号'
              }
            ],
            initialValue: formVals.name,
          })(<Input disabled={!isUpdate} placeholder="请输入"/>)}
        </FormItem>
        <FormItem key="name" {...this.formLayout} label="开户行" style={{marginBottom: '10px'}}>
          {form.getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请填写开户行'
              }
            ],
            initialValue: formVals.name,
          })(<Input disabled={!isUpdate} placeholder="请输入"/>)}
        </FormItem>
      </div>
    );
  };
  renderFooter = currentStep => {
    const {handleUpdateModalVisible, values} = this.props;
    const {isUpdate} = this.state;
    return (
      <div>
        <Button key="cancel" onClick={() => handleUpdateModalVisible(false, values)}>
          取消
        </Button>
        {
          isUpdate ? (<Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
            更新
          </Button>) : null
        }
      </div>
    )
    ;
  };

  render() {
    const {updateModalVisible, handleUpdateModalVisible, values} = this.props;
    const {currentStep, formVals} = this.state;
    return (
      <Modal
        width={640}
        bodyStyle={{
          padding: '32px 40px 48px',
          height: '500px',
          overflowY: 'auto'
        }}
        destroyOnClose
        title="支付详情"
        visible={updateModalVisible}
        footer={this.renderFooter(currentStep)}
        onCancel={() => handleUpdateModalVisible(false, values)}
        afterClose={() => handleUpdateModalVisible()}
      >
        {this.renderContent(formVals)}
      </Modal>
    );
  }
}

export default Form.create()(UpdateForm);
