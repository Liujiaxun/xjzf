import {Avatar, Card, Col, Skeleton, Row,Table,Input, Statistic, Button, Radio, Badge, Divider} from 'antd';
import React, {Component, Fragment} from 'react';
import Link from 'umi/link';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import moment from 'moment';
import Radar from './components/Radar';
import EditableLinkGroup from './components/EditableLinkGroup';
import styles from './style.less';
import StandardTable from "./components/Table";
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];
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
      title: '订单号',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '类型',
      dataIndex: 'desc',
      align: 'center',
    },
    {
      title: '金额',
      dataIndex: 'callNo',
      align: 'center',
      render: val => `${val} 万`,
      needTotal: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
    },
    {
      title: '时间',
      dataIndex: 'updatedAt',
      align: 'center',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
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

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };

    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'listAndtableList/fetch',
      payload: params,
    });
  }

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
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
    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue="all">
          <RadioButton value="all">全部</RadioButton>
          <RadioButton value="progress">充值</RadioButton>
          <RadioButton value="waiting">消费</RadioButton>
        </RadioGroup>
      </div>
    );
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
              <div className={styles.myBean}>
                <span>账户余额:¥ 9999</span>
                <div style={{display:'flex'}}>
                  <Input placeholder="请输入金额"  />
                  <Button type="primary" style={{marginLeft: '10px'}}>在线充值</Button>
                </div>
              </div>
            </Card>

            <Card bodyStyle={{padding:'10px 0'}} style={{marginTop: "24px"}} title="充值消费记录" extra={extraContent}>
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
