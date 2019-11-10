import {Alert, Button, Descriptions, Divider, Statistic, Form, Input} from 'antd';
import React from 'react';
import {connect} from 'dva';
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

class Step3 extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    const {form, dispatch, submitting, info} = this.props;
    const {validateFields} = form;
    const {sign_url} = info
    const onPrev = () => {
        dispatch({
          type: 'merchantsAndApply/saveCurrentStep',
          payload: 'pay',
        });
    };

    const onValidateForm = e => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          if (dispatch) {
            dispatch({
              type: 'merchantsAndApply/saveCurrentStep',
              payload: 'result',
            });
          }
        }
      });
    };

    return (
      <Form layout="horizontal" className={styles.stepForm}>
        <Alert
          closable
          showIcon
          message="正在于商家签约，请扫描下方二维码"
          style={{
            marginBottom: 24,
          }}
        />
        <Descriptions column={1} style={{textAlign: 'center'}}>
          <Descriptions.Item style={{textAlign: 'center'}}>
            <div>
              <img src={sign_url || qCode} alt="" style={{width: '250px', height: '250px', margin: '0 auto'}}/>
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
          {/*<Button*/}
          {/*  onClick={onPrev}*/}
          {/*  style={{*/}
          {/*    marginLeft: 8,*/}
          {/*  }}*/}
          {/*>*/}
          {/*  上一步*/}
          {/*</Button>*/}
          {/*<Button type="primary" onClick={onValidateForm} loading={submitting} style={{marginLeft: '20px'}}>*/}
          {/*  下一步*/}
          {/*</Button>*/}
        </Form.Item>
      </Form>
    );
  }
}

export default connect(({merchantsAndApply, loading}) => ({
  submitting: loading.effects['merchantsAndApply/submitStepForm'],
  info: merchantsAndApply.info,
}))(Form.create()(Step3));
