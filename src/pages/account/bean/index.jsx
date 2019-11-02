import {Avatar, Card, Col, Skeleton, Row,Table, Statistic, Button, Radio, Badge, Divider} from 'antd';
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
      title: '时间',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '类型',
      dataIndex: 'desc',
      align: 'center',

    },
    {
      title: '关联订单编号',
      dataIndex: 'callNo',
      sorter: true,
      align: 'center',
      render: val => `${val} 万`,
      // mark to display a total number
      needTotal: true,
    },
    {
      title: '数额',
      dataIndex: 'status',
      align: 'center',

      filters: [
        {
          text: status[0],
          value: '0',
        },
        {
          text: status[1],
          value: '1',
        },
        {
          text: status[2],
          value: '2',
        },
        {
          text: status[3],
          value: '3',
        },
      ],

      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
    },
    {
      title: '备注',
      dataIndex: 'updatedAt',
      align: 'center',
      sorter: true,
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
          <RadioButton value="progress">进行中</RadioButton>
          <RadioButton value="waiting">等待中</RadioButton>
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
                <span>微豆余额: 9999</span>
                <Button type="primary">购买微豆</Button>
              </div>
            </Card>

            <Card bodyStyle={{padding:'10px 0'}} style={{marginTop: "24px"}} title="微豆记录" extra={extraContent}>
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
