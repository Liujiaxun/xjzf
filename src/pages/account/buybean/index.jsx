import {Avatar, Card, Col, Skeleton, Row, Table, Statistic, Button, Radio, Badge, Divider} from 'antd';
import React, {Component, Fragment} from 'react';
import Link from 'umi/link';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {connect} from 'dva';
import moment from 'moment';
import styles from './style.less';

@connect(
  ({dashboardAndworkplace: {currentUser, projectNotice, activities, radarData}, loading}) => ({
    currentUser,
    projectNotice,
    activities,
    radarData,
    currentUserLoading: loading.effects['dashboardAndworkplace/fetchUserCurrent'],
    projectLoading: loading.effects['dashboardAndworkplace/fetchProjectNotice'],
    activitiesLoading: loading.effects['dashboardAndworkplace/fetchActivitiesList'],
  }),
)
class BuyBean extends Component {
  state = {
    ActiveIndex: null,
    type: null
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'dashboardAndworkplace/init',
    });
  }

  componentWillUnmount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'dashboardAndworkplace/clear',
    });
  }

  setActiveIndex = i => {
    this.setState({
      ActiveIndex: i
    })
  }

  changeType = data => {
    this.setState({
      type: data.target.value
    })
  }

  render() {
    const map = [1, 2, 3, 4, 5, 6, 7, 8]
    return (
      <PageHeaderWrapper title="">
        <Row gutter={24}>
          <Col>
            <Card>
              <div className={styles.myBean}>
                <span>微豆余额: 9999</span>
              </div>
            </Card>
            <Card bodyStyle={{padding: '10px 0'}} style={{marginTop: "24px"}} title="请选择微豆数量">
              <Row gutter={24}>
                {
                  map.map((item, i) => {
                    return (
                      <Col xs={24} sm={12} md={6} lg={4} key={i}>
                        <div className={`${styles.buyItem}`} onClick={() => this.setActiveIndex(i)}>
                          <div className={`${styles.itemBody} ${this.state.ActiveIndex === i ? styles.active : ''}`}>
                            <div className={styles.price}>
                              <span>¥</span> 10{item}
                            </div>
                            <div className={styles.m}>
                              10000{item} 微豆
                            </div>
                            <div className={styles.hint}>
                              赠送 500{item} 微豆
                            </div>
                          </div>
                        </div>
                      </Col>
                    )
                  })
                }
              </Row>
              <Row gutter={24}>
                {
                  this.state.ActiveIndex !== null ? (
                    <Col xs={24}>
                      <div style={{paddingTop: '40px', paddingLeft: '10px',height: '200px'}}>
                        <Radio.Group name="type" value={this.state.type}>
                          <Radio value={1} onChange={value => this.changeType(value)}> 微信扫码支付 </Radio>
                          <br/>
                          <Radio value={2} onChange={value => this.changeType(value)}> 账户余额支付 (余额: 321.8元)</Radio>
                        </Radio.Group>
                        <div style={{marginTop: 20}}>
                          <Button type="primary" disabled={this.state.ActiveIndex === null || this.state.type === null}
                                  onClick={this.toggleDisabled}>
                            立即购买
                          </Button>
                        </div>
                      </div>
                    </Col>
                  ) : null
                }
              </Row>
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default BuyBean;
