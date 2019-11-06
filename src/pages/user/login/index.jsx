import {Alert, Form, Input, Row, Col, Button, message} from 'antd';
import React, {Component} from 'react';
import Link from 'umi/link';
import {connect} from 'dva';
import styles from './style.less';
import logo4 from '../../../assets/logo-4.png';
import {Redirect} from "umi";
import {tokenKey} from "@/config/baseConfig";

@connect(({login, loading}) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class Login extends Component {
  constructor(props) {
    super(props)
    const query = props.location.query;
    console.log(query);

    this.state = {
      type: 'account',
      disabledGetCodeButton: true,
      getCodeButtonHtml: '获取验证码',
      isGetCode: false,
      time: 60,
      invitefrom: query.f,
      phone_authencode_id: '',
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const self = this;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        self.props.dispatch({
          type: 'login/postSubmitRegisterPhone',
          payload: {
            ...values,
            phone_authencode_id: self.state.phone_authencode_id,
          },
        }).then(res => {
          if (res.status) {
            self.history.push('/')
          } else if (self.state.phone_authencode_id === '') {
            message.error('验证码不正确')
          } else {
            message.error(res.message)
          }
        })
      }
    });
  }

  checkLoginStatus = () => {
    const {data} = this.props.login
    const {ctime, mid, scene_id} = data
    if (mid && scene_id) {
      this.props.dispatch({
        type: 'login/checkLoginStatus',
        payload: {
          mid,
          scene_id,
        },
      }).then(res => {
        if (res.status) {
          message.success('扫码成功')
          clearInterval(this.checkLogin)
          window.localStorage.setItem(tokenKey, res.data.token)
          window.localStorage.setItem('uid', res.data.id)
        }
      })
    }
  }

  handleGetCode = () => {
    const self = this;
    const phone = this.props.form.getFieldValue('phone');
    this.props.dispatch({
      type: 'login/postGetVCode',
      payload: {
        phone,
        type: 'register',
      },
    }).then(res => {
      if (!res.status) {
        message.error(res.message)
        return;
      }
      self.setState({
        disabledGetCodeButton: true,
        time: 60,
        phone_authencode_id: res.data.phone_authencode_id
      })
      self.getCodeInterVal = setInterval(() => {
        const {time} = self.state;
        if (time >= 0) {
          self.setState({
            getCodeButtonHtml: time + 's',
          }, () => {
            self.setState({
              time: time - 1,
            })
          })
        } else {
          clearInterval(self.getCodeInterVal)
          self.setState({
            getCodeButtonHtml: '获取验证码',
            disabledGetCodeButton: false,
          })
        }
      }, 1000)
    })
  }

  onPhoneInputChange = e => {
    if (/^1[3456789]\d{9}$/.test(e.target.value)) {
      this.setState({
        disabledGetCodeButton: false,
      })
    } else {
      this.setState({
        disabledGetCodeButton: true,
      })
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'login/getLoginWeChatCode',
    })
    this.checkLogin = setInterval(() => {
      this.checkLoginStatus()
    }, 5000)
  }

  componentWillUnmount() {
    clearInterval(this.checkLogin)
    clearInterval(this.getCodeInterVal)
  }

  render() {
    const {data, isLogin, user} = this.props.login;
    const {qrurl} = data
    const {getFieldDecorator} = this.props.form;
    const {invitefrom} = this.state;
    if (isLogin && user.phone !== '') {
      return <Redirect to="/"></Redirect>
    }
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
          !isLogin ? (
              <div className={styles.loginBox}>
                <h3>账号注册及登录</h3>
                <div className={styles.title}>微信扫一扫</div>
                <div className={styles.wechatPhoto}>
                  <div>
                    <img src={qrurl} alt=""/>
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
                      {getFieldDecorator('realname', {
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
                              {
                                pattern: /^1[3456789]\d{9}$/,
                                message: '请输入合法的手机号',
                              },
                            ],
                          })(<Input placeholder="手机号码" onChange={v => this.onPhoneInputChange(v)}/>)}
                        </Col>
                        <Col span={8}>
                          <Button disabled={this.state.disabledGetCodeButton}
                                  onClick={this.handleGetCode} style={{width: '100%'}}>
                            {this.state.getCodeButtonHtml}
                          </Button>
                        </Col>
                      </Row>
                    </Form.Item>
                    <Form.Item>
                      {getFieldDecorator('authencode', {
                        rules: [
                          {
                            required: true,
                            message: '请输入验证码！',
                          },
                        ],
                      })(<Input placeholder="验证码"/>)}
                    </Form.Item>
                    <Form.Item>
                      {getFieldDecorator('invitefrom', {
                        initialValue: invitefrom,
                      })(<Input placeholder="邀请码"/>)}
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
