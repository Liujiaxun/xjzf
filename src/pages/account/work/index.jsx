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

@connect(({loading, accountAndWork}) => {
  return {
    currentUser: accountAndWork.currentUser,
    currentUserLoading: loading.effects['accountAndcenter/fetchCurrent'],
  }
})
class Center extends PureComponent {

  state = {
    newTags: [],
    inputVisible: false,
    inputValue: '',
    tabKey: 'articles',
  };
  input = undefined;

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'accountAndcenter/fetchCurrent',
    });
    dispatch({
      type: 'accountAndcenter/fetch',
    });
  }


  render() {
    const {currentUser, currentUserLoading} = this.props;
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
                    <img alt="" src={currentUser.avatar}/>
                    <div className={styles.name}>{currentUser.name}</div>
                    <div className={styles.price}>余额 8.88 <Button type="danger" size="small">充值</Button></div>
                  </div>
                  <Divider solid/>
                  <div className={styles.tags}>
                    <div className={styles.tagsTitle}>用户身份</div>
                    <div className={styles.detail}>
                      <p className={styles.item}>
                        <span>普通会员</span> <span> <Button size="small" type="primary">升级</Button></span>
                      </p>
                      <p className={styles.item}>
                        <span>商户价格</span> <span> 180/个 </span>
                      </p>
                      <p className={styles.item}>
                        <span>商户总数</span> <span> 30</span>
                      </p>
                      <p className={styles.item}>
                        <span>日交易额</span> <span>100万></span>
                      </p>
                      <p className={styles.item}>
                        <span>微豆折扣</span> <span> 8折</span>
                      </p>
                      <p className={styles.item}>
                        <span>订单并发调用</span> <span> 30/秒 </span>
                      </p>
                      <p>
                        <span>会员有效期</span>
                        <span style={{float: 'right'}}>2019-07-09</span>
                      </p>
                    </div>
                  </div>
                  <Divider solid/>
                  <div className={styles.tags}>
                    <div className={styles.tagsTitle}>邀佣图片</div>
                    <div className={styles.tagImg}>
                      <img src="" alt=""/>
                    </div>
                  </div>
                  <Divider
                    solid
                  />
                  <div className={styles.team}>
                    <p>客服微信: xiaoweijufu</p>
                    <p>客服电话: 18162197341</p>
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
                        ¥ 9000
                      </div>
                      <div className={styles.footer}>
                        日交易额: ¥ 12900
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
                        9000
                      </div>
                      <div className={styles.footer}>
                        日交易量: 12900
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
                        9000
                      </div>
                      <div className={styles.footer}>
                        <div className={styles.tool}>
                          <Button type="primary" size="small">充值</Button>
                        </div>
                        日消耗: ¥ 12900
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
                    data={data}
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
                    data={data}
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
