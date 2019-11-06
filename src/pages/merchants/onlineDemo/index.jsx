import {Col, Row, Card, Tabs, Input, Button} from 'antd';
import React, {Component} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {connect} from 'dva';

const {TabPane} = Tabs;
import styles from './style.less';
import IMG1 from '../../../assets/native.png'
import IMG2 from '../../../assets/micropay.png'
import IMG3 from '../../../assets/jsapi.png'

@connect((state) => ({
  state,
}))
class OnlineDemo extends Component {
  state = {};

  componentDidMount() {

  }

  componentWillUnmount() {

  }


  render() {
    return (
      <PageHeaderWrapper>
        <React.Fragment>
          <div className={styles.onlineBox}>
            <Card>
              <Tabs defaultActiveKey="1">
                <TabPane tab="微信支付API" key="1">
                  <Row gutter={16}>
                    <Col xs={24} sm={12} md={8}>
                      <Card style={{textAlign: 'center'}} bodyStyle={{paddingLeft: 0, paddingRight: 0}}>
                        <div className={styles.img}>
                          <img src={IMG1} alt=""/>
                        </div>
                        <h2>扫码支付</h2>
                        <p>
                          用户打开"微信扫一扫，扫描商家二维码完成支付
                        </p>
                        <div className={styles.cardFooter}>
                          <div className={styles.input}>
                            <span>支付金额:</span> <Input placeholder="请输入金额"/>
                          </div>
                          <div>
                            <Button type="primary">在线体验</Button>
                          </div>
                        </div>
                      </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                      <Card style={{textAlign: 'center'}} bodyStyle={{paddingLeft: 0, paddingRight: 0}}>
                        <div className={styles.img}>
                          <img src={IMG2} alt=""/>
                        </div>
                        <h2>微信公众号支付</h2>
                        <p>
                          用户在微信内进入商家H5页面，完成支付
                        </p>
                        <div className={styles.cardFooter}>
                          <div className={styles.input}>
                            <span>支付金额:</span> <Input placeholder="请输入金额"/>
                          </div>
                          <div>
                            <Button type="primary">在线体验</Button>
                          </div>
                        </div>
                      </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                      <Card style={{textAlign: 'center'}} bodyStyle={{paddingLeft: 0, paddingRight: 0}}>
                        <div className={styles.img}>
                          <img src={IMG3} alt=""/>
                        </div>
                        <h2>付款码支付</h2>
                        <p>
                          用户打开微信钱包-展示付款码，商户扫码后提交完成支付
                        </p>
                        <div className={styles.cardFooter}>
                          <div className={styles.input}>
                            <span>支付金额:</span> <Input placeholder="请输入金额"/>
                          </div>
                          <div>
                            <Button type="primary">在线体验</Button>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  </Row>
                </TabPane>
              </Tabs>
            </Card>
          </div>
        </React.Fragment>
      </PageHeaderWrapper>
    );
  }
}

export default OnlineDemo;
