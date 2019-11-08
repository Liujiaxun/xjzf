import { Button, Divider, Form, Input, Select, Upload, Icon } from 'antd';
import React, { Fragment, useState } from 'react';
import { connect } from 'dva';

import styles from './index.less';
import request from '@/utils/request';
import { baseUrl } from '@/config/baseConfig';
import { getToken } from '@/utils/utils';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const Step2 = props => {
  const { form, dispatch, data } = props;
  const [img, setImg] = useState('');
  const [bimg, setBimg] = useState('');
  if (!data) {
    return null;
  }

  const { getFieldDecorator, validateFields } = form;
  const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const onValidateForm = () => {
    validateFields((err, values) => {
      if (!err && dispatch) {
        dispatch({
          type: 'merchantsAndApply/saveStepFormData',
          payload: {
            id_card_copy: img,
            id_card_national: bimg,
          },
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
      } else {
        const url = r.files.url;
        file.onSuccess();
        if (key === 'id_card_copy') {
          setImg(url);
        } else {
          setBimg(url);
        }
      }
    });
  };
  return (
    <Fragment>
      <Form className={styles.stepForm}>
        <Form.Item label="身份证正面">
          {getFieldDecorator('id_card_copy', {
            rules: [
              {
                required: true,
                message: '请上传照片',
              },
            ],
          })(
            <Upload.Dragger name="files" customRequest={file => onChange(file, 'id_card_copy')}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text"> 点击或者拖动图片到此上传 </p>
            </Upload.Dragger>,
          )}
        </Form.Item>

        <Form.Item label="身份证反面">
          {getFieldDecorator('id_card_national', {
            rules: [
              {
                required: true,
                message: '请上传照片',
              },
            ],
          })(
            <Upload.Dragger name="files" onChang={file => onChange(file, 'id_card_national')}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
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
          <Button onClick={onPreStep}>上一步</Button>
          <Button type="primary" onClick={onValidateForm} style={{ marginLeft: '10px' }}>
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
}))(Form.create()(Step2));
