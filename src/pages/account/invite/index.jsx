import {Avatar, Card, Col, Skeleton, Row, Table, Input, Statistic, Button, Radio, Badge, Divider, Tooltip} from 'antd';
import React, {Component, Fragment} from 'react';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';
import numeral from "numeral";
@connect(
  ({ dashboardAndworkplace: { currentUser, projectNotice, activities, radarData }, loading }) => ({
    currentUser,
    projectNotice,
    activities,
    radarData,
    currentUserLoading: loading.effects['dashboardAndworkplace/fetchUserCurrent'],
    projectLoading: loading.effects['dashboardAndworkplace/fetchProjectNotice'],
    activitiesLoading: loading.effects['dashboardAndworkplace/fetchActivitiesList'],
  }),
)
class Bean extends Component {
  state = {
    selectedRows: [],
  }

  columns = [
    {
      title: '用户',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '注册时间',
      dataIndex: 'desc',
      align: 'center',
    },
    {
      title: '获取微豆总额',
      dataIndex: 'callNo',
      align: 'center',
      render: val => `${val} 万`,
      needTotal: true,
    },
  ]

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboardAndworkplace/init',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboardAndworkplace/clear',
    });
  }

  render() {
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    const loading = false;
    let data = [];
    for(let i=0;i<12;i++){
        data.push({
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
          callNo: 981,
          createdAt: "2017-07-03T16:00:00.000Z",
          desc: '这是一段描述',
          disabled: false,
          href: 'https://ant.design',
          key:i,
          name: 'TradeCode ' + i,
          owner: "曲丽丽" + i,
          progress: 100 + i,
          status: 0,
          title: "一个任务名称 " + i,
          updatedAt: "2017-07-03T16:00:00.000Z"
        });
    }
    return (
      <PageHeaderWrapper title="">
        <Row gutter={24}>
          <Col>
            <Card>
              <Row>
                <Col md={6} sm={12} xs={24}>
                  <Statistic
                    title="邀请者用户"
                    suffix="微豆"
                    value={numeral(124543233).format('0,0')}
                  />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <Statistic
                    title="邀请用户开户"
                    suffix="微豆"
                    value={numeral(33).format('0,0')}
                  />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <Statistic
                    title="邀请用户消费"
                    suffix="微豆"
                    value={numeral(33).format('0,0')}
                  >
                  </Statistic>
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <div className={styles.inviteLinks}>
                    <span>http://www.baidu.com</span>
                    <Button type="primary">复制邀请链接</Button>
                  </div>
                </Col>
              </Row>
            </Card>

            <Card bodyStyle={{padding:'10px 0'}} style={{marginTop: "24px"}} title="用户邀请记录">
              <div className={styles.beanList}>
                <Table rowSelection={rowSelection} columns={this.columns} dataSource={data} />,
              </div>
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default Bean;
