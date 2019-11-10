import {Avatar, Button, Card, Col, Divider, Icon, Input, Row, Tag} from 'antd';
import React, {PureComponent} from 'react';
import {GridContent} from '@ant-design/pro-layout';
import {FormattedMessage, formatMessage} from 'umi-plugin-react/locale';
import Link from 'umi/link';
import {connect} from 'dva';
import Projects from './components/Projects';
import Articles from './components/Articles';
import Applications from './components/Applications';
import styles from './Center.less';
import {Bar} from "@/pages/dashboard/analysis/components/Charts";
import moment from 'moment';

const data = [
  {x: "1月", y: 428},
  {x: "2月", y: 287},
  {x: "3月", y: 1189},
  {x: "4月", y: 1139},
  {x: "5月", y: 742},
  {x: "6月", y: 547},
  {x: "7月", y: 928},
  {x: "8月", y: 1097},
  {x: "9月", y: 374},
  {x: "10月", y: 459},
  {x: "11月", y: 1152},
  {x: "12月", y: 943}
];

@connect(({loading, user, dict}) => {
  return {
    user: user.currentUser,
    dict,
    currentUserLoading: loading.effects['user/getUserInfo'],
  }
})
class Center extends PureComponent {

  state = {
    newTags: [],
    inputVisible: false,
    inputValue: '',
  };
  input = undefined;

  componentDidMount() {


    const {dispatch} = this.props;
    dispatch({
      type: 'dict/fetchStaOrderDaily',
      payload: {
        begin_time: moment().subtract(12, 'days').format('YYYY-MM-DD'),
        end_time: (new moment()).format('YYYY-MM-DD')
      }
    })

    dispatch({
      type: 'dict/fetchStaOrderHour',
      payload: {
        begin_time: (new moment()).format('YYYY-MM-DD_00'),
        end_time: (new moment()).format('YYYY-MM-DD__23')
      }
    })
  }

  render() {
    const {user, currentUserLoading, dict} = this.props;
    const {settingData, StaOrderDaily, StaOrderHour, userSta} = dict;
    const {kefu, invite} = settingData;
    const { member_info } = user;
    const data1 = StaOrderDaily.map(item => ({...item, x: item.day, y: item.amount}))
    const data2 = StaOrderHour.map(item => ({...item, y: item.amount, x: (item.hour).split('_')[1]}))
    const dataLoading = false;
    return (
      <GridContent>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <Card
              bordered={false}
              style={{
                marginBottom: 24,
              }}
              loading={dataLoading}
            >
              {!dataLoading ? (
                <div>
                  <div className={styles.avatarHolder}>
                    <img alt="" src={user.headurl}/>
                    <div className={styles.name}>{user.realname || user.nickname}</div>
                    <div className={styles.price}>余额 {user.amount} <Button type="danger" size="small">充值</Button></div>
                  </div>
                  <Divider solid={true}/>
                  <div className={styles.tags}>
                    <div className={styles.tagsTitle}>用户身份</div>
                    <div className={styles.detail}>
                      <p className={styles.item}>
                        <span> {member_info.name} </span>
                        <span> <Button size="small" type="primary">升级</Button></span>
                      </p>
                      <p className={styles.item}>
                        <span>商户价格</span> <span> {member_info.merchant_price}/个 </span>
                      </p>
                      <p className={styles.item}>
                        <span>商户总数</span> <span> {member_info.merchant_max}</span>
                      </p>
                      {/*credit_discount: "8折"*/}
                      {/*merchant_price: "180"*/}
                      {/*name: "普通会员"*/}
                      {/*order_api_qps: "30"*/}
                      {/*total_amount_day: "100万"*/}
                      <p className={styles.item}>
                        <span>日交易额</span> <span>{member_info.total_amount_day}</span>
                      </p>
                      <p className={styles.item}>
                        <span>微豆折扣</span> <span>{member_info.credit_discount}</span>
                      </p>
                      <p className={styles.item}>
                        <span>订单并发调用</span> <span> {member_info.order_api_qps}/秒 </span>
                      </p>
                      <p>
                        <span>会员有效期</span>
                        <span style={{float: 'right'}}>{user.member_endtime}</span>
                      </p>
                      <p>
                        <span>access_key:</span>
                        <br/>
                        <span style={{float: 'left'}}>{user.access_key}</span>
                      </p>
                      <p>
                        <span>secret_key:</span>
                        <br/>
                        <span style={{float: 'left'}}>{user.secret_key}</span>
                      </p>
                    </div>
                  </div>
                  <Divider solid/>
                  <div className={styles.tags}>
                    <div className={styles.tagsTitle}>邀佣图片</div>
                    <div className={styles.tagImg}>
                      <img src={invite.adimg} alt="" style={{width:'100%',height:'100%'}}/>
                    </div>
                  </div>
                  <Divider
                    solid
                  />
                  <div className={styles.team}>
                    <p>客服微信: {kefu.weixin}</p>
                    <p>客服电话: {kefu.tele}</p>
                  </div>
                </div>
              ) : null}
            </Card>
          </Col>
          <Col lg={17} md={24}>
            <div className={styles.itemCard}>
              <Row gutter={[{xs: 8, sm: 16, md: 24, lg: 32}, 20]}>
                <Col sm={8} xs={24}>
                  <Card className={styles.initCardPadding} style={{padding: 0}}>
                    <div className={styles.cardBody}>
                      <div className={styles.header}>
                        <span>交易额</span> <Icon type="exclamation-circle"/>
                      </div>
                      <div className={styles.body}>
                        ¥ {userSta.total_order_amount}
                      </div>
                      <div className={styles.footer}>
                        日交易额: ¥ {userSta.daily_order_amount}
                      </div>
                    </div>
                  </Card>
                </Col>
                <Col sm={8} xs={24}>
                  <Card className={styles.initCardPadding} style={{padding: 0}}>
                    <div className={styles.cardBody}>
                      <div className={styles.header}>
                        <span>交易量</span> <Icon type="exclamation-circle"/>
                      </div>
                      <div className={styles.body}>
                        {userSta.total_order_count}
                      </div>
                      <div className={styles.footer}>
                        日交易量: {userSta.daily_order_count}
                      </div>
                    </div>
                  </Card>
                </Col>
                <Col sm={8} xs={24}>
                  <Card className={styles.initCardPadding} style={{padding: 0}}>
                    <div className={styles.cardBody}>
                      <div className={styles.header}>
                        <span>微豆余额</span> <Icon type="exclamation-circle"/>
                      </div>
                      <div className={styles.body}>
                        {userSta.total_credit_amount}
                      </div>
                      <div className={styles.footer}>
                        <div className={styles.tool}>
                          <Button type="primary" size="small">充值</Button>
                        </div>
                        日消耗: ¥ {userSta.daily_credit_amount}
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>

            </div>

            <Card bodyStyle={{padding: 0}} style={{marginTop: '20px'}}>
              <div className={styles.ECharts}>
                <div className={styles.header}>收入日报</div>
                <div className={styles.body}>
                  <Bar
                    height={292}
                    data={data1}
                  />
                </div>
              </div>
            </Card>

            <Card bodyStyle={{padding: 0}} style={{marginTop: '20px'}}>
              <div className={styles.ECharts}>
                <div className={styles.header}>今日24小时API接口请求</div>
                <div className={styles.body}>
                  <Bar
                    height={292}
                    data={data2}
                  />
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default Center;
