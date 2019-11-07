import {Button, Divider, Form, Input, Select, Upload, Icon} from 'antd';
import React, {Fragment} from 'react';
import {connect} from 'dva';
import styles from './index.less';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const Step2 = props => {
  const {form, dispatch, data} = props;

  if (!data) {
    return null;
  }

  const {getFieldDecorator, validateFields} = form;
  const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const onValidateForm = () => {
    validateFields((err, values) => {
      console.log(values, 1111);
      if (!err && dispatch) {
        dispatch({
          type: 'merchantsAndApply/saveStepFormData',
          payload: values,
        });
        dispatch({
          type: 'merchantsAndApply/saveCurrentStep',
          payload: 'pay',
        });
      }
    });
  };
  const onPreStep = () => {
    dispatch({
      type: 'merchantsAndApply/saveCurrentStep',
      payload: 'info',
    });
  }
  const onChange = (file) => {
    console.log(file,111)
    const formData = new FormData();
    formData.append('files',file.file);
    console.log(formData,'11')
    dispatch({
      type: 'merchantsAndApply/uploadFile',
      payload: {files:file.file},
    });
  }
  return (
    <Fragment>
      <Form className={styles.stepForm}>
        <Form.Item label="身份证正面">
          {getFieldDecorator('dragger', {
            rules: [
              {
                required: true,
                message: '请上传照片',
              },
            ],
            valuePropName: 'fileList',
            getValueFromEvent: normFile,
          })(
            <Upload.Dragger name="files" customRequest={onChange}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox"/>
              </p>
              <p className="ant-upload-text"> 点击或者拖动图片到此上传 </p>
            </Upload.Dragger>,
          )}
        </Form.Item>

        <Form.Item label="身份证反面">
          {getFieldDecorator('pp', {
            rules: [
              {
                required: true,
                message: '请上传照片',
              },
            ],
            valuePropName: 'fileList1',
            getValueFromEvent: normFile,
          })(
            <Upload.Dragger name="files" onChang={onChange}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox"/>
              </p>
              <p className="ant-upload-text"> 点击或者拖动图片到此上传 </p>
            </Upload.Dragger>,
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
          <Button onClick={onPreStep}>
            上一步
          </Button>
          <Button type="primary" onClick={onValidateForm} style={{marginLeft: '10px'}}>
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

export default connect(({merchantsAndApply}) => ({
  data: merchantsAndApply.step,
}))(Form.create()(Step2));
