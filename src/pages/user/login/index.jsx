import {Alert, Form, Input, Row, Col, Button} from 'antd';
import {FormattedMessage, formatMessage} from 'umi-plugin-react/locale';
import React, {Component} from 'react';
import Link from 'umi/link';
import {connect} from 'dva';
import LoginComponents from './components/Login';
import styles from './style.less';
import logo4 from '../../../assets/logo-4.png';

const {Tab, UserName, Password, Mobile, Captcha, Submit} = LoginComponents;

@connect(({userAndlogin, loading}) => ({
  userAndlogin,
  submitting: loading.effects['userAndlogin/login'],
}))
class Login extends Component {
  loginForm = undefined;
  state = {
    type: 'account',
    autoLogin: true,
    weCode: false
  };
  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };
  handleSubmit = (err, values) => {
    const {type} = this.state;

    if (!err) {
      const {dispatch} = this.props;
      dispatch({
        type: 'userAndlogin/login',
        payload: {...values, type},
      });
    }
  };
  onTabChange = type => {
    this.setState({
      type,
    });
  };
  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      if (!this.loginForm) {
        return;
      }

      this.loginForm.validateFields(['mobile'], {}, (err, values) => {
        if (err) {
          reject(err);
        } else {
          const {dispatch} = this.props;
          dispatch({
            type: 'userAndlogin/getCaptcha',
            payload: values.mobile,
          })
            .then(resolve)
            .catch(reject);
        }
      });
    });
  renderMessage = content => (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const {userAndlogin, submitting} = this.props;
    const {status, type: loginType} = userAndlogin;
    const {type, autoLogin} = this.state;
    const { getFieldDecorator } = this.props.form;

    return (
      <div className={styles.main}>
        <div className={styles.loginLeft}>
          <div className={styles.logo}>
            <Link to="/">
              <img src={logo4} alt=""/>
            </Link>
          </div>
          <div className={styles.info}>
            <h2>“小微聚付”支付平台</h2>
            <p>个人、个体户、企业均可接入</p>
            <p>10分钟极速签约开通</p>
            <p>支持扫码、H5、小程序、公众号、付款码等支付方式</p>
          </div>
          <div className={styles.footer}>
            Copyright © 2018-2019 小微聚付
          </div>
        </div>

        {
          !this.state.weCode ? (
              <div className={styles.loginBox}>
                <h3>账号注册及登录</h3>
                <div className={styles.title}>微信扫一扫</div>
                <div className={styles.wechatPhoto}>
                  <div>
                    <img src="" alt=""/>
                  </div>
                </div>
                <div className={styles.hintSpan}>打开微信扫一扫，经公众号验证后即可登陆</div>
              </div>)
            : (
              <div className={styles.loginBox}>
                <h3>账号注册-绑定手机号</h3>
                <div className={styles.title}>绑定手机号，及时接收提醒消息</div>
                <div className={styles.registerPhone}>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Item>
                      {getFieldDecorator('name', {
                        rules: [
                          {
                            required: true,
                            message: '请输入真实姓名！',
                          },
                        ],
                      })(<Input placeholder="真实姓名"/>)}
                    </Form.Item>
                    <Form.Item>
                      <Row gutter={8}>
                        <Col span={16}>
                          {getFieldDecorator('phone', {
                            rules: [
                              {
                                required: true,
                                message: '请输入电话号码！',
                              },
                            ],
                          })(<Input placeholder="手机号码"/>)}
                        </Col>
                        <Col span={8}>
                          <Button>发送验证码</Button>
                        </Col>
                      </Row>
                    </Form.Item>
                    <Form.Item>
                      {getFieldDecorator('vcode', {
                        rules: [
                          {
                            required: true,
                            message: '请输入验证码！',
                          },
                        ],
                      })(<Input placeholder="验证码"/>)}
                    </Form.Item>
                    <Button type="primary" htmlType="submit" size="large" className={styles.loginFormButton}>
                      确定
                    </Button>
                  </Form>
                </div>
              </div>)}
      </div>
    );
  }
}

export default Form.create()(Login);
